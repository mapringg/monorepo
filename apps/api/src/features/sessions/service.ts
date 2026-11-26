import { env } from "#/env.ts";
import type { CreateSessionInput, SessionUser } from "#/features/sessions/schema.ts";
import { ApiError } from "#/lib/errors.ts";
import { verifyLineIdToken } from "#/upstreams/line.ts";

export async function identify(input: CreateSessionInput) {
  if (input.provider === "line") {
    const identity = await verifyLineIdToken(input.idToken);
    return { id: `line:${identity.sub}`, name: identity.name } satisfies SessionUser;
  }
  if (env.NODE_ENV === "production") throw new ApiError("forbidden");
  return { id: `demo:${input.name.toLowerCase()}`, name: input.name } satisfies SessionUser;
}
