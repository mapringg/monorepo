"use client";

import { Button } from "#/components/ui/button.tsx";
import { signOutAction } from "#/features/sessions/sessions-actions.ts";
import { t } from "#/lib/i18n.ts";
import { useQueryClient } from "#/lib/query.ts";

export function SessionsSignOut() {
  const queryClient = useQueryClient();
  return (
    <form
      action={async () => {
        queryClient.clear();
        await signOutAction();
      }}
    >
      <Button type="submit" variant="secondary">
        {t("common.signOut")}
      </Button>
    </form>
  );
}
