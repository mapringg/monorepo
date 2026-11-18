import { Field } from "@base-ui/react/field";

type SelectFieldProps = {
  name: string;
  label: string;
  defaultValue: string;
  options: readonly { value: string; label: string }[];
};

export function SelectField({ name, label, defaultValue, options }: SelectFieldProps) {
  return (
    <Field.Root name={name} className="flex flex-col gap-1">
      <Field.Label className="text-foreground text-sm font-medium">{label}</Field.Label>
      <Field.Control
        defaultValue={defaultValue}
        render={
          <select className="rounded-control border-border bg-background h-9 border px-3 text-sm">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        }
      />
    </Field.Root>
  );
}
