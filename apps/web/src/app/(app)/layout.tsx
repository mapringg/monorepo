import type { ReactNode } from "react";

import { AppHeader } from "#/components/layout/app-header.tsx";
import { SessionsSignOut } from "#/features/sessions/sessions-sign-out.tsx";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader actions={<SessionsSignOut />} />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-8">{children}</main>
    </>
  );
}
