export const EVENT_THEMES = [
  { key: "economia", label: "Economia e tributos" },
  { key: "educacao", label: "Educação" },
  { key: "meio-ambiente", label: "Meio ambiente" },
  { key: "direitos-digitais", label: "Direitos digitais" },
  { key: "instituicoes", label: "Instituições e eleições" },
  { key: "seguranca", label: "Segurança pública" },
  { key: "saude", label: "Saúde" },
] as const;

export type EventThemeKey = (typeof EVENT_THEMES)[number]["key"];

export const THEME_LABEL: Record<string, string> = Object.fromEntries(EVENT_THEMES.map((t) => [t.key, t.label]));

export function isEventTheme(value: unknown): value is EventThemeKey {
  return typeof value === "string" && EVENT_THEMES.some((t) => t.key === value);
}
