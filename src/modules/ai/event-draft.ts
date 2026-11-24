import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { buildEvidencePack, sanitizeUntrusted } from "./evidence";
import { EVENT_DRAFT_INSTRUCTIONS } from "./prompts";
import { AiFailureError, AiUnavailableError, getAiProvider } from "./provider";
import { validateEventDraft, type DraftReport } from "./reference-check";
import { eventDraftOutputSchema } from "./schemas";

export type DraftResult = { ok: true; report: DraftReport } | { ok: false; error: string };

type DraftEvidenceSource = Parameters<typeof buildEvidencePack>[0][number];

/** Builds the exact model input used for event drafts (also used by the evaluation battery). */
export function buildDraftInput(
  event: { title: string; eventDate: Date; editorNotes: string | null },
  catalog: Array<{ ref: string; title: string }>,
  sources: DraftEvidenceSource[],
) {
  const evidence = buildEvidencePack(sources);
  const input = [
    `<conteudo>\nTítulo provisório: ${sanitizeUntrusted(event.title, 300)}\nData do fato central informada pela equipe: ${event.eventDate.toISOString().slice(0, 10)}\nNotas da equipe editorial: ${sanitizeUntrusted(event.editorNotes ?? "(nenhuma)", 1500)}\n</conteudo>`,
    `<catalogo>\n${catalog.map((c) => `${c.ref}: ${sanitizeUntrusted(c.title, 200)}`).join("\n")}\n</catalogo>`,
    evidence.text,
  ].join("\n\n");
  return { input, evidence };
}

/**
 * Generates an AI draft for an event from the approved sources attached to it.
 * The draft is never published automatically: it is stored for editorial
 * review with a report of removed items, invalid references and warnings.
 */
export async function generateEventDraft(eventId: string): Promise<DraftResult> {
  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      sources: {
        where: { source: { reviewStatus: "APPROVED" } },
        include: { source: { include: { publisher: true, excerpts: { orderBy: { createdAt: "asc" } } } } },
      },
    },
  });
  if (!event) return { ok: false, error: "Acontecimento não encontrado." };
  if (event.sources.length === 0) return { ok: false, error: "Vincule pelo menos uma fonte aprovada, com trechos cadastrados, antes de gerar o rascunho." };

  const lessons = await db.lesson.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, slug: true, title: true, module: { select: { slug: true, title: true } } },
    orderBy: [{ module: { number: "asc" } }, { number: "asc" }],
  });
  const catalog = lessons.map((lesson, index) => ({ ref: `L${index + 1}`, id: `${lesson.module.slug}/${lesson.slug}`, title: `${lesson.module.title} — ${lesson.title}` }));

  const { input, evidence } = buildDraftInput(
    event,
    catalog,
    event.sources.map(({ source }) => ({
      key: source.key,
      title: source.title,
      publisherName: source.publisher.name,
      materialType: source.materialType,
      publishedOn: source.publishedOn,
      scopeNote: source.scopeNote,
      excerpts: source.excerpts.map((e) => ({ locator: e.locator, text: e.text })),
    })),
  );

  const started = Date.now();
  let model = "indisponível";
  try {
    const provider = await getAiProvider();
    model = provider.model;
    const response = await provider.generate({
      purpose: "event_draft",
      instructions: EVENT_DRAFT_INSTRUCTIONS,
      input,
      schema: eventDraftOutputSchema,
      schemaName: "rascunho_acontecimento",
      maxOutputTokens: Number(process.env.AI_DRAFT_MAX_OUTPUT_TOKENS ?? 6000),
    });
    const { content, report } = validateEventDraft(response.data, evidence.byRef, catalog, {
      model: response.model,
      asOf: new Date().toISOString().slice(0, 10),
    });
    await db.event.update({
      where: { id: event.id },
      data: {
        content,
        aiAssisted: true,
        aiReport: report as unknown as object,
        status: event.status === "PUBLISHED" ? "IN_REVIEW" : "DRAFT",
        statusLabel: content.status.label || event.statusLabel,
      },
    });
    await db.aiGeneration.create({
      data: {
        purpose: "event_draft",
        model: response.model,
        status: report.centralFactSupported ? "DRAFTED" : "DRAFTED_UNSUPPORTED",
        inputTokens: response.usage.inputTokens,
        outputTokens: response.usage.outputTokens,
        durationMs: Date.now() - started,
        eventId: event.id,
      },
    });
    logger.info("ai.event_draft", { eventId: event.id, removed: report.removedItems.length, invalidRefs: report.invalidReferences.length });
    return { ok: true, report };
  } catch (error) {
    const code = error instanceof AiUnavailableError ? "UNAVAILABLE" : error instanceof AiFailureError ? error.code : "UNKNOWN";
    await db.aiGeneration.create({ data: { purpose: "event_draft", model, status: "ERROR", errorCode: code, durationMs: Date.now() - started, eventId } }).catch(() => {});
    logger.warn("ai.event_draft_failed", { code });
    if (error instanceof AiUnavailableError) return { ok: false, error: "A geração de rascunhos com IA não está configurada neste ambiente (OPENAI_API_KEY ausente). Você pode redigir a análise manualmente." };
    return { ok: false, error: "Não foi possível gerar o rascunho agora. O conteúdo publicado não foi afetado." };
  }
}
