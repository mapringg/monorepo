import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledSafeAreaView = withUniwind(SafeAreaView);

export function Screen({ children }: { children: ReactNode }) {
  return <StyledSafeAreaView className="bg-background flex-1">{children}</StyledSafeAreaView>;
}
