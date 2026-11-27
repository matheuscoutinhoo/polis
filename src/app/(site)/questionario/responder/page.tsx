import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuestionnaireRunner } from "@/components/questionnaire/runner";
import { requireUser } from "@/lib/session";
import { DIMENSIONS } from "@/modules/diagnostic/dimensions";
import { attemptQuestions } from "@/modules/diagnostic/question-bank";
import type { AnswerChoice } from "@/modules/diagnostic/scale";
import { getActiveConsent, getCompletedAttempt, isCurrentConsent, startAttempt } from "@/modules/diagnostic/service";

export const metadata: Metadata = { title: "Responder questionário" };

export default async function AnswerPage() {
  const user = await requireUser("/questionario/responder");
  const consent = await getActiveConsent(user.id);
  if (!isCurrentConsent(consent)) redirect("/questionario");
  const [attempt, completed] = await Promise.all([startAttempt(user.id), getCompletedAttempt(user.id)]);
  // startAttempt only keeps attempts whose situations are all in the bank.
  const questions = attemptQuestions(attempt.questionIds);
  if (!questions) redirect("/questionario");
  const initialAnswers = Object.fromEntries(attempt.answers.map((a) => [a.questionId, a.choice as AnswerChoice]));

  return (
    <div className="page-frame py-6 md:py-10">
      <QuestionnaireRunner
        attemptId={attempt.id}
        isRetake={Boolean(completed)}
        initialAnswers={initialAnswers}
        questions={questions.map((q) => ({ id: q.id, dimension: q.dimension, title: q.title, situation: q.situation, statement: q.statement }))}
        dimensions={DIMENSIONS.map((d) => ({ key: d.key, title: d.title, block: d.block }))}
      />
    </div>
  );
}
