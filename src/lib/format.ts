export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });
const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" });
const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

export function formatDate(value: Date | string): string {
  return dateFormatter.format(typeof value === "string" ? new Date(value) : value);
}

export function formatShortDate(value: Date | string): string {
  return shortDateFormatter.format(typeof value === "string" ? new Date(value) : value).replace(".", "");
}

export function formatDateTime(value: Date | string): string {
  return dateTimeFormatter.format(typeof value === "string" ? new Date(value) : value).replace(".", "");
}

/** Formats partial ISO dates ("1988", "1988-10", "1988-10-05") without inventing precision. */
export function formatPartialDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const parts = value.split("-");
  if (parts.length === 1) return parts[0];
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const month = months[Number(parts[1]) - 1];
  if (parts.length === 2) return `${month} de ${parts[0]}`;
  return `${Number(parts[2])} de ${month} de ${parts[0]}`;
}

export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] ?? "" : words[0][1] ?? "";
  return (first + last).toUpperCase();
}

export function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

/** pt-BR decimal with a typographic minus sign: −0,25. */
export function formatDecimal(value: number, digits?: number): string {
  const text = digits === undefined ? String(value) : value.toFixed(digits);
  return text.replace(".", ",").replace("-", "−");
}
