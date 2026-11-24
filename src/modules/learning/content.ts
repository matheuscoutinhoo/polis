import { z } from "zod";

// Lesson content is structured data (no HTML), rendered by Polis components.
// Every block that states a verifiable fact references approved source keys.

const sourceKeys = z.array(z.string().min(1)).default([]);

export const lessonBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string().min(2) }),
  z.object({ type: z.literal("paragraph"), text: z.string().min(10), sources: sourceKeys }),
  z.object({ type: z.literal("definition"), term: z.string().min(2), text: z.string().min(10), sources: sourceKeys }),
  z.object({ type: z.literal("example"), title: z.string().min(3), text: z.string().min(10), sources: sourceKeys }),
  z.object({
    type: z.literal("comparison"),
    title: z.string().min(3),
    intro: z.string().optional(),
    orderNote: z.string().min(5),
    items: z
      .array(z.object({ label: z.string().min(1), heading: z.string().min(2), text: z.string().min(10), sources: sourceKeys }))
      .min(2)
      .max(4),
  }),
  z.object({ type: z.literal("limit"), title: z.string().min(3), text: z.string().min(10) }),
  z.object({ type: z.literal("quote"), text: z.string().min(5), sourceKey: z.string().min(1), locator: z.string().min(1) }),
]);

export const lessonContentSchema = z.object({
  intro: z.string().min(20),
  blocks: z.array(lessonBlockSchema).min(3),
  relatedConcepts: z.array(z.object({ term: z.string().min(2), explanation: z.string().min(10) })).min(1),
});

export const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        id: z.string().min(1),
        prompt: z.string().min(10),
        options: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2).max(5),
        correctOptionId: z.string().min(1),
        explanation: z.string().min(10),
      }),
    )
    .min(2)
    .max(5),
});

export type LessonBlock = z.infer<typeof lessonBlockSchema>;
export type LessonContent = z.infer<typeof lessonContentSchema>;
export type Quiz = z.infer<typeof quizSchema>;
export type QuizQuestion = Quiz["questions"][number];

/** Public quiz view: never ships the correct answers to the browser. */
export function publicQuiz(quiz: Quiz) {
  return quiz.questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options }));
}

export function sourceKeysUsed(content: LessonContent): string[] {
  const keys = new Set<string>();
  for (const block of content.blocks) {
    if ("sources" in block && Array.isArray(block.sources)) block.sources.forEach((k) => keys.add(k));
    if (block.type === "comparison") block.items.forEach((item) => item.sources.forEach((k) => keys.add(k)));
    if (block.type === "quote") keys.add(block.sourceKey);
  }
  return [...keys];
}

/**
 * Editorial checks before a lesson can be published: valid structure, at least
 * one concrete example, a comprehension check whose answers exist, and every
 * referenced source attached to the lesson and approved.
 */
export function validateLessonForPublication(input: {
  content: unknown;
  quiz: unknown;
  attachedSourceKeys: string[];
  approvedSourceKeys: Set<string>;
}): string[] {
  const problems: string[] = [];
  const content = lessonContentSchema.safeParse(input.content);
  const quiz = quizSchema.safeParse(input.quiz);
  if (!content.success) problems.push(`Conteúdo inválido: ${content.error.issues[0]?.path.join(".")} ${content.error.issues[0]?.message}`);
  if (!quiz.success) problems.push(`Verificação inválida: ${quiz.error.issues[0]?.path.join(".")} ${quiz.error.issues[0]?.message}`);
  if (input.attachedSourceKeys.length === 0) problems.push("A lição não tem fontes associadas.");
  for (const key of input.attachedSourceKeys) {
    if (!input.approvedSourceKeys.has(key)) problems.push(`Fonte não aprovada: ${key}`);
  }
  if (content.success) {
    if (!content.data.blocks.some((b) => b.type === "example")) problems.push("A lição precisa de um exemplo concreto.");
    for (const key of sourceKeysUsed(content.data)) {
      if (!input.attachedSourceKeys.includes(key)) problems.push(`Fonte citada no texto, mas não associada à lição: ${key}`);
    }
  }
  if (quiz.success) {
    for (const question of quiz.data.questions) {
      if (!question.options.some((o) => o.id === question.correctOptionId)) problems.push(`Resposta inexistente na questão ${question.id}`);
    }
  }
  return problems;
}

/**
 * Quotes must reproduce, literally, a cataloged excerpt of the same source
 * (whitespace differences ignored) with the same locator.
 */
export function unverifiedQuotes(content: unknown, excerptsBySource: Map<string, Array<{ locator: string; text: string }>>): string[] {
  const parsed = lessonContentSchema.safeParse(content);
  if (!parsed.success) return [];
  const squash = (value: string) => value.replace(/\s+/g, " ").trim();
  // "art. 30, V" refines "art. 30, I e V"; "p. 26" refines "p. 26–27".
  const anchor = (value: string) => {
    const v = squash(value).toLowerCase();
    return /^(art\.?\s*\d+|p\.?\s*\d+|§\s*\d+)/.exec(v)?.[0].replace(/\s+/g, "") ?? v;
  };
  const problems: string[] = [];
  for (const block of parsed.data.blocks) {
    if (block.type !== "quote") continue;
    const matches = (excerptsBySource.get(block.sourceKey) ?? []).filter((e) => squash(e.text).includes(squash(block.text)));
    if (matches.length === 0) problems.push(`Citação não encontrada literalmente nos trechos de ${block.sourceKey}: “${block.text.slice(0, 70)}…”`);
    else if (!matches.some((e) => squash(e.locator) === squash(block.locator) || anchor(e.locator) === anchor(block.locator))) {
      problems.push(`Citação de ${block.sourceKey} com localização diferente do trecho cadastrado (${block.locator} ≠ ${matches.map((m) => m.locator).join(" / ")}).`);
    }
  }
  return problems;
}
