import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "border border-border bg-background text-foreground hover:bg-muted",
  danger: "bg-danger text-danger-foreground hover:opacity-90",
} as const;

type ButtonProps = Omit<ComponentProps<typeof BaseButton>, "className"> & {
  className?: string;
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <BaseButton
      className={`rounded-control inline-flex h-9 items-center justify-center px-4 text-sm font-medium disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
