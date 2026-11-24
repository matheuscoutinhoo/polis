import { z } from "zod";

// Output contracts sent to the model as strict JSON schemas. Constraints that
// strict mode does not express are validated on the server afterwards.

const refs = z.array(z.string()).describe("IDs de evidência fornecidos pelo sistema (ex.: F1, F2).");

export const eventDraftOutputSchema = z.object({
  centralFactSupported: z.boolean().describe("true somente se o fato central estiver sustentado pelas evidências fornecidas."),
  summary: z.object({ text: z.string(), refs }),
  context: z.object({ text: z.string(), refs }),
  actors: z.array(z.object({ name: z.string(), role: z.string(), refs })),
  status: z.object({ label: z.string(), description: z.string(), refs }),
  timeline: z.array(z.object({ date: z.string().describe("AAAA-MM-DD, AAAA-MM ou AAAA"), label: z.string(), refs })),
  institutions: z.array(z.object({ name: z.string(), role: z.string(), limits: z.string(), refs })),
  concepts: z.array(
    z.object({ term: z.string(), relation: z.string(), lessonId: z.string().describe("ID de lição do catálogo (ex.: L3) ou string vazia"), refs }),
  ),
  impacts: z.array(
    z.object({
      kind: z.enum(["DOCUMENTED", "POSSIBLE"]),
      decision: z.string(),
      change: z.string(),
      group: z.string(),
      conditions: z.string(),
      refs,
    }),
  ),
  arguments: z.array(z.object({ attribution: z.string(), kind: z.enum(["DECLARATION", "INTERPRETATION"]), text: z.string(), refs })),
  uncertainties: z.array(z.object({ text: z.string(), refs })),
  unsupportedPoints: z.array(z.string()).describe("Pontos relevantes que as evidências não sustentam."),
});

export type EventDraftOutput = z.infer<typeof eventDraftOutputSchema>;

export const questionAnswerSchema = z.object({
  status: z.enum(["ANSWERED", "INSUFFICIENT_CONTEXT", "OUT_OF_SCOPE", "DECLINED_RECOMMENDATION"]),
  answer: z.string(),
  citations: z.array(z.object({ ref: z.string(), supports: z.string() })),
  unsupportedPoints: z.array(z.string()),
  missingInformation: z.string(),
});

export type QuestionAnswer = z.infer<typeof questionAnswerSchema>;
