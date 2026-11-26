import { z } from "zod";

const sessionUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type SessionUser = z.infer<typeof sessionUserSchema>;

export const createSessionSchema = z.discriminatedUnion("provider", [
  z.object({ provider: z.literal("line"), idToken: z.string().min(1) }),
  z.object({ provider: z.literal("demo"), name: z.string().trim().min(1).max(80) }),
]);

export const sessionSchema = z.object({
  user: sessionUserSchema,
  expiresAt: z.iso.datetime(),
});

export const createdSessionSchema = sessionSchema.extend({
  token: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
