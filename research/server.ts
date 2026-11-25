import html from "./index.html?raw";
import seeds from "./seed-links.json";
import { projectName, siteNavigation } from "../components/site-navigation";

const portalHtml = html.replaceAll("{{PROJECT_NAME}}", projectName).replaceAll(
  "{{SITE_NAVIGATION}}", siteNavigation.map(({ href, label }) => `<a href="${href}">${label}</a>`).join(""),
);

const groups = ["공통", "주관 채널", "협의체 채널", "자료"];
const productionCookie = "__Secure-flame-ark-research";
const previewCookie = "flame-ark-preview-session";
const ttl = 8 * 60 * 60;
const encoder = new TextEncoder();
const apiPrefix = "/api/research/";
const linkColumns = "id,group_name,title,description,url,sort_order,icon,is_visible";
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
};

type Role = "researcher" | "admin";
type Session = { token: string; role: Role; csrf: string; expires: number };
type LinkRow = { is_visible: number; title: string };
type Body = Record<string, unknown>;

class HttpError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

function json(data: unknown, status = 200, cookie?: string) {
  return Response.json(data, { status, headers: cookie ? { ...headers, "Set-Cookie": cookie } : headers });
}

function cookie(name: string, value: string, age: number) {
  const secure = name === productionCookie ? "; Secure" : "";
  return `${name}=${value}; Path=/; HttpOnly${secure}; SameSite=Strict; Max-Age=${age}`;
}

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function random() {
  return hex(crypto.getRandomValues(new Uint8Array(32)));
}

async function digest(value: string) {
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}

function equal(left: string, right: string) {
  let difference = left.length ^ right.length;
  for (let i = 0; i < right.length; i++) difference |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return difference === 0;
}

async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(salt), iterations: 100_000, hash: "SHA-256" }, key, 256,
  );
  return `${salt}:${hex(new Uint8Array(bits))}`;
}

function researcherHash(db: D1Database) {
  return db.prepare("SELECT value FROM research_state WHERE key='researcher_password'").first<string>("value");
}

async function verifyPassword(env: Cloudflare.Env, role: Role, password: string, stored: string | null) {
  if (stored) return equal(await passwordHash(password, stored.split(":")[0]), stored);
  const expected = role === "admin" ? env.FLAME_ARK_ADMIN_PASSWORD_SHA256 : env.INTERNAL_PORTAL_PASSWORD_SHA256;
  if (!expected || !/^[a-f0-9]{64}$/i.test(expected)) throw new HttpError(503, "접근 설정이 필요합니다.");
  return equal(await digest(password), expected.toLowerCase());
}

async function body(request: Request): Promise<Body> {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("Content-Type") ?? "")) {
    throw new HttpError(415, "JSON 요청이 필요합니다.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "요청 내용을 확인해 주세요.");
  const decoder = new TextDecoder();
  let input = "";
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) {
      await reader.cancel();
      throw new HttpError(413, "요청이 너무 큽니다.");
    }
    input += decoder.decode(value, { stream: true });
  }
  try {
    const data: unknown = JSON.parse(input + decoder.decode());
    if (data && typeof data === "object" && !Array.isArray(data)) return data as Body;
  } catch {
    // Return the same validation error for malformed JSON and invalid shapes.
  }
  throw new HttpError(400, "요청 내용을 확인해 주세요.");
}

function field(data: Body, key: string, min: number, max: number) {
  const value = data[key];
  if (typeof value !== "string" || value.length < min || value.length > max) {
    throw new HttpError(400, "입력 항목의 길이와 형식을 확인해 주세요.");
  }
  return value;
}

async function session(request: Request, db: D1Database, now: number, cookieName: string) {
  const value = request.headers.get("Cookie")?.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(cookieName + "="))?.slice(cookieName.length + 1);
  if (!value || !/^[a-f0-9]{64}$/.test(value)) return null;
  return db.prepare("SELECT token,role,csrf,expires FROM research_sessions WHERE token=? AND expires>?")
    .bind(await digest(value), now).first<Session>();
}

