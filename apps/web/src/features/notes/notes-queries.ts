import type { NoteList } from "api/client";

import { browserClient, read } from "#/lib/api/client.browser.ts";
import { infiniteQueryOptions } from "#/lib/query.ts";

export const notesQueryKey = ["notes"] as const;

export type FetchRecentNotes = (cursor: string) => Promise<NoteList>;

async function fetchRecentNotes(cursor: string) {
  return read(
    browserClient.api.notes.$get({ query: { sort: "-updatedAt", limit: "5", ...(cursor === "" ? {} : { cursor }) } }),
  );
}

export function recentNotesQuery(fetchPage: FetchRecentNotes = fetchRecentNotes) {
  return infiniteQueryOptions({
    queryKey: [...notesQueryKey, "recent"],
    queryFn: async ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: "",
    getNextPageParam: (page) => page.nextCursor ?? undefined,
    refetchInterval: 15_000,
  });
}
