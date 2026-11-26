import { z } from "zod";

import { Button } from "#/components/ui/button.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import { createNote, notesQueryKey } from "#/features/notes/notes-queries.ts";
import { t } from "#/lib/i18n.ts";
import { useMutation, useQueryClient } from "#/lib/query.ts";

const noteFormSchema = z.object({ title: z.string() });

export function NotesCreateForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: notesQueryKey }),
  });
  return (
    <form
      action={async (formData) => {
        const { title } = noteFormSchema.parse(Object.fromEntries(formData));
        await mutation.mutateAsync(title).catch(() => undefined);
      }}
      className="flex items-end gap-2"
    >
      <div className="flex-1">
        <TextField name="title" label={t("notes.fieldTitle")} />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {t("notes.create")}
      </Button>
      {mutation.isError ? <p className="text-danger text-sm">{t("notes.failed")}</p> : null}
    </form>
  );
}
