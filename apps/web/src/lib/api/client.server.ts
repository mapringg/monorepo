import "server-only";
import { createClient } from "api/client";
import type { ClientResponse } from "hono/client";
import { DetailedError, parseResponse } from "hono/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "#/lib/env.ts";

export { DetailedError } from "hono/client";

export const sessionCookie = "session";

export async function serverClient() {
  const cookieStore = await cookies();
  const session = cookieStore.get(sessionCookie)?.value;
  const cookie = session === undefined ? {} : { cookie: `${sessionCookie}=${session}` };
  return createClient(env.API_URL, { headers: { origin: env.WEB_ORIGIN, ...cookie } });
}

export async function read<T extends ClientResponse<unknown>>(request: Promise<T> | T) {
  try {
    return await parseResponse(request);
  } catch (error) {
    if (error instanceof DetailedError && error.statusCode === 401) redirect("/signin");
    throw error;
  }
}
