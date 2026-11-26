import { Section } from "#/components/boundary/section.tsx";
import { Skeleton } from "#/components/boundary/skeleton.tsx";
import { NotesEditor } from "#/features/notes/notes-editor.tsx";

export default function NotePage({ params }: PageProps<"/notes/[id]">) {
  return (
    <Section fallback={<Skeleton rows={2} />}>
      <NotesEditor params={params} />
    </Section>
  );
}
