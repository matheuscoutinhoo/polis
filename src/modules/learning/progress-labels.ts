// Client-safe labels (no server imports).
export const ACHIEVEMENTS = {
  "primeira-licao": { title: "Primeira lição", description: "Concluiu a primeira lição." },
  "fundamentos-em-comum": { title: "Fundamentos em comum", description: "Concluiu todas as lições de fundamentos." },
  "outras-perspectivas": { title: "Outras perspectivas", description: "Concluiu lições sobre pelo menos três correntes diferentes." },
  "leitura-critica": { title: "Leitura crítica", description: "Concluiu o módulo de leitura crítica." },
} as const;

export type AchievementKey = keyof typeof ACHIEVEMENTS;
