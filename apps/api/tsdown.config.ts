import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: { server: "src/server.ts" },
    platform: "node",
    format: "esm",
    dts: false,
  },
  {
    entry: { client: "src/client.ts" },
    platform: "neutral",
    format: "esm",
    dts: { dtsOnly: true, generator: "tsrs" },
    deps: { neverBundle: ["hono"] },
  },
]);
