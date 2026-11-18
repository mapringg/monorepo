import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

import { notesTag } from "#/features/notes/notes-cache.ts";
import type { NotesParams } from "#/features/notes/notes-params.ts";
import { notesApiQuery } from "#/features/notes/notes-params.ts";
import { DetailedError, read, serverClient } from "#/lib/api/client.server.ts";

export async function listNotes(params: NotesParams) {
  "use cache: private";
  cacheTag(notesTag);
  cacheLife({ stale: 30 });
  const client = await serverClient();
  return read(client.api.notes.$get({ query: notesApiQuery(params) }));
}

export async function listRecentNotes(cursor: string) {
  "use cache: private";
  cacheTag(notesTag);
  cacheLife({ stale: 30 });
  const client = await serverClient();
  return read(
    client.api.notes.$get({ query: { sort: "-updatedAt", limit: "5", ...(cursor === "" ? {} : { cursor }) } }),
  );
}

export async function getNote(id: string) {
  "use cache: private";
  cacheTag(notesTag);
  cacheLife({ stale: 30 });
  const client = await serverClient();
  try {
    return await read(client.api.notes[":id"].$get({ param: { id } }));
  } catch (error) {
    if (error instanceof DetailedError && error.statusCode === 404) notFound();
    throw error;
  }
}
