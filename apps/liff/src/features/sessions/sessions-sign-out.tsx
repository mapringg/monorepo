import { Button } from "#/components/ui/button.tsx";
import { signOut } from "#/features/sessions/sessions-queries.ts";
import { t } from "#/lib/i18n.ts";
import { useMutation } from "#/lib/query.ts";

export function SessionsSignOut() {
  const mutation = useMutation({ mutationFn: signOut });
  return (
    <Button variant="secondary" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
      {t("common.signOut")}
    </Button>
  );
}
