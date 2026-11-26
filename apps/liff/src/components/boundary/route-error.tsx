import type { ErrorComponentProps } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";

import { ErrorPanel } from "#/components/boundary/error-panel.tsx";
import { useQueryErrorResetBoundary } from "#/lib/query.ts";

export function RouteError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  const queryReset = useQueryErrorResetBoundary();
  return (
    <ErrorPanel
      retry={() => {
        queryReset.reset();
        reset();
        void router.invalidate();
      }}
    />
  );
}
