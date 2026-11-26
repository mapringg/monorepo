import { getCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

import { env } from "#/env.ts";
import { factory } from "#/factory.ts";
import { findSession } from "#/features/sessions/db.ts";
import { ApiError } from "#/lib/errors.ts";
import { toDate } from "#/lib/format.ts";
import { publicRoutes } from "#/middleware/public-routes.ts";

export const sessionCookie = "session";

export function sessionCookieOptions(expiresAt: string) {
  return {
    httpOnly: true,
    sameSite: "Lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    expires: toDate(expiresAt),
  } satisfies CookieOptions;
}

function bearerToken(header: string | undefined) {
  return header?.startsWith("Bearer ") === true ? header.slice("Bearer ".length) : undefined;
}

function isPublic(path: string) {
  return publicRoutes.some((route) => (route.endsWith("/*") ? path.startsWith(route.slice(0, -1)) : path === route));
}

export const authenticate = factory.createMiddleware(async (c, next) => {
  const token = bearerToken(c.req.header("authorization")) ?? getCookie(c, sessionCookie);
  const session = token === undefined ? null : await findSession(token);
  if (token !== undefined && session !== null) c.set("auth", { token, user: session.user });
  else if (!isPublic(c.req.path)) throw new ApiError("unauthenticated");
  await next();
});
