"use client";

import type { ErrorInfo } from "next/error";
import { catchError } from "next/error";
import type { ReactNode } from "react";
import { Suspense } from "react";

import { ErrorPanel } from "#/components/boundary/error-panel.tsx";
import { QueryErrorResetBoundary } from "#/lib/query.ts";

const SectionBoundary = catchError(({ reset }: { reset: () => void }, { retry }: ErrorInfo) => (
  <ErrorPanel
    retry={() => {
      reset();
      retry();
    }}
  />
));

export function Section({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <SectionBoundary reset={reset}>
          <Suspense fallback={fallback}>{children}</Suspense>
        </SectionBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
