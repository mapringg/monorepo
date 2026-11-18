import Link from "next/link";

import { NotesFilters } from "#/features/notes/notes-filters.tsx";
import { NotesItem } from "#/features/notes/notes-item.tsx";
import type { SearchParams } from "#/features/notes/notes-params.ts";
import { notesHref, parseNotesParams } from "#/features/notes/notes-params.ts";
import { listNotes } from "#/features/notes/notes.server.ts";
import { t } from "#/lib/i18n.ts";

export async function NotesList({ search }: { search: Promise<SearchParams> }) {
  const params = parseNotesParams(await search);
  const page = await listNotes(params);
  const pager = "text-sm font-medium text-primary";
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{t("notes.title")}</h1>
      <NotesFilters params={params} />
      {page.items.length === 0 ? <p className="text-muted-foreground">{t("notes.empty")}</p> : null}
      <ul className="flex flex-col gap-2">
        {page.items.map((note) => (
          <li key={note.id}>
            <NotesItem note={note} />
          </li>
        ))}
      </ul>
      <nav className="flex justify-between">
        {params.cursor.length > 0 ? (
          <Link className={pager} href={notesHref({ ...params, cursor: params.cursor.slice(0, -1) })}>
            {t("notes.previous")}
          </Link>
        ) : (
          <span />
        )}
        {page.nextCursor === null ? null : (
          <Link className={pager} href={notesHref({ ...params, cursor: [...params.cursor, page.nextCursor] })}>
            {t("notes.next")}
          </Link>
        )}
      </nav>
    </section>
  );
}
