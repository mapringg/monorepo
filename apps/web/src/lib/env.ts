import { z } from "zod";

const envSchema = z.object({
  API_URL: z.url().default("http://localhost:8787"),
  WEB_ORIGIN: z.url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
});

export const env = envSchema.parse(process.env);
