"use client";

import type { Note } from "api/client";
import { useActionState } from "react";

import { Button } from "#/components/ui/button.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import { updateNoteAction } from "#/features/notes/notes-actions.ts";
import type { ActionState } from "#/lib/action.ts";
import { t } from "#/lib/i18n.ts";

export function NotesEditForm({ note }: { note: Note }) {
  const [state, formAction, pending] = useActionState<ActionState<Note>, FormData>(
    updateNoteAction.bind(null, note.id),
    null,
  );
  const fieldErrors = state?.ok === false ? state.fieldErrors : undefined;
  return (
    <form action={formAction} className="flex flex-col gap-3">
      <TextField name="title" label={t("notes.fieldTitle")} defaultValue={note.title} errors={fieldErrors?.title} />
      <TextField
        name="body"
        label={t("notes.fieldBody")}
        defaultValue={note.body}
        errors={fieldErrors?.body}
        multiline
      />
      {state?.ok === false ? <p className="text-danger text-sm">{state.message}</p> : null}
      {state?.ok === true ? <p className="text-muted-foreground text-sm">{t("notes.saved")}</p> : null}
      <Button type="submit" disabled={pending} className="self-start">
        {t("notes.save")}
      </Button>
    </form>
  );
}
