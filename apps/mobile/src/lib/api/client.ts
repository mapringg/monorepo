import { createClient } from "api/client";

import { env } from "#/lib/env.ts";
import { sessionToken } from "#/lib/session.ts";

export const client = createClient(env.EXPO_PUBLIC_API_URL, {
  headers: () => {
    const token = sessionToken();
    return token === null ? {} : { authorization: `Bearer ${token}` };
  },
});

export { DetailedError, parseResponse as read } from "hono/client";
