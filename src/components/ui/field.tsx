import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string | null;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

export function FieldShell({ id, label, hint, error, optional, children, className }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body font-semibold text-ink">
        {label}
        {optional ? <span className="ml-1 font-normal text-ink-soft">(opcional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-meta text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-meta font-medium text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string | null;
  optional?: boolean;
  shellClassName?: string;
};

export function TextField({ id, label, hint, error, optional, shellClassName, className, ...rest }: TextFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={shellClassName}>
      <input id={id} className={cn("field-input", className)} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
    </FieldShell>
  );
}

type TextAreaProps = Omit<ComponentProps<"textarea">, "id"> & {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string | null;
  optional?: boolean;
  shellClassName?: string;
};

export function TextArea({ id, label, hint, error, optional, shellClassName, className, ...rest }: TextAreaProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={shellClassName}>
      <textarea id={id} className={cn("field-input", className)} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<ComponentProps<"select">, "id"> & {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string | null;
  optional?: boolean;
  shellClassName?: string;
};

export function SelectField({ id, label, hint, error, optional, shellClassName, className, children, ...rest }: SelectFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={shellClassName}>
      <select id={id} className={cn("field-input", className)} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest}>
        {children}
      </select>
    </FieldShell>
  );
}
