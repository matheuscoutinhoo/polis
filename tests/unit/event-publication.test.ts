import { describe, expect, it } from "vitest";
import { EMPTY_EVENT_CONTENT, checkEventPublication, publicEventContent, type EventContent } from "@/modules/events/content";

const valid = new Set(["lei-x", "agencia-y"]);

function baseContent(): EventContent {
  return {
    ...EMPTY_EVENT_CONTENT,
    summary: { text: "Foi sancionada a Lei X.", sources: ["lei-x"] },
    context: { text: "Contexto.", sources: ["agencia-y"] },
    status: { label: "Em vigor", description: "A lei está em vigor.", asOf: "2026-11-21", sources: ["lei-x"] },
    timeline: [{ date: "2025-01-13", label: "Sancionada", sources: ["lei-x"] }],
    impacts: [
      { kind: "DOCUMENTED", decision: "Lei X", change: "Muda algo", group: "Estudantes", conditions: "Com exceções", sources: ["lei-x"] },
      { kind: "POSSIBLE", decision: "Lei X", change: "Pode mudar outra coisa", group: "Empresas", conditions: "Depende de regulamentação", sources: [] },
    ],
  };
}

describe("event publication gate", () => {
  it("allows publication when central facts are supported and omits unsupported secondary items", () => {
    const check = checkEventPublication(baseContent(), valid);
    expect(check.publishable).toBe(true);
    expect(check.omitted).toEqual([{ section: "impacts", index: 1, reason: expect.any(String) }]);
    const view = publicEventContent(baseContent(), valid);
    expect(view.impacts).toHaveLength(1);
    expect(view.limitations.at(-1)).toMatch(/omitidos/);
  });

  it("blocks publication when the central fact has no approved evidence", () => {
    const content = baseContent();
    content.summary.sources = [];
    const check = checkEventPublication(content, valid);
    expect(check.publishable).toBe(false);
    expect(check.blocking.join(" ")).toMatch(/fato central/i);
  });

  it("blocks references that are not approved or not attached to the event", () => {
    const content = baseContent();
    content.arguments = [{ attribution: "Ator", kind: "DECLARATION", text: "Declarou algo.", sources: ["fonte-inventada"] }];
    const check = checkEventPublication(content, valid);
    expect(check.publishable).toBe(false);
    expect(check.invalidReferences).toEqual(["fonte-inventada"]);
  });

  it("rejects malformed content", () => {
    expect(checkEventPublication({ summary: "texto solto" }, valid).publishable).toBe(false);
  });
});
