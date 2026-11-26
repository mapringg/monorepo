import { requestId as honoRequestId } from "hono/request-id";

import { factory } from "#/factory.ts";
import { log } from "#/lib/log.ts";

export const requestId = honoRequestId();

export const accessLog = factory.createMiddleware(async (c, next) => {
  const started = performance.now();
  await next();
  log.info("request", {
    requestId: c.get("requestId"),
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    durationMs: Math.round(performance.now() - started),
  });
});
