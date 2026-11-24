"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ChoiceRow } from "@/components/polis/choice-row";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { ProgressBar } from "@/components/ui/progress";
import { completeQuestionnaireAction, saveAnswerAction } from "@/modules/diagnostic/actions";
import { ANSWER_LABEL, ANSWER_OPTIONS, type AnswerChoice } from "@/modules/diagnostic/scale";

type RunnerQuestion = { id: string; dimension: string; title: string; situation: string; statement: string };
type RunnerDimension = { key: string; title: string; block: number };

type SaveState = "idle" | "saving" | "saved" | "queued" | "error";

const BLOCK_SIZE = 10;

export function QuestionnaireRunner({
  attemptId,
  questions,
  dimensions,
  initialAnswers,
  isRetake,
}: {
  attemptId: string;
  questions: RunnerQuestion[];
  dimensions: RunnerDimension[];
  initialAnswers: Record<string, AnswerChoice>;
  isRetake: boolean;
}) {
  const storageKey = `polis-questionario-pendente-${attemptId}`;
  const [answers, setAnswers] = useState<Record<string, AnswerChoice>>(initialAnswers);
  const firstUnanswered = questions.findIndex((q) => !initialAnswers[q.id]);
  const [index, setIndex] = useState(firstUnanswered === -1 ? questions.length - 1 : firstUnanswered);
  const [view, setView] = useState<"question" | "review">(firstUnanswered === -1 ? "review" : "question");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState<Record<string, AnswerChoice>>({});
  const [completing, startCompleting] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const question = questions[index];
  const block = Math.floor(index / BLOCK_SIZE);
  const dimension = dimensions.find((d) => d.key === question.dimension);
  const answeredCount = useMemo(() => questions.filter((q) => answers[q.id]).length, [answers, questions]);
  const blockQuestions = questions.slice(block * BLOCK_SIZE, block * BLOCK_SIZE + BLOCK_SIZE);
  const pendingCount = Object.keys(pending).length;

  // Restore answers kept on this device after a network failure.
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as Record<string, AnswerChoice>;
      if (Object.keys(stored).length) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- answers kept on this device are only readable after hydration
        setAnswers((current) => ({ ...current, ...stored }));
        setPending(stored);
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (Object.keys(pending).length) localStorage.setItem(storageKey, JSON.stringify(pending));
    else localStorage.removeItem(storageKey);
  }, [pending, storageKey]);

  const send = useCallback(async (questionId: string, choice: AnswerChoice) => {
    setSaveState("saving");
    try {
      const result = await saveAnswerAction(questionId, choice);
      if (result.ok) {
        setPending((current) => {
          if (current[questionId] !== choice) return current;
          const next = { ...current };
          delete next[questionId];
          return next;
        });
        setSaveState("saved");
        setMessage(null);
      } else {
        setSaveState(result.retryable ? "queued" : "error");
        setMessage(result.error);
      }
    } catch {
      setSaveState("queued");
      setMessage("Sem conexão: sua resposta está guardada neste aparelho e será enviada automaticamente.");
    }
  }, []);

  // Retry queued answers periodically and when the connection returns.
  useEffect(() => {
    if (pendingCount === 0) return;
    const flush = () => {
      for (const [questionId, choice] of Object.entries(pending)) void send(questionId, choice);
    };
    const timer = window.setInterval(flush, 10000);
    window.addEventListener("online", flush);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("online", flush);
    };
  }, [pending, pendingCount, send]);

  useEffect(() => {
    if (view === "question") headingRef.current?.focus();
  }, [index, view]);

  function choose(choice: string) {
    const value = choice as AnswerChoice;
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setPending((current) => ({ ...current, [question.id]: value }));
    void send(question.id, value);
  }

  function goNext() {
    if ((index + 1) % BLOCK_SIZE === 0 || index === questions.length - 1) {
      setView("review");
      window.scrollTo({ top: 0 });
      return;
    }
    setIndex(index + 1);
  }

  function goPrevious() {
    if (view === "review") {
      setView("question");
      return;
    }
    if (index > 0) setIndex(index - 1);
  }

  function openQuestion(i: number) {
    setIndex(i);
    setView("question");
  }

  function finish() {
    startCompleting(async () => {
      const result = await completeQuestionnaireAction();
      if (result && !result.ok) setMessage(result.error);
    });
  }

  const saveLabel =
    saveState === "saving"
      ? "Salvando..."
      : saveState === "saved"
        ? "Resposta salva"
        : saveState === "queued"
          ? "Sem conexão: resposta guardada neste aparelho"
          : saveState === "error"
            ? "Não foi possível salvar"
            : "As respostas são salvas automaticamente";

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="surface-card p-5 md:p-8">
        <p className="eyebrow">Seu ponto de vista{isRetake ? " / nova tentativa" : ""}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-meta text-ink-soft">
          <span>
            Bloco {block + 1} de 5 · {dimension?.title}
          </span>
          <span>
            {view === "question" ? `Pergunta ${index + 1} de ${questions.length}` : "Revisão do bloco"} · {answeredCount} respondidas
          </span>
        </div>
        <ProgressBar className="mt-2" value={answeredCount} max={questions.length} label="Situações respondidas" />

        {view === "question" ? (
          <div className="mt-6">
            <h1 ref={headingRef} tabIndex={-1} className="text-h2 font-semibold focus-visible:outline-none md:text-[2rem] md:leading-10">
              Como você vê esta situação?
            </h1>
            <p className="mt-4 text-reading">{question.situation}</p>
            <fieldset className="mt-6">
              <legend className="text-h3 font-semibold">{question.statement}</legend>
              <div className="mt-4 flex flex-col gap-2.5">
                {ANSWER_OPTIONS.filter((o) => o.value !== "UNKNOWN").map((option) => (
                  <ChoiceRow key={option.value} name={`q-${question.id}`} value={option.value} label={option.label} checked={answers[question.id] === option.value} onChange={choose} />
                ))}
                <div className="mt-2 border-t border-line-soft pt-4">
                  <ChoiceRow
                    name={`q-${question.id}`}
                    value="UNKNOWN"
                    label={ANSWER_LABEL.UNKNOWN}
                    description="Não conta como posição neutra; a situação fica fora do cálculo."
                    checked={answers[question.id] === "UNKNOWN"}
                    onChange={choose}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        ) : (
          <div className="mt-6">
            <h1 ref={headingRef} tabIndex={-1} className="text-h2 font-semibold focus-visible:outline-none">
              Revise o bloco {block + 1}
            </h1>
            <p className="mt-2 text-body text-ink-soft">Você pode alterar qualquer resposta antes de continuar. Nada é enviado para fora da Polis.</p>
            <ol className="mt-5 flex flex-col divide-y divide-line-soft rounded-card border border-line">
              {blockQuestions.map((q) => {
                const i = questions.indexOf(q);
                return (
                  <li key={q.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">
                        {i + 1}. {q.title}
                      </p>
                      <p className={`text-meta ${answers[q.id] ? "text-ink-soft" : "font-semibold text-warning"}`}>{answers[q.id] ? ANSWER_LABEL[answers[q.id]] : "Sem resposta"}</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => openQuestion(i)}>
                      {answers[q.id] ? "Revisar" : "Responder"}
                    </Button>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        <p className="mt-5 flex items-center gap-2 text-meta text-ink-soft" role="status" aria-live="polite">
          {saveState === "saved" ? <Icon name="check" size={16} className="text-success" /> : null}
          {saveLabel}
          {pendingCount > 0 && saveState !== "saving" ? ` · ${pendingCount} pendente(s)` : ""}
        </p>
        {message ? (
          <Notice tone={saveState === "error" ? "error" : "warning"} className="mt-3" role="alert">
            {message}
          </Notice>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Button variant="secondary" icon="arrowLeft" iconPosition="start" onClick={goPrevious} disabled={view === "question" && index === 0}>
              Anterior
            </Button>
            <Link href="/questionario?pausado=1" className="btn btn-text">
              <Icon name="pause" size={18} />
              <span>Pausar</span>
            </Link>
          </div>
          {view === "question" ? (
            <Button icon="arrowRight" onClick={goNext}>
              {(index + 1) % BLOCK_SIZE === 0 ? "Revisar bloco" : "Próxima"}
            </Button>
          ) : block < 4 ? (
            <Button icon="arrowRight" onClick={() => openQuestion((block + 1) * BLOCK_SIZE)}>
              Continuar para o bloco {block + 2}
            </Button>
          ) : (
            <Button icon="arrowRight" onClick={finish} busy={completing} busyLabel="Calculando..." disabled={answeredCount < questions.length || pendingCount > 0}>
              Ver resultado
            </Button>
          )}
        </div>
        {view === "review" && block === 4 && answeredCount < questions.length ? (
          <p className="mt-3 text-meta text-ink-soft">
            Faltam {questions.length - answeredCount} situações. Use “Não sei / preciso entender melhor” quando precisar. Responda as pendentes pelos blocos:{" "}
            {[0, 1, 2, 3, 4]
              .filter((b) => questions.slice(b * BLOCK_SIZE, b * BLOCK_SIZE + BLOCK_SIZE).some((q) => !answers[q.id]))
              .map((b) => (
                <button key={b} type="button" className="text-link mx-1" onClick={() => openQuestion(questions.findIndex((q, i) => i >= b * BLOCK_SIZE && !answers[q.id]))}>
                  bloco {b + 1}
                </button>
              ))}
          </p>
        ) : null}
      </div>
    </div>
  );
}
