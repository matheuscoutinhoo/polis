import { cn } from "@/lib/format";

type ProgressBarProps = {
  value: number;
  max: number;
  label: string;
  className?: string;
  showValue?: boolean;
};

export function ProgressBar({ value, max, label, className, showValue }: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const percent = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));
  return (
    <div className={cn("w-full", className)}>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={value}
        aria-valuetext={`${value} de ${safeMax}`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      {showValue ? (
        <p className="mt-1.5 text-meta text-ink-soft">
          {value} de {safeMax}
        </p>
      ) : null}
    </div>
  );
}
