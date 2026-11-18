import type { NotesParams } from "#/features/notes/notes-params.ts";
import { client, read } from "#/lib/api/client.ts";
import { infiniteQueryOptions } from "#/lib/query.ts";

export const notesQueryKey = ["notes"] as const;

export function notesQuery(params: NotesParams) {
  return infiniteQueryOptions({
    queryKey: [...notesQueryKey, params],
    queryFn: async ({ pageParam }) =>
      read(
        client.api.notes.$get({
          query: {
            sort: params.sort,
            limit: "20",
            ...(params.q === undefined ? {} : { q: params.q }),
            ...(pageParam === "" ? {} : { cursor: pageParam }),
          },
        }),
      ),
    initialPageParam: "",
    getNextPageParam: (page) => page.nextCursor ?? undefined,
  });
}

export async function createNote(title: string) {
  return read(client.api.notes.$post({ json: { title, body: "" } }));
}
