"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";
import { requireAdmin } from "@/lib/session";
import { generateEventDraft, type DraftResult } from "@/modules/ai/event-draft";
import { eventContentSchema } from "@/modules/events/content";
import {
  attachSourceToEvent,
  createEventDraft,
  detachSourceFromEvent,
  linkLessonToEvent,
  publishEvent,
  saveEventContent,
  unlinkLessonFromEvent,
  unpublishEvent,
} from "@/modules/events/service";
import { addExcerpt, createSource, reviewSource, SourceError } from "@/modules/sources/service";
import { liftSuspension, resolveFlag, resolveReport } from "./moderation";

export type AdminState = { ok: boolean; error?: string; message?: string; details?: string[] };

function failure(error: unknown): AdminState {
  if (error instanceof ZodError) return { ok: false, error: error.issues[0]?.message ?? "Dados inválidos.", details: error.issues.map((i) => `${i.path.join(".")}: ${i.message}`) };
  if (error instanceof SourceError || error instanceof Error) return { ok: false, error: error.message };
  return { ok: false, error: "Falha inesperada." };
}

// Sources ---------------------------------------------------------------------

export async function createSourceAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireAdmin();
  try {
    await createSource(Object.fromEntries(["publisherId", "title", "url", "author", "publishedOn", "sourceUpdatedOn", "locator", "materialType", "reuseKind", "reuseCondition", "scopeNote", "excerptLocator", "excerptText"].map((k) => [k, String(formData.get(k) ?? "")])));
  } catch (error) {
    return failure(error);
  }
  revalidatePath("/admin/fontes");
  redirect("/admin/fontes?aviso=fonte-cadastrada");
}

export async function addExcerptAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireAdmin();
  try {
    await addExcerpt({ sourceId: String(formData.get("sourceId") ?? ""), locator: String(formData.get("locator") ?? ""), text: String(formData.get("text") ?? "") });
  } catch (error) {
    return failure(error);
  }
  revalidatePath("/admin/fontes");
  return { ok: true, message: "Trecho adicionado." };
}

export async function reviewSourceAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const admin = await requireAdmin();
  const decision = formData.get("decision") === "APPROVED" ? "APPROVED" : "REJECTED";
  const reason = String(formData.get("reason") ?? "").trim();
  if (reason.length < 5) return { ok: false, error: "Registre o motivo da decisão." };
  try {
    await reviewSource(String(formData.get("sourceId") ?? ""), admin, decision, reason);
  } catch (error) {
    return failure(error);
  }
  revalidatePath("/admin/fontes");
  // The reviewed source leaves the pending list, so the confirmation is shown on the page.
  redirect(`/admin/fontes?aviso=${decision === "APPROVED" ? "fonte-aprovada" : "fonte-rejeitada"}`);
}

// Events ----------------------------------------------------------------------

const newEventSchema = z.object({
  title: z.string().trim().min(8, "Use um título descritivo (mínimo de 8 caracteres).").max(200),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Informe a data do fato central."),
  themes: z.array(z.string()).min(1, "Escolha pelo menos um tema."),
  editorNotes: z.string().trim().max(1500),
  isDemo: z.boolean(),
});

export async function createEventAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireAdmin();
  let id: string;
  try {
    const input = newEventSchema.parse({
      title: String(formData.get("title") ?? ""),
      eventDate: String(formData.get("eventDate") ?? ""),
      themes: formData.getAll("themes").map(String),
      editorNotes: String(formData.get("editorNotes") ?? ""),
      isDemo: formData.get("isDemo") === "on",
    });
    const event = await createEventDraft({ ...input, eventDate: new Date(`${input.eventDate}T12:00:00Z`) });
    id = event.id;
  } catch (error) {
    return failure(error);
  }
  revalidatePath("/admin/acontecimentos");
  redirect(`/admin/acontecimentos/${id}`);
}

const saveSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(8).max(200),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  themes: z.array(z.string()).min(1),
  editorNotes: z.string().max(1500).nullable(),
  content: eventContentSchema,
});

