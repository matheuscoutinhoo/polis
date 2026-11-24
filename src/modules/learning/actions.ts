"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";
import { markLessonRead, submitQuiz, type ProgressUpdate, type QuizFeedback } from "./progress";

export async function markLessonReadAction(lessonId: string, path: string): Promise<{ ok: true; progress: ProgressUpdate } | { ok: false; error: string }> {
  const user = await requireUser(path);
  try {
    await enforceRateLimit(`lesson-read:${user.id}`, 120, 3600);
    const progress = await markLessonRead(user.id, z.string().min(1).max(40).parse(lessonId));
    revalidatePath("/", "layout");
    return { ok: true, progress };
  } catch (error) {
    if (error instanceof RateLimitError) return { ok: false, error: error.message };
    return { ok: false, error: "Não foi possível registrar a leitura agora. Tente novamente." };
  }
}

const answersSchema = z.record(z.string().max(40), z.string().max(40));

export async function submitQuizAction(
  lessonId: string,
  answers: Record<string, string>,
  path: string,
): Promise<{ ok: true; feedback: QuizFeedback } | { ok: false; error: string }> {
  const user = await requireUser(path);
  try {
    await enforceRateLimit(`quiz:${user.id}`, 120, 3600);
    const feedback = await submitQuiz(user.id, z.string().min(1).max(40).parse(lessonId), answersSchema.parse(answers));
    if (feedback.allCorrect) revalidatePath("/", "layout");
    return { ok: true, feedback };
  } catch (error) {
    if (error instanceof RateLimitError) return { ok: false, error: error.message };
    return { ok: false, error: "Não foi possível conferir as respostas agora. Suas escolhas foram mantidas; tente novamente." };
  }
}
