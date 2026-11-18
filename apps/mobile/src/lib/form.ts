import type { ComponentRef } from "react";
import { useRef } from "react";
import type { TextInput } from "react-native";

type Input = ComponentRef<typeof TextInput>;

export function useForm<const Name extends string>(defaults: Readonly<Record<Name, string>>) {
  const values = useRef<Record<Name, string>>({ ...defaults });
  const inputs = useRef(new Map<Name, Input>());
  return {
    field: (name: Name) => ({
      defaultValue: defaults[name],
      onChangeText: (text: string) => {
        values.current[name] = text;
      },
      ref: (input: Input | null) => {
        if (input === null) inputs.current.delete(name);
        else inputs.current.set(name, input);
      },
    }),
    values: () => ({ ...values.current }),
    reset: () => {
      for (const [name, input] of inputs.current) {
        input.clear();
        values.current[name] = defaults[name];
      }
    },
  };
}
