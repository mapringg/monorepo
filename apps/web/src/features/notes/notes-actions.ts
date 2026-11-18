"use server";

import type { Note } from "api/client";
import { updateTag } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import * as z from "zod/mini";

import { notesTag } from "#/features/notes/notes-cache.ts";
import type { ActionResult, ActionState } from "#/lib/action.ts";
import { read, serverClient } from "#/lib/api/client.server.ts";
import { t } from "#/lib/i18n.ts";
import { log } from "#/lib/log.ts";

const noteFormSchema = z.object({
  title: z.string().check(z.trim(), z.minLength(1), z.maxLength(200)),
  body: z.string().check(z.maxLength(10_000)),
});

const noteIdsSchema = z.array(z.string().check(z.minLength(1))).check(z.minLength(1));

function parseNoteForm(formData: FormData) {
  return noteFormSchema.safeParse({ title: formData.get("title") ?? "", body: formData.get("body") ?? "" });
}

function invalid(error: z.core.$ZodError) {
  return {
    ok: false,
    message: t("notes.invalid"),
    fieldErrors: z.flattenError(error).fieldErrors,
  } satisfies ActionResult<never>;
}

function failed(error: unknown) {
  unstable_rethrow(error);
  log.error("note action failed", { error: String(error) });
  return { ok: false, message: t("notes.failed") } satisfies ActionResult<never>;
}

export async function createNoteAction(_state: ActionState<Note>, formData: FormData) {
  const input = parseNoteForm(formData);
  if (!input.success) return invalid(input.error);
  const client = await serverClient();
  const note = await read(client.api.notes.$post({ json: input.data })).catch(failed);
  if ("ok" in note) return note;
  updateTag(notesTag);
  return { ok: true, data: note } satisfies ActionResult<Note>;
}

export async function updateNoteAction(id: string, _state: ActionState<Note>, formData: FormData) {
  const input = parseNoteForm(formData);
  if (!input.success) return invalid(input.error);
  const client = await serverClient();
  const note = await read(client.api.notes[":id"].$patch({ param: { id }, json: input.data })).catch(failed);
  if ("ok" in note) return note;
  updateTag(notesTag);
  return { ok: true, data: note } satisfies ActionResult<Note>;
}

export async function deleteNoteAction(id: string) {
  const client = await serverClient();
  await read(client.api.notes[":id"].$delete({ param: { id } }));
  updateTag(notesTag);
  redirect("/notes");
}

export async function deleteNotesAction(_state: ActionState<number>, formData: FormData) {
  const ids = noteIdsSchema.safeParse(formData.getAll("id"));
  if (!ids.success) return invalid(ids.error);
  const client = await serverClient();
  const results = await Promise.all(
    ids.data.map(async (id) =>
      read(client.api.notes[":id"].$delete({ param: { id } }))
        .then(() => true)
        .catch(failed),
    ),
  );
  updateTag(notesTag);
  return { ok: true, data: results.filter((result) => result === true).length } satisfies ActionResult<number>;
}
