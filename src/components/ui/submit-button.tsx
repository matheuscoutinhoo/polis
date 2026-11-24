"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import type { ComponentProps } from "react";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type" | "busy"> & { pendingLabel?: string };

/** Submit button that keeps its label, shows a busy state and ignores repeated submissions. */
export function SubmitButton({ pendingLabel = "Salvando...", children, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" busy={pending} busyLabel={pendingLabel} {...rest}>
      {children}
    </Button>
  );
}
