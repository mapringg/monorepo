import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  PORT: z.coerce.number().int().default(8787),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://localhost:5173")
    .transform((value) => value.split(",")),
  LINE_CHANNEL_ID: z.string().default(""),
});

export const env = envSchema.parse(process.env);
