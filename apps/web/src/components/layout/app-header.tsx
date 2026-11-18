import Link from "next/link";
import type { ReactNode } from "react";

import { t } from "#/lib/i18n.ts";

export function AppHeader({ actions }: { actions: ReactNode }) {
  return (
    <header className="border-border flex items-center justify-between border-b px-6 py-3">
      <Link href="/notes" className="text-foreground font-semibold">
        {t("common.appName")}
      </Link>
      {actions}
    </header>
  );
}
