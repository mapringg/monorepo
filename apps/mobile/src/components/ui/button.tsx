import type { PressableProps } from "react-native";
import { Pressable, Text } from "react-native";

const variants = {
  primary: { box: "bg-primary", text: "text-primary-foreground" },
  secondary: { box: "border border-border bg-background", text: "text-foreground" },
} as const;

type ButtonProps = Omit<PressableProps, "children"> & { label: string; variant?: keyof typeof variants };

export function Button({ label, variant = "primary", disabled, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`rounded-control h-11 items-center justify-center px-4 ${variants[variant].box} ${disabled === true ? "opacity-50" : ""}`}
      {...props}
    >
      <Text className={`font-medium ${variants[variant].text}`}>{label}</Text>
    </Pressable>
  );
}
