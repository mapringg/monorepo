import { createClient } from "api/client";
import { parseResponse } from "hono/client";

import { env } from "#/lib/env.ts";

let sessionToken: string | null = null;

export const client = createClient(env.VITE_API_URL || location.origin, {
  headers: () => (sessionToken === null ? {} : { authorization: `Bearer ${sessionToken}` }),
});

export { DetailedError, parseResponse as read } from "hono/client";

export async function startSession(idToken: string) {
  const session = await parseResponse(client.api.sessions.$post({ json: { provider: "line", idToken } }));
  sessionToken = session.token;
}

export async function endSession() {
  try {
    await parseResponse(client.api.sessions.current.$delete());
  } finally {
    sessionToken = null;
  }
}
