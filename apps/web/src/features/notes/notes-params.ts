import type { Route } from "next";
import * as z from "zod/mini";

const notesSorts = ["-createdAt", "createdAt", "title", "-updatedAt"] as const;

const defaultSort = "-createdAt";

const notesParamsSchema = z.object({
  q: z.catch(z.optional(z.string().check(z.trim(), z.minLength(1), z.maxLength(200))), undefined),
  sort: z.catch(z._default(z.enum(notesSorts), defaultSort), defaultSort),
  cursor: z.catch(z.array(z.string().check(z.minLength(1), z.maxLength(32))).check(z.maxLength(50)), []),
  from: z.catch(z.optional(z.iso.date()), undefined),
  to: z.catch(z.optional(z.iso.date()), undefined),
});

export type NotesParams = z.infer<typeof notesParamsSchema>;

export type SearchParams = Readonly<Record<string, string | readonly string[] | undefined>>;

function toSearch(record: SearchParams) {
  return new URLSearchParams(
    Object.entries(record).flatMap(([key, value]) => [value ?? []].flat().map((item) => [key, item])),
  );
}

export function parseNotesParams(record: SearchParams) {
  const search = toSearch(record);
  return notesParamsSchema.parse({
    q: search.get("q") ?? undefined,
    sort: search.get("sort") ?? undefined,
    cursor: search.getAll("cursor"),
    from: search.get("from") ?? undefined,
    to: search.get("to") ?? undefined,
  });
}

export function notesHref(params: Partial<Omit<NotesParams, "cursor">> & { cursor?: readonly string[] }) {
  const search = new URLSearchParams();
  if (params.q !== undefined) search.set("q", params.q);
  if (params.sort !== undefined && params.sort !== defaultSort) search.set("sort", params.sort);
  for (const cursor of params.cursor ?? []) search.append("cursor", cursor);
  if (params.from !== undefined) search.set("from", params.from);
  if (params.to !== undefined) search.set("to", params.to);
  const query = search.toString();
  return (query === "" ? "/notes" : `/notes?${query}`) satisfies Route;
}

export function notesApiQuery(params: NotesParams) {
  return {
    sort: params.sort,
    ...(params.q === undefined ? {} : { q: params.q }),
    ...(params.cursor.at(-1) === undefined ? {} : { cursor: params.cursor.at(-1) }),
    ...(params.from === undefined ? {} : { from: params.from }),
    ...(params.to === undefined ? {} : { to: params.to }),
  };
}
