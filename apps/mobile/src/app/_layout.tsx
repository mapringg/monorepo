import "#/global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useNotificationRedirect } from "#/lib/notifications.ts";
import { QueryClientProvider, queryClient } from "#/lib/query.ts";
import { useSignedIn } from "#/lib/session.ts";

export { RouteError as ErrorBoundary } from "#/components/boundary/route-error.tsx";

export default function RootLayout() {
  const signedIn = useSignedIn();
  useNotificationRedirect();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={signedIn}>
            <Stack.Screen name="(app)" />
          </Stack.Protected>
          <Stack.Protected guard={!signedIn}>
            <Stack.Screen name="sign-in" />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
