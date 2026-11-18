import { Section } from "#/components/boundary/section.tsx";
import { Skeleton } from "#/components/boundary/skeleton.tsx";
import { NotesCreateForm } from "#/features/notes/notes-create-form.tsx";
import { NotesList } from "#/features/notes/notes-list.tsx";
import { NotesRecent } from "#/features/notes/notes-recent.tsx";

export default function NotesPage({ searchParams }: PageProps<"/notes">) {
  return (
    <>
      <Section fallback={<Skeleton rows={5} />}>
        <NotesList search={searchParams} />
      </Section>
      <NotesCreateForm />
      <Section fallback={<Skeleton rows={3} />}>
        <NotesRecent />
      </Section>
    </>
  );
}
