import type { ActionDispatch } from "react";

import { Button } from "#/components/ui/button.tsx";
import type { NotesSelection, NotesSelectionAction } from "#/features/notes/notes-state.ts";
import { t } from "#/lib/i18n.ts";

type NotesRecentToolbarProps = {
  selection: NotesSelection;
  dispatch: ActionDispatch<[NotesSelectionAction]>;
  pending: boolean;
};

export function NotesRecentToolbar({ selection, dispatch, pending }: NotesRecentToolbarProps) {
  if (selection.status === "browsing") {
    return (
      <Button type="button" variant="secondary" onClick={() => dispatch({ type: "start" })}>
        {t("notes.select")}
      </Button>
    );
  }
  return (
    <div className="flex gap-2">
      <Button type="button" variant="secondary" onClick={() => dispatch({ type: "clear" })}>
        {t("notes.cancel")}
      </Button>
      <Button type="submit" variant="danger" disabled={pending || selection.ids.length === 0}>
        {t("notes.deleteSelected", { count: selection.ids.length })}
      </Button>
    </div>
  );
}
