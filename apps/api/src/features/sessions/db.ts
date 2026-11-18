import type { Session, SessionUser } from "#/features/sessions/schema.ts";
import { createId, createMemoryStore } from "#/infra/memory-store.ts";
import { addDaysIso, nowIso, toTime } from "#/lib/format.ts";

type SessionRow = Session & { token: string };

const sessions = createMemoryStore<SessionRow>();

const lifetimeDays = 30;

export async function createSession(user: SessionUser) {
  const token = createId(32);
  return sessions.set(token, { token, user, expiresAt: addDaysIso(nowIso(), lifetimeDays) });
}

export async function findSession(token: string) {
  const row = sessions.get(token);
  if (row === undefined || toTime(row.expiresAt) <= toTime(nowIso())) return null;
  return { user: row.user, expiresAt: row.expiresAt } satisfies Session;
}

export async function deleteSession(token: string) {
  sessions.delete(token);
}
