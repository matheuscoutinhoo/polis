import type { z } from "zod";
import type { lessonContentSchema, quizSchema } from "../../../src/modules/learning/content";

export type SeedLesson = {
  slug: string;
  number: number;
  title: string;
  objective: string;
  /** Approximate reading + interaction time (3 to 7 minutes). */
  minutes: number;
  /** Reference currents covered (used only to order the path by affinity). */
  currentKeys: string[];
  content: z.input<typeof lessonContentSchema>;
  quiz: z.input<typeof quizSchema>;
  /** Every source key cited in the content must be listed here, with what it supports. */
  sources: Array<{ key: string; supports: string }>;
  /** Editorial review date, when later than ACCESSED_ON. */
  reviewedOn?: string;
  /** Where the lesson was published before a reorganization; the seed moves that row so progress is kept. */
  previous?: { module: string; lesson: string };
};

export type SeedModule = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  area: "FUNDAMENTOS" | "INSTITUICOES" | "IDEIAS" | "LEITURA_CRITICA";
  stage: "FOUNDATIONS" | "PERSPECTIVES" | "CONTEXT";
  status: "PUBLISHED" | "DOCUMENTARY_GAP";
  /** Required when status is DOCUMENTARY_GAP: what is missing and why. */
  gapNote?: string;
  lessons: SeedLesson[];
};
