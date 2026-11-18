"use client";

import type { Note } from "api/client";
import { useActionState } from "react";

import { Button } from "#/components/ui/button.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import { createNoteAction } from "#/features/notes/notes-actions.ts";
import { notesQueryKey } from "#/features/notes/notes-queries.ts";
import type { ActionState } from "#/lib/action.ts";
import { t } from "#/lib/i18n.ts";
import { useQueryClient } from "#/lib/query.ts";

export function NotesCreateForm() {
  const queryClient = useQueryClient();
  const [state, formAction, pending] = useActionState<ActionState<Note>, FormData>(async (previous, formData) => {
    const result = await createNoteAction(previous, formData);
    if (result.ok) await queryClient.invalidateQueries({ queryKey: notesQueryKey });
    return result;
  }, null);
  const fieldErrors = state?.ok === false ? state.fieldErrors : undefined;
  return (
    <form action={formAction} className="rounded-card border-border flex flex-col gap-3 border p-4">
      <h2 className="text-lg font-semibold">{t("notes.newTitle")}</h2>
      <TextField name="title" label={t("notes.fieldTitle")} errors={fieldErrors?.title} />
      <TextField name="body" label={t("notes.fieldBody")} errors={fieldErrors?.body} multiline />
      {state?.ok === false ? <p className="text-danger text-sm">{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="self-start">
        {t("notes.create")}
      </Button>
    </form>
  );
}
