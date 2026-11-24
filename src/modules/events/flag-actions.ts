"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";

export type FlagState = { ok: boolean; error?: string; message?: string };

const flagSchema = z.object({
  targetType: z.enum(["EVENT", "LESSON"]),
  targetId: z.string().min(1).max(40),
  reason: z.enum(["FACTUAL_ERROR", "INADEQUATE_SOURCE", "LEADING_LANGUAGE", "OTHER"], { message: "Escolha um motivo." }),
  details: z.string().trim().max(1000),
});

/** Lets readers flag a factual error, an inadequate source or language that induces an opinion. */
export async function flagContentAction(_prev: FlagState, formData: FormData): Promise<FlagState> {
  const path = String(formData.get("path") ?? "/");
  const user = await requireUser(path);
  const parsed = flagSchema.safeParse({
    targetType: formData.get("targetType"),
    targetId: formData.get("targetId"),
    reason: formData.get("reason"),
    details: String(formData.get("details") ?? ""),
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  try {
    await enforceRateLimit(`flag:${user.id}`, 10, 3600);
  } catch (error) {
    if (error instanceof RateLimitError) return { ok: false, error: error.message };
    throw error;
  }
  const exists =
    parsed.data.targetType === "EVENT"
      ? await db.event.findFirst({ where: { id: parsed.data.targetId, status: "PUBLISHED" }, select: { id: true } })
      : await db.lesson.findFirst({ where: { id: parsed.data.targetId, status: "PUBLISHED" }, select: { id: true } });
  if (!exists) return { ok: false, error: "Conteúdo não encontrado." };
  await db.contentFlag.create({
    data: { targetType: parsed.data.targetType, targetId: parsed.data.targetId, reason: parsed.data.reason, details: parsed.data.details || null, reporterId: user.id },
  });
  return { ok: true, message: "Obrigado. A equipe editorial vai revisar este ponto." };
}
