import { client, read } from "#/lib/api/client.ts";
import { queryClient } from "#/lib/query.ts";
import { setSessionToken } from "#/lib/session.ts";

export async function signIn(name: string) {
  const session = await read(client.api.sessions.$post({ json: { provider: "demo", name } }));
  setSessionToken(session.token);
}

export async function signOut() {
  try {
    await read(client.api.sessions.current.$delete());
  } finally {
    setSessionToken(null);
    queryClient.clear();
  }
}
