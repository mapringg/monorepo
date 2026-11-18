import Form from "next/form";

import { Button } from "#/components/ui/button.tsx";
import { SelectField } from "#/components/ui/select-field.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import type { NotesParams } from "#/features/notes/notes-params.ts";
import { notesHref } from "#/features/notes/notes-params.ts";
import { t } from "#/lib/i18n.ts";

const sortOptions = [
  { value: "-createdAt", label: t("notes.sortNewest") },
  { value: "createdAt", label: t("notes.sortOldest") },
  { value: "title", label: t("notes.sortTitle") },
  { value: "-updatedAt", label: t("notes.sortUpdated") },
] as const;

export function NotesFilters({ params }: { params: NotesParams }) {
  return (
    <Form key={notesHref(params)} action="/notes" className="flex flex-wrap items-end gap-3">
      <TextField name="q" type="search" label={t("notes.search")} defaultValue={params.q ?? ""} />
      <SelectField name="sort" label={t("notes.sort")} defaultValue={params.sort} options={sortOptions} />
      <TextField name="from" type="date" label={t("notes.from")} defaultValue={params.from ?? ""} />
      <TextField name="to" type="date" label={t("notes.to")} defaultValue={params.to ?? ""} />
      <Button type="submit" variant="secondary">
        {t("notes.apply")}
      </Button>
    </Form>
  );
}
