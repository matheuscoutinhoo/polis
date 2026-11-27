// Dimensões iniciais do questionário. São uma modelagem editorial do produto,
// não uma classificação científica definitiva (ver /fontes-e-metodo).

export type DimensionKey = "economia" | "liberdades" | "costumes" | "participacao" | "socioambiental";

export type Dimension = {
  key: DimensionKey;
  block: number;
  title: string;
  shortTitle: string;
  /** Polo associado a valores negativos (−1). */
  negativePole: string;
  /** Polo associado a valores positivos (+1). */
  positivePole: string;
  /** Nomes curtos dos polos, para contagens e legendas. */
  negativeShort: string;
  positiveShort: string;
  description: string;
  overlaps: string;
};

export const DIMENSIONS: Dimension[] = [
  {
    key: "economia",
    block: 1,
    title: "Economia, mercado e redistribuição",
    shortTitle: "Economia",
    negativePole: "Ênfase no mercado e na iniciativa privada",
    positivePole: "Ênfase na redistribuição e na ação pública",
    negativeShort: "mercado",
    positiveShort: "redistribuição",
    description:
      "Como você pondera concorrência, iniciativa privada e equilíbrio das contas públicas em relação a tributos, serviços públicos e proteção social.",
    overlaps:
      "Situações sobre tributos ambientais ou licença-parental também envolvem custos econômicos, mas foram classificadas nas dimensões socioambiental e de costumes.",
  },
  {
    key: "liberdades",
    block: 2,
    title: "Liberdades civis e exercício da autoridade",
    shortTitle: "Liberdades e autoridade",
    negativePole: "Ênfase nas liberdades e garantias individuais",
    positivePole: "Ênfase na autoridade e na ordem pública",
    negativeShort: "liberdades",
    positiveShort: "autoridade",
    description:
      "Como você equilibra privacidade, liberdade de expressão e garantias contra o poder do Estado com segurança, prevenção e ordem.",
    overlaps:
      "Decisões sobre o próprio corpo e sobre informação falsa também tocam costumes e participação política; aqui elas medem o limite da autoridade.",
  },
  {
    key: "costumes",
    block: 3,
    title: "Costumes, tradição e mudança social",
    shortTitle: "Costumes",
    negativePole: "Ênfase na preservação de tradições",
    positivePole: "Ênfase na mudança de costumes",
    negativeShort: "tradição",
    positiveShort: "mudança",
    description:
      "Como você vê a preservação de tradições, valores familiares e religiosos na vida pública em relação a mudanças nos costumes.",
    overlaps:
      "Vários temas de costumes também envolvem liberdade individual ou custos econômicos. Uma mesma pessoa pode valorizar tradições e liberdades ao mesmo tempo.",
  },
  {
    key: "participacao",
    block: 4,
    title: "Participação política e organização do poder",
    shortTitle: "Participação e poder",
    negativePole: "Ênfase na representação e em instituições estáveis",
    positivePole: "Ênfase na participação direta e no poder distribuído",
    negativeShort: "representação",
    positiveShort: "participação direta",
    description:
      "Como você prefere que decisões coletivas sejam tomadas: por representantes eleitos, órgãos técnicos e contrapesos estáveis, ou com mais participação direta e descentralização.",
    overlaps:
      "Descentralizar serviços também tem efeitos econômicos; o controle de leis por tribunais também envolve a proteção de direitos.",
  },
  {
    key: "socioambiental",
    block: 5,
    title: "Desenvolvimento e prioridades socioambientais",
    shortTitle: "Desenvolvimento e ambiente",
    negativePole: "Ênfase na expansão produtiva",
    positivePole: "Ênfase na proteção socioambiental",
    negativeShort: "expansão produtiva",
    positiveShort: "proteção",
    description:
      "Como você pondera crescimento, empregos e infraestrutura em relação à proteção ambiental e aos direitos de comunidades afetadas.",
    overlaps:
      "Quase todas as situações desta dimensão envolvem custos econômicos; a resposta indica qual prioridade você adotaria quando eles entram em conflito.",
  },
];

export const DIMENSION_BY_KEY = Object.fromEntries(DIMENSIONS.map((d) => [d.key, d])) as Record<DimensionKey, Dimension>;
