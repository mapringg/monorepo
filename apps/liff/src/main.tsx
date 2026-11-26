import { liff } from "@line/liff";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "#/globals.css";
import { startSession } from "#/lib/api/client.ts";
import { env } from "#/lib/env.ts";
import { QueryClientProvider, queryClient } from "#/lib/query.ts";
import { routeTree } from "#/route-tree.gen.ts";

await liff.init({ liffId: env.VITE_LIFF_ID });

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const idToken = liff.isLoggedIn() ? liff.getIDToken() : null;

const root = document.querySelector("#root");

if (idToken === null) liff.login();
else if (root !== null) {
  await startSession(idToken);
  createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
