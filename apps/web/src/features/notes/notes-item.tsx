import type { Note } from "api/client";
import Link from "next/link";

import { formatDateTime } from "#/lib/format.ts";
import { t } from "#/lib/i18n.ts";

export function NotesItem({ note }: { note: Note }) {
  return (
    <Link href={`/notes/${note.id}`} className="rounded-card border-border hover:bg-muted flex flex-col border p-3">
      <span className="text-foreground font-medium">{note.title}</span>
      <span className="text-muted-foreground text-xs">
        {t("notes.updatedAt", { time: formatDateTime(note.updatedAt) })}
      </span>
    </Link>
  );
}
