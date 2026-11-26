import { colors } from "@repo/tokens/tokens";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

export function Section({ children }: { children: ReactNode }) {
  return <Suspense fallback={<ActivityIndicator className="m-6" color={colors.primary} />}>{children}</Suspense>;
}
