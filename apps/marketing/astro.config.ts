import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  integrations: [react()],
  redirects: { "/": "/en/" },
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", default: "http://localhost:4321" }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