async function login(request: Request, db: D1Database, env: Cloudflare.Env, now: number, cookieName: string) {
  const input = await body(request);
  const role = input.role;
  if (role !== "researcher" && role !== "admin") throw new HttpError(400, "로그인 유형을 확인해 주세요.");
  const password = field(input, "password", 1, 300);
  const client = await digest(role + ":" + (request.headers.get("CF-Connecting-IP") ?? "local"));
  const cutoff = now - 600;
  const attempt = await db.prepare(
    "INSERT INTO research_attempts(client,started,count) VALUES(?,?,1) ON CONFLICT(client) DO UPDATE SET " +
    "count=CASE WHEN started<=? THEN 1 ELSE min(count+1,6) END, " +
    "started=CASE WHEN started<=? THEN excluded.started ELSE started END RETURNING count",
  ).bind(client, now, cutoff, cutoff).first<number>("count");
  if ((attempt ?? 6) > 5) throw new HttpError(429, "로그인 시도 횟수가 초과되었습니다. 10분 후 다시 시도해 주세요.");
  const stored = role === "researcher" ? await researcherHash(db) : null;
  if (!await verifyPassword(env, role, password, stored)) throw new HttpError(401, "비밀번호가 올바르지 않습니다.");
  const previous = await session(request, db, now, cookieName);
  const value = random();
  const token = await digest(value);
  const statements = [
    db.prepare("DELETE FROM research_attempts WHERE started<=? OR client=?").bind(cutoff, client),
    db.prepare("DELETE FROM research_sessions WHERE expires<=? OR token=?").bind(now, previous?.token ?? ""),
    db.prepare("INSERT INTO research_sessions(token,role,csrf,expires) SELECT ?,?,?,? " +
      "WHERE ?='admin' OR (SELECT value FROM research_state WHERE key='researcher_password') IS ?")
      .bind(token, role, random(), now + ttl, role, stored),
  ];
  const [, , created] = await db.batch(statements);
  if (!created.meta.changes) throw new HttpError(409, "비밀번호가 변경되었습니다. 다시 로그인해 주세요.");
  return json({ ok: true, role }, 200, cookie(cookieName, value, ttl));
}

async function ensureSeeded(db: D1Database) {
  if (await db.prepare("SELECT 1 FROM research_state WHERE key='seeded'").first()) return;
  const initial = seeds.map((item) => db.prepare(
    "INSERT INTO research_links(group_name,title,description,url,sort_order,icon,is_visible) " +
    "SELECT ?,?,?,?,?,?,1 WHERE NOT EXISTS (SELECT 1 FROM research_state WHERE key='seeded')",
  ).bind(item.group, item.title, item.description, item.url, item.order, item.icon));
  await db.batch([...initial, db.prepare("INSERT OR IGNORE INTO research_state(key,value) VALUES('seeded','1')")]);
}

function linkValues(data: Body) {
  const group = field(data, "group_name", 1, 35);
  const title = field(data, "title", 1, 140).trim();
  const description = field(data, "description", 0, 350);
  const url = field(data, "url", 0, 600).trim();
  const icon = field(data, "icon", 1, 35);
  const order = data.sort_order;
  if (!groups.includes(group) || !title || typeof order !== "number" ||
      !Number.isInteger(order) || order < 0 || order > 9999 || typeof data.is_visible !== "boolean") {
    throw new HttpError(400, "메뉴 입력을 확인해 주세요.");
  }
  if (url) {
    const address = URL.canParse(url) ? new URL(url) : null;
    if (!address || address.protocol !== "https:" || address.username || address.password) {
      throw new HttpError(400, "HTTPS 주소만 허용합니다.");
    }
  }
  return [group, title, description, url, order, icon, Number(data.is_visible)] as const;
}

function audit(db: D1Database, operation: string, detail: string, now: number) {
  return db.prepare("INSERT INTO research_audit(operation,detail,created_at) VALUES(?,?,?)").bind(operation, detail, now);
}

async function list(db: D1Database, admin: boolean) {
  await ensureSeeded(db);
  const order = "ORDER BY CASE group_name WHEN '공통' THEN 1 WHEN '주관 채널' THEN 2 WHEN '협의체 채널' THEN 3 ELSE 4 END,sort_order,id";
  const links = await db.prepare(`SELECT ${linkColumns} FROM research_links ${admin ? "" : "WHERE is_visible=1"} ${order}`).all<LinkRow>();
  const items = links.results.map((row) => ({ ...row, is_visible: Boolean(row.is_visible) }));
  if (!admin) return json({ items });
  const history = await db.prepare("SELECT operation,detail,created_at FROM research_audit ORDER BY id DESC LIMIT 12").all();
  return json({ items, audit: history.results });
}

