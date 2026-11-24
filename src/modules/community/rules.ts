import { z } from "zod";

export const FORUM_CATEGORIES = [
  { key: "CORRENTES", label: "Correntes políticas" },
  { key: "IDEIAS", label: "Ideias e temas" },
  { key: "ACONTECIMENTOS", label: "Acontecimentos" },
  { key: "INSTITUICOES", label: "Instituições" },
  { key: "APRENDIZADO", label: "Dúvidas de aprendizado" },
] as const;

export type ForumCategoryKey = (typeof FORUM_CATEGORIES)[number]["key"];

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(FORUM_CATEGORIES.map((c) => [c.key, c.label]));

export const REPORT_REASONS = [
  { key: "THREAT", label: "Ameaça ou incitação à violência" },
  { key: "HARASSMENT", label: "Assédio ou ataque pessoal" },
  { key: "PERSONAL_DATA", label: "Exposição de dados pessoais" },
  { key: "HATE_SPEECH", label: "Discurso de ódio" },
  { key: "SPAM", label: "Spam ou propaganda" },
  { key: "OTHER", label: "Outro motivo" },
] as const;

export const REPORT_REASON_LABEL: Record<string, string> = Object.fromEntries(REPORT_REASONS.map((r) => [r.key, r.label]));

export const DEFAULT_FORUM_RULES = [
  "Discorde de ideias, não de pessoas: critique argumentos sem ataques pessoais.",
  "Não publique ameaças, assédio, discurso de ódio ou dados pessoais de ninguém.",
  "Não faça propaganda, spam ou pedidos de voto.",
  "Indique de onde vêm dados e citações. Publicações de participantes não são verificadas pela Polis.",
  "Nenhuma posição é removida por sua orientação política; a moderação analisa condutas, com motivo registrado.",
].join("\n");

/** Plain text only: control characters removed, line breaks normalized. Rendering escapes everything. */
export function normalizeUserText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const plain = (min: number, max: number, label: string) =>
  z
    .string()
    .transform(normalizeUserText)
    .pipe(z.string().min(min, `${label}: use pelo menos ${min} caracteres.`).max(max, `${label}: use no máximo ${max} caracteres.`));

export const forumInputSchema = z.object({
  title: plain(6, 90, "Título"),
  description: plain(20, 600, "Descrição"),
  category: z.enum(FORUM_CATEGORIES.map((c) => c.key) as [ForumCategoryKey, ...ForumCategoryKey[]], { message: "Escolha uma categoria." }),
  rules: plain(20, 1500, "Regras"),
  eventId: z.string().max(40).nullable(),
});

export const topicInputSchema = z.object({
  title: plain(6, 140, "Título"),
  body: plain(10, 5000, "Texto"),
  lessonId: z.string().max(40).nullable(),
  eventId: z.string().max(40).nullable(),
});

export const commentInputSchema = z.object({ body: plain(2, 3000, "Comentário") });

export const reportInputSchema = z.object({
  targetType: z.enum(["FORUM", "TOPIC", "COMMENT"]),
  targetId: z.string().min(1).max(40),
  reason: z.enum(REPORT_REASONS.map((r) => r.key) as [string, ...string[]]),
  details: z.string().transform(normalizeUserText).pipe(z.string().max(1000)).nullable(),
});
