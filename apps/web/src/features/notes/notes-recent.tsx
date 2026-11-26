import { connection } from "next/server";

import { recentNotesQuery } from "#/features/notes/notes-queries.ts";
import { NotesRecentList } from "#/features/notes/notes-recent-list.tsx";
import { listRecentNotes } from "#/features/notes/notes.server.ts";
import { HydrationBoundary, dehydrate, getQueryClient, noop } from "#/lib/query.ts";

export async function NotesRecent() {
  await connection();
  const queryClient = getQueryClient();
  void queryClient.infiniteQuery(recentNotesQuery(listRecentNotes)).catch(noop);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesRecentList />
    </HydrationBoundary>
  );
}
