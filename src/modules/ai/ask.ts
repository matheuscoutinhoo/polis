import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { consumeRateLimit } from "@/lib/rate-limit";
import { lessonContentSchema } from "@/modules/learning/content";
import { eventContentSchema } from "@/modules/events/content";
import { buildEvidencePack, sanitizeUntrusted, type EvidenceSourceInput } from "./evidence";
import { QUESTION_INSTRUCTIONS } from "./prompts";
import { AiFailureError, AiUnavailableError, getAiProvider } from "./provider";
import { checkAnswer } from "./reference-check";
import { questionAnswerSchema } from "./schemas";

export const MAX_QUESTION_LENGTH = 500;

export type AskResult =
  | {
      ok: true;
      status: "ANSWERED" | "INSUFFICIENT_CONTEXT" | "OUT_OF_SCOPE" | "DECLINED_RECOMMENDATION";
      answer: string;
      citations: Array<{ sourceKey: string; title: string; publisherName: string; locator: string; supports: string }>;
      missingInformation: string;
    }
  | { ok: false; error: string };

function limits() {
  return {
    perUserDaily: Number(process.env.AI_DAILY_QUESTIONS_PER_USER ?? 15),
    perUserBurst: 4,
    globalDaily: Number(process.env.AI_DAILY_GLOBAL_LIMIT ?? 500),
  };
}

async function checkBudget(userId: string): Promise<string | null> {
  const day = new Date().toISOString().slice(0, 10);
  const { perUserDaily, perUserBurst, globalDaily } = limits();
  const burst = await consumeRateLimit(`ai-burst:${userId}`, perUserBurst, 60);
  if (!burst.allowed) return "Aguarde um minuto antes de enviar outra dúvida.";
  const daily = await consumeRateLimit(`ai-user:${userId}:${day}`, perUserDaily, 86400);
  if (!daily.allowed) return `Você atingiu o limite de ${perUserDaily} dúvidas por dia. O conteúdo continua disponível normalmente.`;
  const global = await consumeRateLimit(`ai-global:${day}`, globalDaily, 86400);
  if (!global.allowed) return "O limite diário de respostas com apoio de IA foi atingido. Tente novamente amanhã.";
  return null;
}

function cleanQuestion(question: string): string | null {
  const value = sanitizeUntrusted(question, MAX_QUESTION_LENGTH);
  return value.length >= 5 ? value : null;
}

type PageContext = { kind: "lesson_question" | "event_question"; title: string; body: string; sources: EvidenceSourceInput[] };

/** Builds the exact model input used in production (also used by the evaluation battery). */
export function buildQuestionInput(page: { title: string; body: string; sources: EvidenceSourceInput[] }, cleanedQuestion: string) {
  const evidence = buildEvidencePack(page.sources, 30);
  const input = [
    `<conteudo>\nTítulo: ${sanitizeUntrusted(page.title, 300)}\n${sanitizeUntrusted(page.body, 9000)}\n</conteudo>`,
    evidence.text,
    `<pergunta_do_usuario>\n${cleanedQuestion}\n</pergunta_do_usuario>`,
  ].join("\n\n");
  return { input, evidence };
}

export { cleanQuestion };

