import { z } from "zod";

const envSchema = z.object({
  VITE_LIFF_ID: z.string().default(""),
  VITE_API_URL: z.string().default(""),
});

export const env = envSchema.parse(import.meta.env);
