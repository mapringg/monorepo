"use server";

import type { Session } from "api/client";
import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import * as z from "zod/mini";

import type { ActionResult, ActionState } from "#/lib/action.ts";
import { read, serverClient, sessionCookie } from "#/lib/api/client.server.ts";
import { env } from "#/lib/env.ts";
import { t } from "#/lib/i18n.ts";
import { log } from "#/lib/log.ts";

async function startSession(name: string) {
  const client = await serverClient();
  const session = await read(client.api.sessions.$post({ json: { provider: "demo", name } }));
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    expires: Date.parse(session.expiresAt),
  });
}

const signInSchema = z.object({ name: z.string().check(z.trim(), z.minLength(1), z.maxLength(80)) });

export async function signInAction(_state: ActionState<Session>, formData: FormData) {
  const input = signInSchema.safeParse({ name: formData.get("name") ?? "" });
  if (!input.success) {
    return {
      ok: false,
      message: t("sessions.failed"),
      fieldErrors: z.flattenError(input.error).fieldErrors,
    } satisfies ActionResult<Session>;
  }
  try {
    await startSession(input.data.name);
  } catch (error) {
    unstable_rethrow(error);
    log.error("sign-in failed", { error: String(error) });
    return { ok: false, message: t("sessions.failed") } satisfies ActionResult<Session>;
  }
  return redirect("/notes");
}

export async function signOutAction() {
  const client = await serverClient();
  await read(client.api.sessions.current.$delete());
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
  redirect("/signin");
}
