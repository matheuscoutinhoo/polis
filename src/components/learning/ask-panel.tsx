"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { askQuestionAction } from "@/modules/ai/actions";
import type { AskResult } from "@/modules/ai/ask";

const MAX = 500;

/** Contextual question about the current lesson or event, answered only from its sources. */
export function AskPanel({ kind, targetId, path, signedIn, available }: { kind: "lesson" | "event"; targetId: string; path: string; signedIn: boolean; available: boolean }) {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AskResult | null>(null);
  const [pending, start] = useTransition();

  return (
    <section aria-labelledby="duvida" className="surface-card mt-10 p-5 md:p-6">
      <p className="eyebrow">Tirar uma dúvida</p>
      <h2 id="duvida" className="mt-1 text-h3 font-semibold">
        Pergunte sobre {kind === "lesson" ? "esta lição" : "este acontecimento"}
      </h2>
      <p className="mt-2 text-meta text-ink-soft">
        Resposta com apoio de IA, limitada ao conteúdo e às fontes desta página. Não recomenda voto, partido ou corrente. Não envie dados pessoais: sua pergunta é enviada sem
        nome, e-mail ou respostas do questionário.
      </p>
      {!available ? (
        <Notice tone="neutral" className="mt-4">
          As dúvidas com apoio de IA não estão disponíveis neste ambiente. O conteúdo e as fontes continuam disponíveis.
        </Notice>
      ) : !signedIn ? (
        <p className="mt-4 text-body">
          <Link href={`/entrar?proximo=${encodeURIComponent(path)}`} className="text-link">
            Entre na sua conta
          </Link>{" "}
          para enviar uma dúvida.
        </p>
      ) : (
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (pending || question.trim().length < 5) return;
            start(async () => {
              try {
                setResult(await askQuestionAction(kind, { targetId, question, path }));
              } catch {
                setResult({ ok: false, error: "Sem conexão. Sua pergunta foi mantida; tente novamente." });
              }
            });
          }}
        >
          <label htmlFor="pergunta" className="font-semibold">
            Sua dúvida
          </label>
          <textarea
            id="pergunta"
            className="field-input"
            maxLength={MAX}
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={kind === "lesson" ? "Ex.: qual é a diferença entre plebiscito e referendo?" : "Ex.: o que ainda depende de regulamentação?"}
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-meta text-ink-soft">
              {question.length}/{MAX}
            </span>
            <Button type="submit" variant="secondary" busy={pending} busyLabel="Consultando..." disabled={question.trim().length < 5}>
              Enviar dúvida
            </Button>
          </div>
        </form>
      )}
      {result ? (
        result.ok ? (
          <div className="acknowledge mt-5 rounded-card bg-mint p-4" role="status" aria-live="polite">
            <p className="text-label font-semibold uppercase tracking-wider text-action">
              {result.status === "ANSWERED"
                ? "Resposta com apoio de IA"
                : result.status === "DECLINED_RECOMMENDATION"
                  ? "Sem recomendações"
                  : result.status === "OUT_OF_SCOPE"
                    ? "Fora do tema desta página"
                    : "Informação insuficiente"}
            </p>
            <p className="mt-2 whitespace-pre-line text-body">{result.answer}</p>
            {result.missingInformation ? <p className="mt-2 text-meta text-ink-soft">O que faltaria: {result.missingInformation}</p> : null}
            {result.citations.length ? (
              <div className="mt-3 border-t border-line pt-3">
                <p className="text-meta font-semibold">Fontes usadas</p>
                <ul className="mt-1 flex flex-col gap-1 text-meta">
                  {result.citations.map((c, i) => (
                    <li key={`${c.sourceKey}-${i}`}>
                      <a href={`#fonte-${c.sourceKey}`} className="text-link font-normal">
                        {c.publisherName} · {c.title}
                      </a>{" "}
                      <span className="text-ink-soft">({c.locator})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="mt-3 flex items-center gap-1.5 text-label text-ink-soft">
              <Icon name="info" size={14} /> Gerada automaticamente e não revisada. Confira as fontes.
            </p>
          </div>
        ) : (
          <Notice tone="warning" className="mt-5" role="alert">
            {result.error}
          </Notice>
        )
      ) : null}
    </section>
  );
}
