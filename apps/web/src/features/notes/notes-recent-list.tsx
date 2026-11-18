"use client";

import { useActionState, useReducer } from "react";

import { Button } from "#/components/ui/button.tsx";
import { deleteNotesAction } from "#/features/notes/notes-actions.ts";
import { NotesItem } from "#/features/notes/notes-item.tsx";
import { notesQueryKey, recentNotesQuery } from "#/features/notes/notes-queries.ts";
import { NotesRecentToolbar } from "#/features/notes/notes-recent-toolbar.tsx";
import { initialNotesSelection, notesSelectionReducer } from "#/features/notes/notes-state.ts";
import type { ActionState } from "#/lib/action.ts";
import { t } from "#/lib/i18n.ts";
import { useQueryClient, useSuspenseInfiniteQuery } from "#/lib/query.ts";

function useDeleteSelected(onDeleted: () => void) {
  const queryClient = useQueryClient();
  return useActionState<ActionState<number>, FormData>(async (previous, formData) => {
    const result = await deleteNotesAction(previous, formData);
    if (result.ok) {
      onDeleted();
      await queryClient.invalidateQueries({ queryKey: notesQueryKey });
    }
    return result;
  }, null);
}

export function NotesRecentList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(recentNotesQuery());
  const [selection, dispatch] = useReducer(notesSelectionReducer, initialNotesSelection);
  const [, formAction, pending] = useDeleteSelected(() => dispatch({ type: "clear" }));
  const notes = data.pages.flatMap((page) => page.items);
  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t("notes.recent")}</h2>
        <NotesRecentToolbar selection={selection} dispatch={dispatch} pending={pending} />
      </div>
      <ul className="flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note.id} className="flex items-center gap-2">
            {selection.status === "selecting" ? (
              <input
                type="checkbox"
                name="id"
                value={note.id}
                aria-label={note.title}
                checked={selection.ids.includes(note.id)}
                onChange={() => dispatch({ type: "toggle", id: note.id })}
              />
            ) : null}
            <div className="flex-1">
              <NotesItem note={note} />
            </div>
          </li>
        ))}
      </ul>
      {hasNextPage ? (
        <Button type="button" variant="secondary" disabled={isFetchingNextPage} onClick={() => void fetchNextPage()}>
          {t("notes.loadMore")}
        </Button>
      ) : null}
    </form>
  );
}
