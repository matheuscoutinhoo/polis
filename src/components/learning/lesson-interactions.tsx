"use client";

import { useState, useTransition } from "react";
import { ChoiceRow } from "@/components/polis/choice-row";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { ACHIEVEMENTS } from "@/modules/learning/progress-labels";
import { markLessonReadAction, submitQuizAction } from "@/modules/learning/actions";
import type { ProgressUpdate } from "@/modules/learning/progress";

type PublicQuestion = { id: string; prompt: string; options: Array<{ id: string; text: string }> };

function ProgressMessage({ progress }: { progress: ProgressUpdate }) {
  if (!progress.xpGained && !progress.lessonCompleted) return null;
  return (
    <div className="acknowledge mt-4 rounded-card bg-mint p-4 text-body" role="status">
      {progress.lessonCompleted ? <p className="font-semibold">Lição concluída. Você pode revisar o conteúdo quando quiser.</p> : null}
      {progress.xpGained ? <p>+{progress.xpGained} XP de aprendizado.</p> : null}
      {progress.moduleCompleted ? <p>Módulo concluído.</p> : null}
      {progress.newAchievements.map((key) => (
        <p key={key} className="flex items-center gap-2">
          <Icon name="check" size={16} className="text-action" /> Conquista: {ACHIEVEMENTS[key].title}
        </p>
      ))}
    </div>
  );
}

export function MarkReadButton({ lessonId, path, alreadyRead }: { lessonId: string; path: string; alreadyRead: boolean }) {
  const [read, setRead] = useState(alreadyRead);
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (read && !progress) {
    return (
      <p className="flex items-center gap-2 text-meta text-ink-soft">
        <Icon name="check" size={16} className="text-action" /> Leitura registrada.
      </p>
    );
  }
  return (
    <div>
      {!read ? (
        <Button
          variant="secondary"
          busy={pending}
          busyLabel="Registrando..."
          icon="check"
          iconPosition="start"
          onClick={() =>
            start(async () => {
              const result = await markLessonReadAction(lessonId, path);
              if (result.ok) {
                setRead(true);
                setProgress(result.progress);
                setError(null);
              } else setError(result.error);
            })
          }
        >
          Concluí a leitura
        </Button>
      ) : null}
      {progress ? <ProgressMessage progress={progress} /> : null}
      {error ? (
        <Notice tone="error" className="mt-3" role="alert">
          {error}
        </Notice>
      ) : null}
    </div>
  );
}

export function LessonQuiz({ lessonId, path, questions, alreadyUnderstood }: { lessonId: string; path: string; questions: PublicQuestion[]; alreadyUnderstood: boolean }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; explanation: string }>>({});
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);
  const [allCorrect, setAllCorrect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const answeredAll = questions.every((q) => answers[q.id]);

  function submit() {
    start(async () => {
      const result = await submitQuizAction(lessonId, answers, path);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError(null);
      setFeedback(Object.fromEntries(result.feedback.results.map((r) => [r.questionId, { correct: r.correct, explanation: r.explanation }])));
      setAllCorrect(result.feedback.allCorrect);
      setProgress(result.feedback.progress);
    });
  }

  return (
    <section aria-labelledby="verificacao" className="mt-12 rounded-panel bg-blue p-5 md:p-8">
      <p className="eyebrow">Verificação de compreensão</p>
      <h2 id="verificacao" className="mt-1 text-h2 font-semibold">
        Confira o que você entendeu
      </h2>
      <p className="mt-2 text-body text-ink-soft">
        As perguntas tratam de fatos e conceitos da lição, não de opinião. Você pode tentar quantas vezes quiser.
        {alreadyUnderstood ? " Você já concluiu esta verificação; responder de novo não altera seus pontos." : ""}
      </p>
      <ol className="mt-6 flex flex-col gap-8">
        {questions.map((question, index) => {
          const result = feedback[question.id];
          return (
            <li key={question.id}>
              <fieldset>
                <legend className="text-lead font-semibold">
                  {index + 1}. {question.prompt}
                </legend>
                <div className="mt-3 flex flex-col gap-2.5">
                  {question.options.map((option) => (
                    <ChoiceRow
                      key={option.id}
                      name={`quiz-${question.id}`}
                      value={option.id}
                      label={option.text}
                      checked={answers[question.id] === option.id}
                      onChange={(value) => {
                        setAnswers((current) => ({ ...current, [question.id]: value }));
                        setFeedback((current) => {
                          const next = { ...current };
                          delete next[question.id];
                          return next;
                        });
                      }}
                    />
                  ))}
                </div>
              </fieldset>
              {result ? (
                <div className={`acknowledge mt-3 rounded-card p-4 text-body ${result.correct ? "bg-success-bg" : "bg-surface"}`} role="status">
                  <p className={`font-semibold ${result.correct ? "text-success" : "text-ink"}`}>{result.correct ? "Resposta correta." : "Ainda não. Releia a explicação e tente de novo."}</p>
                  <p className="mt-1">{result.explanation}</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {error ? (
        <Notice tone="error" className="mt-4" role="alert">
          {error}
        </Notice>
      ) : null}
      <div className="mt-6">
        <Button onClick={submit} busy={pending} busyLabel="Conferindo..." disabled={!answeredAll}>
          {Object.keys(feedback).length ? "Conferir novamente" : "Conferir respostas"}
        </Button>
        {!answeredAll ? <p className="mt-2 text-meta text-ink-soft">Responda todas as perguntas para conferir.</p> : null}
      </div>
      {allCorrect && progress ? <ProgressMessage progress={progress} /> : null}
    </section>
  );
}
