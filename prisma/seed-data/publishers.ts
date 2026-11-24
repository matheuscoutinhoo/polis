export type SeedPublisher = {
  key: string;
  name: string;
  acronym?: string;
  category: string;
  hostnames: string[];
  pathPrefixes?: string[];
  notes?: string;
};

export type MaterialType = "ATO_REGISTRO" | "DADO_ESTATISTICO" | "DECLARACAO" | "ESTUDO" | "CONTEUDO_DIDATICO";
export type ReuseKind = "OFFICIAL_ACT" | "OPEN_LICENSE" | "PUBLIC_DOMAIN" | "REFERENCE_ONLY";

export type SeedSource = {
  key: string;
  publisher: string;
  title: string;
  url: string;
  author?: string | null;
  publishedOn?: string | null;
  sourceUpdatedOn?: string | null;
  locator?: string | null;
  materialType: MaterialType;
  reuseKind: ReuseKind;
  reuseCondition: string;
  scopeNote: string;
  excerpts: Array<{ locator: string; text: string }>;
};

export const ACCESSED_ON = "2026-11-21";

export const REUSE = {
  officialAct:
    "Ato oficial: textos de leis e atos normativos não são objeto de proteção autoral (Lei 9.610/1998, art. 8º, IV). A Polis reproduz trechos identificando o ato.",
  bcb: "O Banco Central permite a reprodução do conteúdo do site, preservada a integridade das informações e citada a fonte.",
  agenciaCamara: "A Câmara autoriza a reprodução das notícias da Agência Câmara com a respectiva assinatura.",
  agenciaSenado: "Reprodução autorizada mediante citação da Agência Senado.",
  ccByNd: "Licença CC BY-ND 3.0 (atribuição, sem obras derivadas). A Polis cita trechos curtos com atribuição e produz explicação própria.",
  ccBy: "Licença CC BY 4.0 (atribuição).",
  referenceOnly:
    "Condição de reutilização não informada. A Polis apenas referencia o material, cita trechos curtos com atribuição (Lei 9.610/1998, art. 46, III) e produz explicação própria.",
  primaryText:
    "Obra hospedada em acervo público; tradução sem licença informada. A Polis apenas referencia e cita trechos curtos com atribuição; a hospedagem não equivale a endosso institucional.",
} as const;

export const PUBLISHERS: SeedPublisher[] = [
  { key: "planalto-legislacao", name: "Presidência da República — Portal da Legislação", acronym: "Planalto", category: "Leis, decretos, atos e decisões", hostnames: ["www.planalto.gov.br"], pathPrefixes: ["/ccivil_03/"] },
  { key: "planalto-noticias", name: "Presidência da República — notícias oficiais", acronym: "Planalto", category: "Declarações e notas oficiais", hostnames: ["www.gov.br"], pathPrefixes: ["/planalto/"] },
  { key: "camara", name: "Câmara dos Deputados", category: "Projetos, tramitação, votações, debates e publicações institucionais", hostnames: ["www.camara.leg.br", "www2.camara.leg.br", "especial.camara.leg.br", "bd.camara.leg.br", "dadosabertos.camara.leg.br"] },
  { key: "senado", name: "Senado Federal", category: "Projetos, tramitação, votações, debates e publicações institucionais", hostnames: ["www12.senado.leg.br", "www25.senado.leg.br", "legis.senado.leg.br", "www2.senado.leg.br"] },
  { key: "senado-ilb", name: "Senado Federal — Instituto Legislativo Brasileiro (Saberes)", acronym: "ILB", category: "Teoria política, instituições e história", hostnames: ["saberes.senado.leg.br"] },
  { key: "congresso", name: "Congresso Nacional", category: "Projetos, vetos e glossários legislativos", hostnames: ["www.congressonacional.leg.br"] },
  { key: "stf", name: "Supremo Tribunal Federal", acronym: "STF", category: "Leis, decretos, atos e decisões", hostnames: ["portal.stf.jus.br", "noticias.stf.jus.br"] },
  {
    key: "tse",
    name: "Tribunal Superior Eleitoral",
    acronym: "TSE",
    category: "Eleições, candidaturas, partidos e resultados",
    hostnames: ["www.tse.jus.br", "dadosabertos.tse.jus.br"],
    notes: "Editor aprovado. O portal bloqueou a verificação automatizada durante a implementação; documentos do TSE só são cadastrados após conferência manual.",
  },
  { key: "bcb", name: "Banco Central do Brasil", acronym: "BC", category: "Indicadores econômicos e sociais", hostnames: ["www.bcb.gov.br"] },
  { key: "ibge", name: "Instituto Brasileiro de Geografia e Estatística", acronym: "IBGE", category: "Indicadores econômicos e sociais", hostnames: ["educa.ibge.gov.br", "www.ibge.gov.br"] },
  { key: "ipea", name: "Instituto de Pesquisa Econômica Aplicada", acronym: "Ipea", category: "Avaliações e estudos de impactos", hostnames: ["www.ipea.gov.br", "repositorio.ipea.gov.br"] },
  { key: "mec", name: "Ministério da Educação", acronym: "MEC", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/mec/"] },
  { key: "mec-dominio-publico", name: "Ministério da Educação — Portal Domínio Público", category: "Teoria política, instituições e história", hostnames: ["www.dominiopublico.gov.br"] },
  { key: "mma", name: "Ministério do Meio Ambiente e Mudança do Clima", acronym: "MMA", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/mma/"] },
  { key: "fazenda", name: "Ministério da Fazenda", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/fazenda/"] },
  { key: "receita", name: "Receita Federal", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/receitafederal/"] },
  { key: "tesouro", name: "Tesouro Nacional", category: "Indicadores econômicos e sociais", hostnames: ["www.gov.br"], pathPrefixes: ["/tesouronacional/"] },
  { key: "secom", name: "Secretaria de Comunicação Social da Presidência da República", acronym: "Secom", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/secom/"] },
  { key: "mjsp", name: "Ministério da Justiça e Segurança Pública", acronym: "MJSP", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/mj/"] },
  { key: "anpd", name: "Agência Nacional de Proteção de Dados", acronym: "ANPD", category: "Comunicação institucional", hostnames: ["www.gov.br"], pathPrefixes: ["/anpd/"] },
  { key: "arquivo-nacional", name: "Arquivo Nacional — Memórias Reveladas", category: "Teoria política, instituições e história", hostnames: ["www.gov.br"], pathPrefixes: ["/memoriasreveladas/"] },
  { key: "cgu-transparencia", name: "Controladoria-Geral da União — Portal da Transparência", acronym: "CGU", category: "Indicadores econômicos e sociais", hostnames: ["portaldatransparencia.gov.br"] },
  { key: "ufmg-periodicos", name: "Universidade Federal de Minas Gerais — Portal de Periódicos", acronym: "UFMG", category: "Teoria política, instituições e história", hostnames: ["periodicos.ufmg.br"] },
  {
    key: "capes-educapes",
    name: "CAPES — Portal eduCAPES (materiais da Universidade Aberta do Brasil)",
    acronym: "CAPES",
    category: "Teoria política, instituições e história",
    hostnames: ["educapes.capes.gov.br"],
    notes: "Repositório público de livros didáticos de universidades públicas. A condição de reutilização é conferida em cada obra.",
  },
  { key: "casa-civil", name: "Casa Civil da Presidência da República", category: "Avaliações e estudos de impactos", hostnames: ["www.gov.br"], pathPrefixes: ["/casacivil/"] },
];
