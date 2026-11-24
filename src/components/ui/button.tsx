import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./icon";

type Variant = "primary" | "secondary" | "text" | "danger";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  text: "btn-text",
  danger: "btn-danger",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: "md" | "sm";
  block?: boolean;
  busy?: boolean;
  busyLabel?: string;
  icon?: IconName;
  iconPosition?: "start" | "end";
};

export function Button({
  variant = "primary",
  size = "md",
  block,
  busy,
  busyLabel,
  icon,
  iconPosition = "end",
  className,
  children,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("btn", variantClass[variant], size === "sm" && "btn-sm", block && "btn-block", className)}
      aria-busy={busy || undefined}
      disabled={disabled}
      onClick={busy ? (event) => event.preventDefault() : onClick}
      {...rest}
    >
      {icon && iconPosition === "start" ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
      <span>{busy && busyLabel ? busyLabel : children}</span>
      {icon && iconPosition === "end" ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
    </button>
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: "md" | "sm";
  block?: boolean;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
};

export function LinkButton({ variant = "primary", size = "md", block, icon, iconPosition = "end", className, children, ...rest }: LinkButtonProps) {
  return (
    <Link className={cn("btn", variantClass[variant], size === "sm" && "btn-sm", block && "btn-block", className)} {...rest}>
      {icon && iconPosition === "start" ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
    </Link>
  );
}
