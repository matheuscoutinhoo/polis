import { z } from "zod";
import { db } from "@/lib/db";
import { checkSourceUrl } from "@/modules/sources/url-policy";

const materialTypes = ["ATO_REGISTRO", "DADO_ESTATISTICO", "DECLARACAO", "ESTUDO", "CONTEUDO_DIDATICO"] as const;
const reuseKinds = ["OFFICIAL_ACT", "OPEN_LICENSE", "PUBLIC_DOMAIN", "REFERENCE_ONLY"] as const;
const partialDate = z
  .string()
  .trim()
  .regex(/^(\d{4}(-\d{2}(-\d{2})?)?)?$/, "Use AAAA, AAAA-MM ou AAAA-MM-DD.")
  .transform((v) => v || null);

export const sourceInputSchema = z.object({
  publisherId: z.string().min(1, "Escolha o órgão ou editor."),
  title: z.string().trim().min(3, "Informe o título.").max(300),
  url: z.string().trim().min(8, "Informe o endereço.").max(2000),
  author: z.string().trim().max(300).transform((v) => v || null),
  publishedOn: partialDate,
  sourceUpdatedOn: partialDate,
  locator: z.string().trim().max(300).transform((v) => v || null),
  materialType: z.enum(materialTypes, { message: "Escolha o tipo de material." }),
  reuseKind: z.enum(reuseKinds, { message: "Escolha a condição de reutilização." }),
  reuseCondition: z.string().trim().min(10, "Descreva a condição de reutilização.").max(600),
  scopeNote: z.string().trim().min(10, "Descreva o que a fonte sustenta e seus limites.").max(800),
  excerptLocator: z.string().trim().max(200),
  excerptText: z.string().trim().max(2000),
});

export const excerptInputSchema = z.object({
  sourceId: z.string().min(1),
  locator: z.string().trim().min(2, "Informe a localização do trecho.").max(200),
  text: z.string().trim().min(10, "Informe o trecho.").max(2000),
});

export class SourceError extends Error {}

function keyFrom(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

/** Creates a source in PENDING review. The URL must belong to the chosen approved publisher. */
export async function createSource(raw: unknown) {
  const input = sourceInputSchema.parse(raw);
  const publishers = await db.publisher.findMany({ select: { id: true, key: true, approved: true, hostnames: true, pathPrefixes: true } });
  const publisher = publishers.find((p) => p.id === input.publisherId);
  if (!publisher || !publisher.approved) throw new SourceError("O órgão ou editor escolhido não está aprovado.");
  const check = checkSourceUrl(input.url, publishers, publisher.key);
  if (!check.ok) throw new SourceError(check.reason);

  const base = keyFrom(input.title) || "fonte";
  let key = base;
  for (let i = 2; await db.source.findUnique({ where: { key }, select: { id: true } }); i++) key = `${base}-${i}`;

  return db.source.create({
    data: {
      key,
      publisherId: publisher.id,
      title: input.title,
      url: check.canonicalUrl,
      author: input.author,
      publishedOn: input.publishedOn,
      sourceUpdatedOn: input.sourceUpdatedOn,
      accessedAt: new Date(),
      locator: input.locator,
      materialType: input.materialType,
      reuseKind: input.reuseKind,
      reuseCondition: input.reuseCondition,
      scopeNote: input.scopeNote,
      reviewStatus: "PENDING",
      excerpts: input.excerptText ? { create: [{ locator: input.excerptLocator || "Trecho", text: input.excerptText }] } : undefined,
    },
  });
}

export async function addExcerpt(raw: unknown) {
  const input = excerptInputSchema.parse(raw);
  return db.sourceExcerpt.create({ data: input });
}

export async function reviewSource(sourceId: string, actor: { id: string; name: string }, decision: "APPROVED" | "REJECTED", reason: string) {
  const source = await db.source.findUnique({ where: { id: sourceId }, include: { publisher: true } });
  if (!source) throw new SourceError("Fonte não encontrada.");
  if (decision === "APPROVED") {
    // Re-check the URL at approval time: publisher approval can change.
    const publishers = await db.publisher.findMany({ select: { key: true, approved: true, hostnames: true, pathPrefixes: true } });
    const check = checkSourceUrl(source.url, publishers, source.publisher.key);
    if (!check.ok) throw new SourceError(check.reason);
  }
  await db.$transaction([
    db.source.update({ where: { id: sourceId }, data: { reviewStatus: decision, reviewedAt: new Date(), reviewedBy: actor.name } }),
    db.moderationAction.create({
      data: { actorId: actor.id, action: decision === "APPROVED" ? "APPROVE_SOURCE" : "REJECT_SOURCE", targetType: "SOURCE", targetId: sourceId, reason },
    }),
  ]);
}

export async function listSourcesForAdmin(status?: "PENDING" | "APPROVED" | "REJECTED") {
  return db.source.findMany({
    where: status ? { reviewStatus: status } : {},
    orderBy: [{ reviewStatus: "asc" }, { updatedAt: "desc" }],
    include: { publisher: { select: { name: true, acronym: true } }, _count: { select: { excerpts: true, eventSources: true, lessonSources: true } } },
  });
}

/** Public catalog: approved publishers and their approved sources. */
export async function listPublicCatalog() {
  return db.publisher.findMany({
    where: { approved: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      key: true,
      name: true,
      acronym: true,
      category: true,
      hostnames: true,
      pathPrefixes: true,
      notes: true,
      sources: {
        where: { reviewStatus: "APPROVED" },
        orderBy: { title: "asc" },
        select: {
          id: true,
          key: true,
          title: true,
          url: true,
          author: true,
          publishedOn: true,
          sourceUpdatedOn: true,
          accessedAt: true,
          locator: true,
          materialType: true,
          reuseKind: true,
          reuseCondition: true,
          scopeNote: true,
        },
      },
    },
  });
}
