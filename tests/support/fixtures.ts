import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";

/** Empties every application table (migrations history is kept). */
export async function resetDatabase() {
  const tables = await db.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  if (tables.length === 0) return;
  await db.$executeRawUnsafe(`TRUNCATE ${tables.map((t) => `"public"."${t.tablename}"`).join(", ")} RESTART IDENTITY CASCADE`);
}

export async function createUser(overrides: { name?: string; emailVerified?: boolean; suspendedUntil?: Date | null; role?: string } = {}) {
  const id = randomUUID();
  return db.user.create({
    data: {
      id,
      name: overrides.name ?? `Pessoa ${id.slice(0, 6)}`,
      email: `${id}@exemplo.test`,
      emailVerified: overrides.emailVerified ?? true,
      suspendedUntil: overrides.suspendedUntil ?? null,
      role: overrides.role ?? "USER",
    },
  });
}

const QUIZ = {
  questions: [
    {
      id: "q1",
      prompt: "Qual alternativa descreve a lição de teste?",
      options: [
        { id: "a", text: "Alternativa correta" },
        { id: "b", text: "Alternativa incorreta" },
      ],
      correctOptionId: "a",
      explanation: "A alternativa A descreve o conteúdo apresentado.",
    },
    {
      id: "q2",
      prompt: "Qual é a segunda resposta correta do teste?",
      options: [
        { id: "a", text: "Incorreta" },
        { id: "b", text: "Correta" },
      ],
      correctOptionId: "b",
      explanation: "A alternativa B é a correta neste exercício.",
    },
  ],
};

export const CORRECT_ANSWERS = { q1: "a", q2: "b" };
export const WRONG_ANSWERS = { q1: "b", q2: "b" };

/** A published module with two lessons, backed by an approved source. */
export async function createLearningFixture(slug = "modulo-teste") {
  const publisher = await db.publisher.create({
    data: { key: `editor-${slug}`, name: "Editor de teste", category: "Teste", hostnames: ["www.exemplo.gov.br"], approved: true },
  });
  const source = await db.source.create({
    data: {
      key: `fonte-${slug}`,
      publisherId: publisher.id,
      title: "Fonte de teste",
      url: "https://www.exemplo.gov.br/fonte",
      accessedAt: new Date(),
      materialType: "CONTEUDO_DIDATICO",
      reuseKind: "REFERENCE_ONLY",
      reuseCondition: "Apenas referência.",
      scopeNote: "Fonte usada apenas nos testes.",
      reviewStatus: "APPROVED",
    },
  });
  const mod = await db.module.create({
    data: { slug, number: Math.floor(Math.random() * 100000) + 100, title: "Módulo de teste", summary: "Resumo do módulo de teste.", area: "FUNDAMENTOS", stage: "FOUNDATIONS" },
  });
  const content = {
    intro: "Introdução da lição de teste com texto suficiente.",
    blocks: [
      { type: "heading", text: "Seção" },
      { type: "paragraph", text: "Parágrafo com uma afirmação sustentada.", sources: [source.key] },
      { type: "example", title: "Exemplo", text: "Um exemplo concreto da lição.", sources: [] },
    ],
    relatedConcepts: [{ term: "Conceito", explanation: "Explicação do conceito." }],
  };
  const lessons = [];
  for (const number of [1, 2]) {
    const lesson = await db.lesson.create({
      data: {
        moduleId: mod.id,
        slug: `licao-${number}`,
        number,
        title: `Lição ${number}`,
        objective: "Compreender o conteúdo de teste.",
        minutes: 4,
        currentKeys: [],
        content,
        quiz: QUIZ,
        reviewedOn: "2026-11-21",
        sources: { create: [{ sourceId: source.id, supports: "Sustenta o parágrafo." }] },
      },
    });
    lessons.push(lesson);
  }
  return { module: mod, lessons, source };
}

/** Reads the development outbox written by the mailer when SMTP is not configured. */
export async function readOutbox(): Promise<Array<{ to: string; subject: string; text: string; html: string }>> {
  const file = path.join(process.env.DEV_MAIL_DIR!, "outbox.jsonl");
  try {
    const raw = await readFile(file, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

export async function waitForMail(to: string, subjectPattern: RegExp, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const found = (await readOutbox()).filter((m) => m.to === to && subjectPattern.test(m.subject)).at(-1);
    if (found) return found;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Nenhum e-mail para ${to} com assunto ${subjectPattern}`);
}
