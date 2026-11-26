import { Text, View } from "react-native";

import { Button } from "#/components/ui/button.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import { signIn } from "#/features/sessions/sessions-queries.ts";
import { useForm } from "#/lib/form.ts";
import { t } from "#/lib/i18n.ts";
import { useMutation } from "#/lib/query.ts";

export function SessionsSignInForm() {
  const form = useForm({ name: "" });
  const mutation = useMutation({ mutationFn: signIn });
  return (
    <View className="flex-1 justify-center gap-4 p-6">
      <Text className="text-foreground text-2xl font-semibold">{t("sessions.title")}</Text>
      <TextField label={t("sessions.name")} autoCapitalize="words" {...form.field("name")} />
      {mutation.isError ? <Text className="text-danger text-sm">{t("sessions.failed")}</Text> : null}
      <Button
        label={t("sessions.submit")}
        disabled={mutation.isPending}
        onPress={() => mutation.mutate(form.values().name)}
      />
    </View>
  );
}
