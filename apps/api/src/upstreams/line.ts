import { z } from "zod";

import { env } from "#/env.ts";
import { ApiError } from "#/lib/errors.ts";

const verifyUrl = "https://api.line.me/oauth2/v2.1/verify";

const timeoutMs = 5000;

const lineIdTokenSchema = z.object({
  sub: z.string(),
  name: z.string().default(""),
});

async function post(body: URLSearchParams) {
  try {
    return await fetch(verifyUrl, { method: "POST", body, signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    throw new ApiError(timedOut ? "upstream_timeout" : "upstream_error", { cause: error });
  }
}

export async function verifyLineIdToken(idToken: string) {
  const response = await post(new URLSearchParams({ id_token: idToken, client_id: env.LINE_CHANNEL_ID }));
  if (response.status === 400) throw new ApiError("unauthenticated");
  if (!response.ok) throw new ApiError("upstream_error");
  const parsed = lineIdTokenSchema.safeParse(await response.json());
  if (!parsed.success) throw new ApiError("upstream_error", { cause: parsed.error });
  return parsed.data;
}
