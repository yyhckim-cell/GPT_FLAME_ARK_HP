import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const researchLinks = sqliteTable("research_links", {
  id: integer().primaryKey({ autoIncrement: true }),
  groupName: text("group_name").notNull(),
  title: text().notNull(),
  description: text().notNull(),
  url: text().notNull(),
  sortOrder: integer("sort_order").notNull(),
  icon: text().notNull(),
  isVisible: integer("is_visible").notNull(),
});

export const researchAudit = sqliteTable("research_audit", {
  id: integer().primaryKey({ autoIncrement: true }),
  operation: text().notNull(),
  detail: text().notNull(),
  createdAt: integer("created_at").notNull(),
});

export const researchState = sqliteTable("research_state", {
  key: text().primaryKey(),
  value: text().notNull(),
});

export const researchSessions = sqliteTable("research_sessions", {
  token: text().primaryKey(),
  role: text().notNull(),
  csrf: text().notNull(),
  expires: integer().notNull(),
});

export const researchAttempts = sqliteTable("research_attempts", {
  client: text().primaryKey(),
  started: integer().notNull(),
  count: integer().notNull(),
});
