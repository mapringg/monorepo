import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.test.ts",
  use: { baseURL: "http://localhost:3000", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "pnpm --filter api build && NODE_ENV=development pnpm --filter api start",
      url: "http://localhost:8787/api/docs",
      reuseExistingServer: true,
    },
    {
      command: "pnpm build && pnpm start",
      url: "http://localhost:3000/signin",
      reuseExistingServer: true,
      timeout: 180_000,
    },
  ],
});
