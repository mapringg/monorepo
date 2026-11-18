import type {
  CreateNoteInput,
  ListNotesQuery,
  Note,
  NoteList,
  NoteSort,
  UpdateNoteInput,
} from "#/features/notes/schema.ts";
import { createId, createMemoryStore } from "#/infra/memory-store.ts";
import { ApiError } from "#/lib/errors.ts";
import { nowIso, toTime } from "#/lib/format.ts";

type NoteRow = Note & { ownerId: string };

const notes = createMemoryStore<NoteRow>();

function toNote({ ownerId: _ownerId, ...note }: NoteRow) {
  return note satisfies Note;
}

function compareBy(sort: readonly NoteSort[]) {
  return (a: NoteRow, b: NoteRow) => {
    for (const { field, direction } of sort) {
      const order = a[field].localeCompare(b[field]);
      if (order !== 0) return order * direction;
    }
    return a.id.localeCompare(b.id);
  };
}

function matches(row: NoteRow, ownerId: string, query: ListNotesQuery) {
  const created = toTime(row.createdAt);
  const text = `${row.title}\n${row.body}`.toLowerCase();
  return (
    row.ownerId === ownerId &&
    (query.q === undefined || text.includes(query.q.toLowerCase())) &&
    (query.from === undefined || created >= toTime(query.from)) &&
    (query.to === undefined || created < toTime(query.to))
  );
}

export async function listNotes(ownerId: string, query: ListNotesQuery) {
  const rows = notes
    .values()
    .filter((row) => matches(row, ownerId, query))
    .toSorted(compareBy(query.sort));
  const start = query.cursor === undefined ? 0 : rows.findIndex((row) => row.id === query.cursor) + 1;
  if (start === 0 && query.cursor !== undefined) throw new ApiError("invalid_request");
  const page = rows.slice(start, start + query.limit);
  const last = page.at(-1);
  const nextCursor = last !== undefined && start + query.limit < rows.length ? last.id : null;
  return { items: page.map((row) => toNote(row)), nextCursor } satisfies NoteList;
}

export async function getNote(ownerId: string, id: string) {
  const row = notes.get(id);
  return row?.ownerId === ownerId ? toNote(row) : null;
}

export async function createNote(ownerId: string, input: CreateNoteInput) {
  const now = nowIso();
  const row = { id: createId(), ownerId, title: input.title, body: input.body, createdAt: now, updatedAt: now };
  return toNote(notes.set(row.id, row));
}

export async function updateNote(ownerId: string, id: string, input: UpdateNoteInput) {
  const row = notes.get(id);
  if (row?.ownerId !== ownerId) return null;
  return toNote(
    notes.set(id, {
      ...row,
      title: input.title ?? row.title,
      body: input.body ?? row.body,
      updatedAt: nowIso(),
    }),
  );
}

export async function deleteNote(ownerId: string, id: string) {
  const row = notes.get(id);
  return row?.ownerId === ownerId && notes.delete(id);
}
