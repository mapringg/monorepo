import { csrf as honoCsrf } from "hono/csrf";

import { env } from "#/env.ts";
import { factory } from "#/factory.ts";

const cookieCsrf = honoCsrf({ origin: env.ALLOWED_ORIGINS });

export const csrf = factory.createMiddleware(async (c, next) => {
  if (c.req.header("authorization")?.startsWith("Bearer ") === true) return next();
  return cookieCsrf(c, next);
});
