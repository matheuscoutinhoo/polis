import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./icon";

type Tone = "info" | "success" | "warning" | "error" | "neutral";

const toneClass: Record<Tone, string> = {
  info: "bg-mint text-action-press",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  error: "bg-danger-bg text-danger",
  neutral: "bg-blue text-ink",
};

const toneIcon: Record<Tone, IconName> = {
  info: "info",
  success: "check",
  warning: "alert",
  error: "alert",
  neutral: "info",
};

type NoticeProps = {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  icon?: IconName | null;
  className?: string;
  role?: "status" | "alert";
};

export function Notice({ tone = "info", title, children, icon, className, role }: NoticeProps) {
  const iconName = icon === null ? null : (icon ?? toneIcon[tone]);
  return (
    <div className={cn("flex gap-3 rounded-card px-4 py-3.5 text-body", toneClass[tone], className)} role={role}>
      {iconName ? <Icon name={iconName} size={20} className="mt-0.5 flex-none" /> : null}
      <div className="min-w-0">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={cn(title && "mt-0.5")}>{children}</div>
      </div>
    </div>
  );
}
