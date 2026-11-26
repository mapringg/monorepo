"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { ReactNode } from "react";

import { Button } from "#/components/ui/button.tsx";

type ConfirmDialogProps = {
  trigger: string;
  title: string;
  description: string;
  cancel: string;
  children: ReactNode;
};

export function ConfirmDialog({ trigger, title, description, cancel, children }: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="danger" />}>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="bg-foreground/30 fixed inset-0" />
        <AlertDialog.Popup className="rounded-card bg-background fixed top-1/2 left-1/2 flex w-96 -translate-1/2 flex-col gap-4 p-6">
          <AlertDialog.Title className="text-lg font-semibold">{title}</AlertDialog.Title>
          <AlertDialog.Description className="text-muted-foreground text-sm">{description}</AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Close render={<Button variant="secondary" />}>{cancel}</AlertDialog.Close>
            {children}
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
