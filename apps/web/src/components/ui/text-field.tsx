import { Field } from "@base-ui/react/field";

type TextFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  errors?: readonly string[] | undefined;
  type?: "text" | "search" | "date";
  multiline?: boolean;
};

const noErrors: readonly string[] = [];

const control = "w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground";

export function TextField({
  name,
  label,
  defaultValue = "",
  errors = noErrors,
  type = "text",
  multiline = false,
}: TextFieldProps) {
  return (
    <Field.Root name={name} invalid={errors.length > 0} className="flex flex-col gap-1">
      <Field.Label className="text-foreground text-sm font-medium">{label}</Field.Label>
      {multiline ? (
        <Field.Control defaultValue={defaultValue} render={<textarea rows={4} className={control} />} />
      ) : (
        <Field.Control type={type} defaultValue={defaultValue} className={control} />
      )}
      {errors.map((error) => (
        <p key={error} className="text-danger text-sm">
          {error}
        </p>
      ))}
    </Field.Root>
  );
}
