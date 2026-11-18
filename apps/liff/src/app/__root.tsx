import { Outlet, createRootRoute } from "@tanstack/react-router";

import { RouteError } from "#/components/boundary/route-error.tsx";

export const Route = createRootRoute({
  component: () => (
    <main className="mx-auto flex max-w-md flex-col gap-6 p-4">
      <Outlet />
    </main>
  ),
  errorComponent: RouteError,
});
