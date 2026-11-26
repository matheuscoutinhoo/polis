import { cn } from "@/lib/format";

type ChoiceRowProps = {
  name: string;
  value: string;
  label: string;
  /** Controlled selection; use `defaultChecked` instead when a form reset must restore the saved choice. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange: (value: string) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Choice row: native radio semantics (arrow keys, labels), the whole row is
 * clickable and the visible check is an SVG path drawn in 180 ms. The same
 * selected style applies to every answer.
 */
export function ChoiceRow({ name, value, label, checked, defaultChecked, onChange, description, disabled, className }: ChoiceRowProps) {
  return (
    <label className={cn("choice-row", className)}>
      <input type="radio" name={name} value={value} checked={checked} defaultChecked={defaultChecked} disabled={disabled} onChange={() => onChange(value)} />
      <span className="flex min-w-0 flex-col">
        <span className="text-body text-ink">{label}</span>
        {description ? <span className="text-meta text-ink-soft">{description}</span> : null}
      </span>
      <svg className="choice-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </label>
  );
}
