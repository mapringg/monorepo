import { defaultLocale } from "@repo/i18n";

import "#/app/globals.css";
import type { ReactNode } from "react";

import { QueryProvider } from "#/components/providers/query-provider.tsx";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
