import { z } from "zod";

export const displayNameSchema = z
  .string()
  .trim()
  .min(2, "Use pelo menos 2 caracteres.")
  .max(40, "Use no máximo 40 caracteres.")
  .regex(/^[\p{L}\p{M}\p{N} .'’_-]+$/u, "Use letras, números, espaços e pontuação simples (sem e-mails ou links).");

export const passwordSchema = z
  .string()
  .min(10, "A senha precisa ter pelo menos 10 caracteres.")
  .max(128, "A senha pode ter no máximo 128 caracteres.");

export const emailSchema = z.email("Informe um e-mail no formato nome@dominio.com.").max(254);

/** Accepts only same-site relative paths to avoid open redirects. */
export function safeNextPath(value: unknown, fallback = "/"): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (value.length > 300) return fallback;
  return value;
}