async function adminMutation(request: Request, path: string, db: D1Database, env: Cloudflare.Env, now: number) {
  const method = request.method;
  if (path === "admin/change-researcher-password" && method === "POST") {
    const input = await body(request);
    const old = field(input, "old_password", 1, 300);
    const next = field(input, "new_password", 12, 300);
    const previous = await researcherHash(db);
    const valid = await verifyPassword(env, "researcher", old, previous);
    if (!valid) throw new HttpError(403, "현재 연구자 비밀번호가 일치하지 않습니다.");
    const hash = await passwordHash(next, random());
    // Compare the value read during verification so concurrent changes cannot overwrite it.
    const results = await db.batch([
      db.prepare("INSERT INTO research_state(key,value) SELECT 'researcher_password',? WHERE " +
        "(SELECT value FROM research_state WHERE key='researcher_password') IS ? " +
        "ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(hash, previous),
      db.prepare("INSERT INTO research_audit(operation,detail,created_at) SELECT 'password_change','연구자 비밀번호 변경',? WHERE changes()>0").bind(now),
      db.prepare("DELETE FROM research_sessions WHERE role='researcher' AND changes()>0"),
    ]);
    if (!results[0].meta.changes) throw new HttpError(409, "비밀번호가 이미 변경되었습니다.");
    return json({ ok: true });
  }
  if (path === "admin/links" && method === "POST") {
    const values = linkValues(await body(request));
    await ensureSeeded(db);
    const inserted = await db.batch([
      db.prepare("INSERT INTO research_links(group_name,title,description,url,sort_order,icon,is_visible) VALUES(?,?,?,?,?,?,?)").bind(...values),
      audit(db, "create", values[1], now),
    ]);
    return json({ ok: true, id: inserted[0].meta.last_row_id });
  }
  const match = /^admin\/links\/([1-9]\d*)$/.exec(path);
  if (!match || !["PUT", "DELETE"].includes(method)) throw new HttpError(404, "요청을 찾지 못했습니다.");
  const id = Number(match[1]);
  if (!Number.isSafeInteger(id)) throw new HttpError(404, "메뉴를 찾지 못했습니다.");
  await ensureSeeded(db);
  if (method === "PUT") {
    const values = linkValues(await body(request));
    const [updated] = await db.batch([
      db.prepare("UPDATE research_links SET group_name=?,title=?,description=?,url=?,sort_order=?,icon=?,is_visible=? WHERE id=?").bind(...values, id),
      db.prepare("INSERT INTO research_audit(operation,detail,created_at) SELECT 'update',?,? WHERE changes()>0")
        .bind(values[1], now),
    ]);
    if (!updated.meta.changes) throw new HttpError(404, "메뉴를 찾지 못했습니다.");
  } else {
    const [, deleted] = await db.batch([
      db.prepare("INSERT INTO research_audit(operation,detail,created_at) SELECT 'delete',title,? FROM research_links WHERE id=?").bind(now, id),
      db.prepare("DELETE FROM research_links WHERE id=?").bind(id),
    ]);
    if (!deleted.meta.changes) throw new HttpError(404, "메뉴를 찾지 못했습니다.");
  }
  return json({ ok: true });
}

async function api(request: Request, url: URL, env: Cloudflare.Env) {
  try {
    const method = request.method;
    const loopback = ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname);
    const cookieName = env.FLAME_ARK_LOCAL_PREVIEW === "1" && loopback && url.protocol === "http:"
      ? previewCookie : productionCookie;
    const path = url.pathname.slice(apiPrefix.length);
    const db = env.DB;
    if (!db) throw new HttpError(503, "연구자 포털 저장소 설정이 필요합니다.");
    if (method !== "GET" && request.headers.get("Origin") !== url.origin) {
      throw new HttpError(403, "이 사이트에서만 요청할 수 있습니다.");
    }
    const now = Math.floor(Date.now() / 1000);
    if (method === "POST" && path === "login") return await login(request, db, env, now, cookieName);
    const current = await session(request, db, now, cookieName);
    if (method === "GET" && path === "session") {
      return json(current ? { authenticated: true, role: current.role, csrf: current.csrf } : { authenticated: false });
    }
    if (!current) throw new HttpError(401, "로그인이 필요합니다.");
    if (method !== "GET" && !equal(request.headers.get("X-CSRF-Token") ?? "", current.csrf)) {
      throw new HttpError(403, "보안 토큰이 올바르지 않습니다.");
    }
    if (method === "POST" && path === "logout") {
      await db.prepare("DELETE FROM research_sessions WHERE token=?").bind(current.token).run();
      return json({ ok: true }, 200, cookie(cookieName, "", 0));
    }
    if (method === "GET" && path === "links") return await list(db, false);
    if (path.startsWith("admin/")) {
      if (current.role !== "admin") throw new HttpError(403, "관리자만 사용할 수 있습니다.");
      if (method === "GET" && path === "admin/links") return await list(db, true);
      return await adminMutation(request, path, db, env, now);
    }
    throw new HttpError(404, "요청을 찾지 못했습니다.");
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof HttpError) return json({ detail: error.message }, error.status);
  return json({ detail: "요청을 처리할 수 없습니다." }, 500);
}

export function handleResearch(request: Request, env: Cloudflare.Env) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(apiPrefix)) return api(request, url, env);
  const path = url.pathname.replace(/\/$/, "");
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  if (path === "/internal") return Response.redirect(new URL("/research", url), 302);
  if (path === "/admin") return Response.redirect(new URL("/research/admin", url), 302);
  if (path === "/research" || path === "/research/admin") {
    return new Response(request.method === "HEAD" ? null : portalHtml, {
      headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
    });
  }
  return null;
}
