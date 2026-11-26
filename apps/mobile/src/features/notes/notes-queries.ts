import { client, read } from "#/lib/api/client.ts";
import { infiniteQueryOptions } from "#/lib/query.ts";

export const notesQueryKey = ["notes"] as const;

export function notesQuery() {
  return infiniteQueryOptions({
    queryKey: [...notesQueryKey, "list"],
    queryFn: async ({ pageParam }) =>
      read(client.api.notes.$get({ query: { limit: "20", ...(pageParam === "" ? {} : { cursor: pageParam }) } })),
    initialPageParam: "",
    getNextPageParam: (page) => page.nextCursor ?? undefined,
  });
}

export async function createNote(title: string) {
  return read(client.api.notes.$post({ json: { title, body: "" } }));
}
