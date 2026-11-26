import { DEFAULT_FORUM_RULES, type ForumCategoryKey } from "../../src/modules/community/rules";

export type SeedForum = {
  slug: string;
  title: string;
  description: string;
  category: ForumCategoryKey;
  rules: string;
  /** Optional link to a seeded event (by slug). */
  eventSlug?: string;
};

// Initial official forums. They start empty: no fictitious users or activity.
export const OFFICIAL_FORUMS: SeedForum[] = [
  {
    slug: "duvidas-sobre-as-licoes",
    title: "Dúvidas sobre as lições",
    description:
      "Espaço para perguntar sobre conceitos das lições, pedir exemplos e indicar trechos que ficaram difíceis de entender. Para apontar erros no conteúdo, use também “Sinalizar problema” na própria lição.",
    category: "APRENDIZADO",
    rules: DEFAULT_FORUM_RULES,
  },
  {
    slug: "correntes-politicas-em-comparacao",
    title: "Correntes políticas em comparação",
    description:
      "Discussão sobre semelhanças, diferenças e variações entre liberalismos, conservadorismos, social-democracia, socialismos, comunismo, anarquismos e libertarianismos. Apresente argumentos e fontes; o objetivo é compreender, não converter.",
    category: "CORRENTES",
    rules: `${DEFAULT_FORUM_RULES}\nAo descrever uma corrente, diferencie o que seus autores defendem do que críticos afirmam sobre ela.`,
  },
  {
    slug: "temas-transversais",
    title: "Temas transversais: ambiente, nação e participação",
    description:
      "Conversas sobre temas que atravessam várias correntes, como ambientalismo, nacionalismo, populismo e progressismo, e sobre como esses termos são usados no debate público.",
    category: "IDEIAS",
    rules: DEFAULT_FORUM_RULES,
  },
  {
    slug: "instituicoes-brasileiras",
    title: "Instituições brasileiras",
    description:
      "Perguntas e debates sobre o funcionamento dos Poderes, da Federação, do processo legislativo, das eleições e dos partidos. Indique o artigo da Constituição ou a página oficial quando possível.",
    category: "INSTITUICOES",
    rules: DEFAULT_FORUM_RULES,
  },
  {
    slug: "acontecimentos-em-debate",
    title: "Acontecimentos em debate",
    description:
      "Discussão geral sobre acontecimentos políticos brasileiros explicados na Polis. Separe fatos documentados, interpretações e expectativas, e indique de onde vêm os dados.",
    category: "ACONTECIMENTOS",
    rules: `${DEFAULT_FORUM_RULES}\nAo comentar impactos, diga se eles estão documentados ou se são efeitos possíveis.`,
  },
  {
    slug: "imposto-de-renda-lei-15270",
    title: "Imposto de Renda: isenção até R$ 5 mil e tributação mínima (Lei 15.270/2025)",
    description: "Fórum ligado ao acontecimento sobre a Lei 15.270/2025: regras, efeitos documentados, estimativas divergentes e ações no STF.",
    category: "ACONTECIMENTOS",
    rules: DEFAULT_FORUM_RULES,
    eventSlug: "lei-15270-ir-isencao-ate-5-mil",
  },
  {
    slug: "celulares-nas-escolas-lei-15100",
    title: "Celulares nas escolas (Lei 15.100/2025)",
    description: "Fórum ligado ao acontecimento sobre a restrição ao uso de aparelhos eletrônicos por estudantes da educação básica.",
    category: "ACONTECIMENTOS",
    rules: DEFAULT_FORUM_RULES,
    eventSlug: "lei-15100-celulares-escolas",
  },
  {
    slug: "licenciamento-ambiental-lei-15190",
    title: "Licenciamento ambiental (Lei 15.190/2025)",
    description: "Fórum ligado ao acontecimento sobre a Lei Geral do Licenciamento Ambiental, os vetos e a análise dos vetos pelo Congresso.",
    category: "ACONTECIMENTOS",
    rules: DEFAULT_FORUM_RULES,
    eventSlug: "lei-15190-licenciamento-ambiental-vetos",
  },
  {
    slug: "eca-digital-lei-15211",
    title: "Proteção de crianças e adolescentes em ambientes digitais (Lei 15.211/2025)",
    description: "Fórum ligado ao acontecimento sobre o chamado ECA Digital: obrigações de serviços digitais, vigência e regulamentação.",
    category: "ACONTECIMENTOS",
    rules: DEFAULT_FORUM_RULES,
    eventSlug: "lei-15211-eca-digital",
  },
  {
    slug: "eleicoes-gerais-2026",
    title: "Eleições gerais de 2026",
    description: "Fórum ligado ao acontecimento sobre as eleições de 2026: calendário, apuração, decisões da Justiça Eleitoral e do STF e declarações de candidaturas.",
    category: "ACONTECIMENTOS",
    rules: `${DEFAULT_FORUM_RULES}\nEste não é um espaço de campanha: pedidos de voto e propaganda serão removidos.`,
    eventSlug: "eleicoes-gerais-2026",
  },
];