export async function saveEventAction(payload: unknown): Promise<AdminState> {
  await requireAdmin();
  try {
    const input = saveSchema.parse(payload);
    await saveEventContent(input.id, { ...input, eventDate: new Date(`${input.eventDate}T12:00:00Z`) });
    revalidatePath(`/admin/acontecimentos/${input.id}`);
    revalidatePath("/acontecimentos", "layout");
  } catch (error) {
    return failure(error);
  }
  return { ok: true, message: "Rascunho salvo." };
}

export async function generateDraftAction(eventId: string): Promise<DraftResult> {
  await requireAdmin();
  const result = await generateEventDraft(eventId);
  revalidatePath(`/admin/acontecimentos/${eventId}`);
  return result;
}

export async function publishEventAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const admin = await requireAdmin();
  const id = String(formData.get("eventId") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  if (reason.length < 10) return { ok: false, error: "Registre a revisão feita (mínimo de 10 caracteres)." };
  const result = await publishEvent(id, admin, reason);
  revalidatePath(`/admin/acontecimentos/${id}`);
  revalidatePath("/acontecimentos", "layout");
  if (!result.ok) return { ok: false, error: "Publicação bloqueada.", details: result.check.blocking };
  return {
    ok: true,
    message: result.check.omitted.length ? `Publicado. ${result.check.omitted.length} item(ns) sem evidência foram omitidos da versão pública.` : "Publicado.",
  };
}

export async function unpublishEventAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("eventId") ?? "");
  await unpublishEvent(id, admin.id, String(formData.get("reason") ?? "Retirado para revisão editorial."));
  revalidatePath(`/admin/acontecimentos/${id}`);
  revalidatePath("/acontecimentos", "layout");
}

export async function attachSourceAction(formData: FormData) {
  await requireAdmin();
  const eventId = String(formData.get("eventId") ?? "");
  await attachSourceToEvent(eventId, String(formData.get("sourceId") ?? ""));
  revalidatePath(`/admin/acontecimentos/${eventId}`);
}

export async function detachSourceAction(formData: FormData) {
  await requireAdmin();
  const eventId = String(formData.get("eventId") ?? "");
  await detachSourceFromEvent(eventId, String(formData.get("sourceId") ?? ""));
  revalidatePath(`/admin/acontecimentos/${eventId}`);
}

export async function linkLessonAction(formData: FormData) {
  await requireAdmin();
  const eventId = String(formData.get("eventId") ?? "");
  const relation = String(formData.get("relation") ?? "").trim().slice(0, 300) || "Conceito relacionado ao acontecimento.";
  await linkLessonToEvent(eventId, String(formData.get("lessonId") ?? ""), relation);
  revalidatePath(`/admin/acontecimentos/${eventId}`);
}

export async function unlinkLessonAction(formData: FormData) {
  await requireAdmin();
  const eventId = String(formData.get("eventId") ?? "");
  await unlinkLessonFromEvent(eventId, String(formData.get("lessonId") ?? ""));
  revalidatePath(`/admin/acontecimentos/${eventId}`);
}

// Moderation ------------------------------------------------------------------

export async function resolveReportAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const admin = await requireAdmin();
  try {
    await resolveReport(admin, Object.fromEntries(formData.entries()));
  } catch (error) {
    return failure(error);
  }
  revalidatePath("/admin/moderacao");
  // The resolved report leaves the open queue, so the confirmation is shown on the page.
  redirect("/admin/moderacao?aviso=denuncia-resolvida");
}

export async function liftSuspensionAction(formData: FormData) {
  const admin = await requireAdmin();
  await liftSuspension(admin, String(formData.get("userId") ?? ""), String(formData.get("reason") ?? "Suspensão encerrada pela moderação."));
  revalidatePath("/admin/moderacao");
  redirect("/admin/moderacao?aviso=suspensao-encerrada");
}

export async function resolveFlagAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const admin = await requireAdmin();
  const note = String(formData.get("note") ?? "").trim();
  if (note.length < 5) return { ok: false, error: "Registre a resolução." };
  try {
    await resolveFlag(admin, String(formData.get("flagId") ?? ""), formData.get("decision") === "ACTION_TAKEN" ? "ACTION_TAKEN" : "DISMISSED", note);
  } catch (error) {
    return failure(error);
  }
  revalidatePath("/admin/moderacao");
  redirect("/admin/moderacao?aviso=sinalizacao-resolvida");
}
