"use server";

import { z } from "zod";
import { requireUser } from "@/lib/session";
import { askAboutEvent, askAboutLesson, MAX_QUESTION_LENGTH, type AskResult } from "./ask";

const input = z.object({ targetId: z.string().min(1).max(40), question: z.string().max(MAX_QUESTION_LENGTH + 50), path: z.string().max(300) });

export async function askQuestionAction(kind: "lesson" | "event", raw: { targetId: string; question: string; path: string }): Promise<AskResult> {
  const parsed = input.safeParse(raw);
  if (!parsed.success) return { ok: false, error: `Escreva uma dúvida com até ${MAX_QUESTION_LENGTH} caracteres.` };
  const user = await requireUser(parsed.data.path);
  return kind === "lesson"
    ? askAboutLesson(user.id, parsed.data.targetId, parsed.data.question)
    : askAboutEvent(user.id, parsed.data.targetId, parsed.data.question);
}
