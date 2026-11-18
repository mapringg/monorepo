import { Section } from "#/components/boundary/section.tsx";
import { Screen } from "#/components/ui/screen.tsx";
import { NotesCreateForm } from "#/features/notes/notes-create-form.tsx";
import { NotesList } from "#/features/notes/notes-list.tsx";
import { SessionsSignOut } from "#/features/sessions/sessions-sign-out.tsx";

export { RouteError as ErrorBoundary } from "#/components/boundary/route-error.tsx";

export default function NotesScreen() {
  return (
    <Screen>
      <SessionsSignOut />
      <NotesCreateForm />
      <Section>
        <NotesList />
      </Section>
    </Screen>
  );
}
