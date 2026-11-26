import { Scalar } from "@scalar/hono-api-reference";
import { openAPIRouteHandler } from "hono-openapi";

import { env } from "#/env.ts";
import { factory } from "#/factory.ts";
import { notesRoutes } from "#/features/notes/routes.ts";
import { sessionsRoutes } from "#/features/sessions/routes.ts";
import { onError, onNotFound } from "#/lib/errors.ts";
import { authenticate } from "#/middleware/auth.ts";
import { csrf } from "#/middleware/csrf.ts";
import { accessLog, requestId } from "#/middleware/request-id.ts";

export const app = factory
  .createApp()
  .use(requestId)
  .use(accessLog)
  .use(csrf)
  .use(authenticate)
  .route("/api/sessions", sessionsRoutes)
  .route("/api/notes", notesRoutes)
  .onError(onError)
  .notFound(onNotFound);

if (env.NODE_ENV === "development") {
  app
    .get("/api/openapi.json", openAPIRouteHandler(app, { documentation: { info: { title: "API", version: "1.0.0" } } }))
    .get("/api/docs", Scalar({ url: "/api/openapi.json" }));
}

export type AppType = typeof app;
