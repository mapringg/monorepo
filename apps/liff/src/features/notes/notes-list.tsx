import { Button } from "#/components/ui/button.tsx";
import { useNotesParams } from "#/features/notes/notes-params.ts";
import { notesQuery } from "#/features/notes/notes-queries.ts";
import { formatDateTime } from "#/lib/format.ts";
import { t } from "#/lib/i18n.ts";
import { useSuspenseInfiniteQuery } from "#/lib/query.ts";

export function NotesList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    notesQuery(useNotesParams()),
  );
  const notes = data.pages.flatMap((page) => page.items);
  return (
    <section className="flex flex-col gap-2">
      {notes.length === 0 ? <p className="text-muted-foreground">{t("notes.empty")}</p> : null}
      <ul className="flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note.id} className="rounded-card border-border border p-3">
            <p className="font-medium">{note.title}</p>
            <p className="text-muted-foreground text-xs">
              {t("notes.updatedAt", { time: formatDateTime(note.updatedAt) })}
            </p>
          </li>
        ))}
      </ul>
      {hasNextPage ? (
        <Button variant="secondary" disabled={isFetchingNextPage} onClick={() => void fetchNextPage()}>
          {t("notes.loadMore")}
        </Button>
      ) : null}
    </section>
  );
}
