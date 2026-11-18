import type { ErrorBoundaryProps } from "expo-router";
import { Text, View } from "react-native";

import { Button } from "#/components/ui/button.tsx";
import { t } from "#/lib/i18n.ts";

export function RouteError({ retry }: ErrorBoundaryProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <Text className="text-foreground">{t("common.errorTitle")}</Text>
      <Button label={t("common.retry")} variant="secondary" onPress={() => void retry()} />
    </View>
  );
}