async function runQuestion(userId: string, question: string, page: PageContext): Promise<AskResult> {
  const cleaned = cleanQuestion(question);
  if (!cleaned) return { ok: false, error: "Escreva uma dúvida com pelo menos 5 caracteres." };
  const budgetError = await checkBudget(userId);
  if (budgetError) return { ok: false, error: budgetError };

  const { input, evidence } = buildQuestionInput(page, cleaned);

  const started = Date.now();
  let model = "indisponível";
  try {
    const provider = await getAiProvider();
    model = provider.model;
    const response = await provider.generate({
      purpose: page.kind,
      instructions: QUESTION_INSTRUCTIONS,
      input,
      schema: questionAnswerSchema,
      schemaName: "resposta_contextual",
      maxOutputTokens: Number(process.env.AI_MAX_OUTPUT_TOKENS ?? 1200),
    });
    const checked = checkAnswer(response.data, evidence.byRef, page.body);
    await db.aiGeneration.create({
      data: {
        purpose: page.kind,
        model: response.model,
        status: checked.kind === "answer" ? checked.status : "BLOCKED",
        inputTokens: response.usage.inputTokens,
        outputTokens: response.usage.outputTokens,
        durationMs: Date.now() - started,
      },
    });
    if (checked.kind === "blocked") return { ok: false, error: checked.reason };
    return {
      ok: true,
      status: checked.status,
      answer: checked.answer,
      citations: checked.citations.map((c) => ({
        sourceKey: c.item.sourceKey,
        title: c.item.title,
        publisherName: c.item.publisherName,
        locator: c.item.locator,
        supports: c.supports.slice(0, 300),
      })),
      missingInformation: checked.missingInformation,
    };
  } catch (error) {
    const code = error instanceof AiUnavailableError ? "UNAVAILABLE" : error instanceof AiFailureError ? error.code : "UNKNOWN";
    await db.aiGeneration
      .create({ data: { purpose: page.kind, model, status: "ERROR", errorCode: code, durationMs: Date.now() - started } })
      .catch(() => {});
    logger.warn("ai.question_failed", { code });
    if (error instanceof AiUnavailableError) {
      return { ok: false, error: "As dúvidas com apoio de IA não estão disponíveis neste ambiente. O conteúdo e as fontes continuam disponíveis." };
    }
    return { ok: false, error: "Não foi possível gerar uma resposta agora. O conteúdo e as fontes desta página continuam disponíveis; tente novamente mais tarde." };
  }
}

function toEvidenceInput(source: {
  key: string;
  title: string;
  materialType: string;
  publishedOn: string | null;
  scopeNote: string;
  publisher: { name: string };
  excerpts: Array<{ locator: string; text: string }>;
}): EvidenceSourceInput {
  return {
    key: source.key,
    title: source.title,
    publisherName: source.publisher.name,
    materialType: source.materialType,
    publishedOn: source.publishedOn,
    scopeNote: source.scopeNote,
    excerpts: source.excerpts,
  };
}

const sourceInclude = { source: { include: { publisher: true, excerpts: { orderBy: { createdAt: "asc" as const } } } } };

export async function askAboutLesson(userId: string, lessonId: string, question: string): Promise<AskResult> {
  const lesson = await db.lesson.findFirst({
    where: { id: lessonId, status: "PUBLISHED" },
    include: { sources: { where: { source: { reviewStatus: "APPROVED" } }, include: sourceInclude } },
  });
  if (!lesson) return { ok: false, error: "Lição não encontrada." };
  const content = lessonContentSchema.parse(lesson.content);
  const body = [
    `Objetivo: ${lesson.objective}`,
    content.intro,
    ...content.blocks.map((b) => {
      if (b.type === "comparison") return `${b.title}: ${b.items.map((i) => `${i.heading} — ${i.text}`).join(" | ")}`;
      if (b.type === "heading") return b.text;
      if (b.type === "definition") return `${b.term}: ${b.text}`;
      if (b.type === "example") return `${b.title}: ${b.text}`;
      if (b.type === "limit") return `${b.title}: ${b.text}`;
      return b.text;
    }),
  ].join("\n");
  return runQuestion(userId, question, {
    kind: "lesson_question",
    title: lesson.title,
    body,
    sources: lesson.sources.map((ls) => toEvidenceInput(ls.source)),
  });
}

export async function askAboutEvent(userId: string, eventId: string, question: string): Promise<AskResult> {
  const event = await db.event.findFirst({
    where: { id: eventId, status: "PUBLISHED", isDemo: false },
    include: { sources: { where: { source: { reviewStatus: "APPROVED" } }, include: sourceInclude } },
  });
  if (!event) return { ok: false, error: "Acontecimento não encontrado." };
  const content = eventContentSchema.parse(event.content);
  const body = [
    content.summary.text,
    content.context.text,
    `Situação: ${content.status.label} — ${content.status.description}`,
    ...content.impacts.map((i) => `Impacto (${i.kind === "DOCUMENTED" ? "documentado" : "possível"}): ${i.decision} → ${i.change} → ${i.group} → ${i.conditions}`),
    ...content.arguments.map((a) => `${a.attribution}: ${a.text}`),
    ...content.uncertainties.map((u) => `Incerteza: ${u.text}`),
  ].join("\n");
  return runQuestion(userId, question, {
    kind: "event_question",
    title: event.title,
    body,
    sources: event.sources.map((es) => toEvidenceInput(es.source)),
  });
}
