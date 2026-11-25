import { describe, expect, it } from "vitest";
import { previewBlocks, unverifiedQuotes, type LessonBlock } from "@/modules/learning/content";

const excerpts = new Map([
  [
    "cf88-art30",
    [{ locator: "art. 30, I e V", text: "Art. 30. Compete aos Municípios: I - legislar sobre assuntos de interesse local; V - organizar e prestar os serviços públicos de interesse local." }],
  ],
]);

function lesson(quote: { text: string; locator: string; sourceKey?: string }) {
  return {
    intro: "Introdução suficiente para o esquema da lição.",
    blocks: [
      { type: "heading", text: "Seção" },
      { type: "paragraph", text: "Parágrafo com texto suficiente.", sources: ["cf88-art30"] },
      { type: "quote", sourceKey: quote.sourceKey ?? "cf88-art30", text: quote.text, locator: quote.locator },
    ],
    relatedConcepts: [{ term: "Município", explanation: "Ente da Federação com autonomia." }],
  };
}

describe("citações literais nas lições", () => {
  it("aceita um trecho copiado do excerto cadastrado, com localização mais precisa do mesmo artigo", () => {
    expect(unverifiedQuotes(lesson({ text: "V - organizar e prestar os serviços públicos de interesse local.", locator: "art. 30, V" }), excerpts)).toEqual([]);
  });

  it("recusa texto alterado, mesmo que parecido", () => {
    const problems = unverifiedQuotes(lesson({ text: "V - organizar e prestar todos os serviços públicos locais.", locator: "art. 30, V" }), excerpts);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toMatch(/não encontrada literalmente/);
  });

  it("recusa citação atribuída a fonte sem o trecho ou a outro artigo", () => {
    expect(unverifiedQuotes(lesson({ text: "I - legislar sobre assuntos de interesse local;", locator: "art. 30, I", sourceKey: "cf88-art31" }), excerpts)).toHaveLength(1);
    expect(unverifiedQuotes(lesson({ text: "I - legislar sobre assuntos de interesse local;", locator: "art. 31" }), excerpts)[0]).toMatch(/localização diferente/);
  });
});

describe("prévia das lições para quem não tem conta", () => {
  const heading = (text: string): LessonBlock => ({ type: "heading", text });
  const paragraph = (text: string): LessonBlock => ({ type: "paragraph", text, sources: [] });

  it("mostra só a primeira seção", () => {
    const blocks = [heading("Primeira seção"), paragraph("Texto da primeira seção."), heading("Segunda seção"), paragraph("Texto da segunda seção.")];
    expect(previewBlocks(blocks)).toEqual(blocks.slice(0, 2));
  });

  it("termina no primeiro título quando a lição começa sem título", () => {
    const blocks = [paragraph("Abertura sem título."), heading("Primeira seção"), paragraph("Texto da primeira seção.")];
    expect(previewBlocks(blocks)).toEqual(blocks.slice(0, 1));
  });

  it("limita o tamanho da prévia quando a primeira seção é longa", () => {
    const blocks = [heading("Seção longa"), paragraph("Primeiro parágrafo."), paragraph("Segundo parágrafo."), paragraph("Terceiro parágrafo.")];
    expect(previewBlocks(blocks, 3)).toEqual(blocks.slice(0, 3));
  });
});
