"use client";

import { Button } from "#/components/ui/button.tsx";
import { t } from "#/lib/i18n.ts";

export function ErrorPanel({ retry }: { retry: () => void }) {
  return (
    <div role="alert" className="rounded-card border-border flex flex-col items-start gap-3 border p-4">
      <p className="text-foreground text-sm">{t("common.errorTitle")}</p>
      <Button variant="secondary" onClick={() => retry()}>
        {t("common.retry")}
      </Button>
    </div>
  );
}
