"use client";

import type { ReactNode } from "react";

import { QueryClientProvider, getQueryClient } from "#/lib/query.ts";

export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
}
