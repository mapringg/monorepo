"use client";

import type { Session } from "api/client";
import { useActionState } from "react";

import { Button } from "#/components/ui/button.tsx";
import { TextField } from "#/components/ui/text-field.tsx";
import { signInAction } from "#/features/sessions/sessions-actions.ts";
import type { ActionState } from "#/lib/action.ts";
import { t } from "#/lib/i18n.ts";

export function SessionsSignInForm() {
  const [state, formAction, pending] = useActionState<ActionState<Session>, FormData>(signInAction, null);
  return (
    <form action={formAction} className="rounded-card border-border flex w-80 flex-col gap-4 border p-6">
      <h1 className="text-xl font-semibold">{t("sessions.title")}</h1>
      <TextField
        name="name"
        label={t("sessions.name")}
        errors={state?.ok === false ? state.fieldErrors?.name : undefined}
      />
      {state?.ok === false ? <p className="text-danger text-sm">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>
        {t("sessions.submit")}
      </Button>
    </form>
  );
}
