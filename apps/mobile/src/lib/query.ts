import { addEventListener } from "@react-native-community/netinfo";
import { QueryClient, focusManager, onlineManager } from "@tanstack/react-query";
import { AppState } from "react-native";

import { DetailedError } from "#/lib/api/client.ts";

export {
  QueryClientProvider,
  infiniteQueryOptions,
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

const permanentStatuses = new Set([400, 401, 403, 404, 409, 413, 415, 422]);

function retryOnce(failureCount: number, error: Error) {
  const permanent = error instanceof DetailedError && permanentStatuses.has(Number(error.statusCode));
  return failureCount < 1 && !permanent;
}

onlineManager.setEventListener((setOnline) => addEventListener((state) => setOnline(state.isConnected !== false)));

focusManager.setEventListener((setFocused) => {
  const subscription = AppState.addEventListener("change", (status) => setFocused(status === "active"));
  return () => subscription.remove();
});

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: retryOnce } },
});
