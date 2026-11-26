import { Text, View } from "react-native";

import { Button } from "#/components/ui/button.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import { createNote, notesQueryKey } from "#/features/notes/notes-queries.ts";
import { useForm } from "#/lib/form.ts";
import { t } from "#/lib/i18n.ts";
import { useMutation, useQueryClient } from "#/lib/query.ts";

export function NotesCreateForm() {
  const queryClient = useQueryClient();
  const form = useForm({ title: "" });
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      form.reset();
      await queryClient.invalidateQueries({ queryKey: notesQueryKey });
    },
  });
  return (
    <View className="gap-2 p-4">
      <TextField label={t("notes.fieldTitle")} returnKeyType="done" {...form.field("title")} />
      {mutation.isError ? <Text className="text-danger text-sm">{t("notes.failed")}</Text> : null}
      <Button
        label={t("notes.create")}
        disabled={mutation.isPending}
        onPress={() => mutation.mutate(form.values().title)}
      />
    </View>
  );
}
