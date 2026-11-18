import { describeRoute } from "hono-openapi";
import { deleteCookie, setCookie } from "hono/cookie";

import { factory } from "#/factory.ts";
import { createSession, deleteSession, findSession } from "#/features/sessions/db.ts";
import { createdSessionSchema, createSessionSchema, sessionSchema } from "#/features/sessions/schema.ts";
import { identify } from "#/features/sessions/service.ts";
import { ApiError } from "#/lib/errors.ts";
import { errorResponses, jsonResponse } from "#/lib/openapi.ts";
import { v } from "#/lib/validate.ts";
import { sessionCookie, sessionCookieOptions } from "#/middleware/auth.ts";

export const sessionsRoutes = factory
  .createApp()
  .post(
    "/",
    describeRoute({
      summary: "Sign in",
      responses: { 201: jsonResponse("Session created", createdSessionSchema), 400: errorResponses[400] },
    }),
    v("json", createSessionSchema),
    async (c) => {
      const user = await identify(c.req.valid("json"));
      const session = await createSession(user);
      setCookie(c, sessionCookie, session.token, sessionCookieOptions(session.expiresAt));
      return c.json(session, 201);
    },
  )
  .get(
    "/current",
    describeRoute({
      summary: "Current session",
      responses: { 200: jsonResponse("Current session", sessionSchema), 401: errorResponses[401] },
    }),
    async (c) => {
      const session = await findSession(c.var.auth.token);
      if (session === null) throw new ApiError("unauthenticated");
      return c.json(session, 200);
    },
  )
  .delete(
    "/current",
    describeRoute({
      summary: "Sign out",
      responses: { 204: { description: "Signed out" }, 401: errorResponses[401] },
    }),
    async (c) => {
      await deleteSession(c.var.auth.token);
      deleteCookie(c, sessionCookie, { path: "/" });
      return c.body(null, 204);
    },
  );

export type SessionsRoutes = typeof sessionsRoutes;
