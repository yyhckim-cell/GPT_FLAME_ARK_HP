declare namespace Cloudflare {
  interface Env {
    FLAME_ARK_ADMIN_PASSWORD_SHA256?: string;
    INTERNAL_PORTAL_PASSWORD_SHA256?: string;
    FLAME_ARK_LOCAL_PREVIEW?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
