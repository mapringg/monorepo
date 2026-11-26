import Link from "next/link";

import { Button } from "#/components/ui/button.tsx";
import { ConfirmDialog } from "#/components/ui/confirm-dialog.tsx";
import { deleteNoteAction } from "#/features/notes/notes-actions.ts";
import { NotesEditForm } from "#/features/notes/notes-edit-form.tsx";
import { getNote } from "#/features/notes/notes.server.ts";
import { t } from "#/lib/i18n.ts";

export async function NotesEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await getNote(id);
  return (
    <section className="flex flex-col gap-4">
      <Link href="/notes" className="text-primary text-sm">
        {t("notes.back")}
      </Link>
      <NotesEditForm key={note.id} note={note} />
      <ConfirmDialog
        trigger={t("notes.delete")}
        title={t("notes.deleteConfirm")}
        description={t("notes.deleteDescription")}
        cancel={t("notes.cancel")}
      >
        <form action={deleteNoteAction.bind(null, note.id)}>
          <Button type="submit" variant="danger">
            {t("notes.delete")}
          </Button>
        </form>
      </ConfirmDialog>
    </section>
  );
}
