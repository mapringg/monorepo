import { serve } from "@hono/node-server";

import { app } from "#/app.ts";
import { env } from "#/env.ts";
import { log } from "#/lib/log.ts";

const server = serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  log.info("listening", { port: info.port, nodeEnv: env.NODE_ENV });
});

function shutDown() {
  server.close();
}

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
