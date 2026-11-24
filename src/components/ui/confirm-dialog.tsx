"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button } from "./button";
import { SubmitButton } from "./submit-button";
import type { IconName } from "./icon";

type ConfirmDialogProps = {
  triggerLabel: string;
  triggerVariant?: "primary" | "secondary" | "text" | "danger";
  triggerIcon?: IconName;
  triggerSize?: "md" | "sm";
  title: string;
  description: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  action: (formData: FormData) => void | Promise<void>;
  children?: ReactNode;
};

/**
 * Confirmation dialog: opens with focus on "Cancelar", closes with Escape and
 * returns focus to the trigger. The confirm button submits a server action.
 */
export function ConfirmDialog({
  triggerLabel,
  triggerVariant = "danger",
  triggerIcon,
  triggerSize = "md",
  title,
  description,
  confirmLabel,
  pendingLabel = "Processando...",
  cancelLabel = "Cancelar",
  tone = "danger",
  action,
  children,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      cancelRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <Button ref={triggerRef} variant={triggerVariant} icon={triggerIcon} iconPosition="start" size={triggerSize} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => {
          if (open) close();
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        className="m-auto w-[min(560px,calc(100vw-2rem))] rounded-panel border border-line bg-surface p-0 text-ink backdrop:bg-ink/40"
      >
        <form
          action={async (formData) => {
            await action(formData);
            close();
          }}
          className="flex flex-col gap-5 p-6 md:p-8"
        >
          <div>
            <h2 id={titleId} className="text-h3 font-semibold md:text-h2">
              {title}
            </h2>
            <div id={descriptionId} className="mt-2 text-body text-ink-soft">
              {description}
            </div>
          </div>
          {children}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button ref={cancelRef} variant="secondary" onClick={close}>
              {cancelLabel}
            </Button>
            <SubmitButton variant={tone === "danger" ? "danger" : "primary"} pendingLabel={pendingLabel}>
              {confirmLabel}
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </>
  );
}
