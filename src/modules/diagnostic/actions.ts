"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";
import {
  QuestionnaireError,
  completeAttempt,
  deleteQuestionnaireData,
  discardInProgressAttempt,
  grantQuestionnaireConsent,
  revokeQuestionnaireConsent,
  saveAnswer,
  setPathMode,
  startAttempt,
} from "./service";

export type SaveAnswerResult = { ok: true; savedAt: string } | { ok: false; error: string; retryable: boolean };

export async function acceptQuestionnaireConsentAction(formData: FormData) {
  const user = await requireUser("/questionario");
  if (formData.get("consent") !== "on") {
    redirect("/questionario?erro=consentimento");
  }
  await grantQuestionnaireConsent(user.id);
  await startAttempt(user.id);
  redirect("/questionario/responder");
}

export async function saveAnswerAction(questionId: string, choice: string): Promise<SaveAnswerResult> {
  const user = await requireUser("/questionario/responder");
  try {
    await enforceRateLimit(`questionnaire-save:${user.id}`, 400, 3600);
    await saveAnswer(user.id, questionId, choice);
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (error) {
    if (error instanceof QuestionnaireError) return { ok: false, error: error.message, retryable: false };
    if (error instanceof RateLimitError) return { ok: false, error: error.message, retryable: true };
    return { ok: false, error: "Não foi possível salvar agora. Sua resposta foi mantida e será enviada novamente.", retryable: true };
  }
}

export async function completeQuestionnaireAction(): Promise<{ ok: false; error: string } | void> {
  const user = await requireUser("/questionario/responder");
  try {
    await completeAttempt(user.id);
  } catch (error) {
    if (error instanceof QuestionnaireError) return { ok: false, error: error.message };
    throw error;
  }
  revalidatePath("/", "layout");
  redirect("/questionario/resultado");
}

export async function startRetakeAction() {
  const user = await requireUser("/questionario");
  await startAttempt(user.id);
  redirect("/questionario/responder");
}

export async function discardRetakeAction() {
  const user = await requireUser("/questionario");
  await discardInProgressAttempt(user.id);
  redirect("/questionario");
}

export async function setPathModeAction(formData: FormData) {
  const user = await requireUser("/aprender");
  const mode = formData.get("mode") === "AFFINITY" ? "AFFINITY" : "GENERAL";
  await setPathMode(user.id, mode);
  revalidatePath("/", "layout");
}

export async function deleteQuestionnaireDataAction() {
  const user = await requireUser("/conta/privacidade");
  await deleteQuestionnaireData(user.id);
  revalidatePath("/", "layout");
  redirect("/conta/privacidade?aviso=questionario-apagado");
}

export async function revokeQuestionnaireConsentAction() {
  const user = await requireUser("/conta/privacidade");
  await revokeQuestionnaireConsent(user.id);
  revalidatePath("/", "layout");
  redirect("/conta/privacidade?aviso=consentimento-revogado");
}
