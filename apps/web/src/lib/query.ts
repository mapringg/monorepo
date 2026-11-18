import { QueryClient, defaultShouldDehydrateQuery, environmentManager } from "@tanstack/react-query";

import { DetailedError } from "#/lib/api/client.browser.ts";

export {
  HydrationBoundary,
  QueryClientProvider,
  QueryErrorResetBoundary,
  dehydrate,
  infiniteQueryOptions,
  noop,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

const permanentStatuses = new Set([400, 401, 403, 404, 409, 413, 415, 422]);

function retryOnce(failureCount: number, error: Error) {
  const permanent = error instanceof DetailedError && permanentStatuses.has(Number(error.statusCode));
  return failureCount < 1 && !permanent;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: retryOnce },
      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
        shouldRedactErrors: () => false,
      },
    },
  });
}

const browserQueryClient = environmentManager.isServer() ? undefined : makeQueryClient();

export function getQueryClient() {
  return browserQueryClient ?? makeQueryClient();
}
