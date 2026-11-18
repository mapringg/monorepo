import * as Label from "@rn-primitives/label";
import type { ComponentRef } from "react";
import { useId } from "react";
import type { TextInputProps } from "react-native";
import { TextInput as NativeTextInput, View } from "react-native";

type TextFieldProps = Omit<TextInputProps, "ref"> & {
  label: string;
  ref?: (input: ComponentRef<typeof NativeTextInput> | null) => void;
};

export function TextField({ label, ref, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <View className="gap-1">
      <Label.Root nativeID={id}>
        <Label.Text className="text-foreground text-sm font-medium">{label}</Label.Text>
      </Label.Root>
      <NativeTextInput
        ref={ref}
        aria-labelledby={id}
        accessibilityLabel={label}
        className="rounded-control border-border bg-background text-foreground h-11 border px-3"
        {...props}
      />
    </View>
  );
}
