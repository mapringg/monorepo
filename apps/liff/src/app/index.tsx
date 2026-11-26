import { createFileRoute } from "@tanstack/react-router";

import { RouteError } from "#/components/boundary/route-error.tsx";
import { Skeleton } from "#/components/boundary/skeleton.tsx";
import { NotesCreateForm } from "#/features/notes/notes-create-form.tsx";
import { NotesList } from "#/features/notes/notes-list.tsx";
import { notesParamsSchema } from "#/features/notes/notes-params.ts";
import { NotesTitle } from "#/features/notes/notes-title.tsx";
import { SessionsSignOut } from "#/features/sessions/sessions-sign-out.tsx";

export const Route = createFileRoute("/")({
  validateSearch: notesParamsSchema,
  pendingComponent: () => <Skeleton rows={4} />,
  errorComponent: RouteError,
  component: () => (
    <>
      <header className="flex items-center justify-between">
        <NotesTitle />
        <SessionsSignOut />
      </header>
      <NotesCreateForm />
      <NotesList />
    </>
  ),
});
