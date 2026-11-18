import { QueryClient } from "@tanstack/react-query";

import { DetailedError } from "#/lib/api/client.ts";

export {
  QueryClientProvider,
  infiniteQueryOptions,
  useMutation,
  useQueryClient,
  useQueryErrorResetBoundary,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

const permanentStatuses = new Set([400, 401, 403, 404, 409, 413, 415, 422]);

function retryOnce(failureCount: number, error: Error) {
  const permanent = error instanceof DetailedError && permanentStatuses.has(Number(error.statusCode));
  return failureCount < 1 && !permanent;
}

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: retryOnce } },
});
