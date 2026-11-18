import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", routesDirectory: "src/app", generatedRouteTree: "src/route-tree.gen.ts" }),
    react(),
    tailwindcss(),
  ],
  server: { proxy: { "/api": "http://localhost:8787" } },
  build: { target: "esnext" },
});
