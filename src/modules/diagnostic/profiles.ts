import type { DimensionKey } from "./dimensions";

// Perfis de referência usados apenas para ordenar a trilha. Cada corrente recebe
// uma FAIXA por dimensão (escala −1 a +1), e não um ponto, porque as correntes
// têm variações internas. Dimensões sem posição sustentada pelo acervo ficam
// indefinidas e não entram no cálculo. Interpretação editorial documentada em
// /fontes-e-metodo; não é um teste validado nem uma classificação oficial.

// v3: socialismos e comunismo passaram a ter perfis separados, como no catálogo.
export const PROFILES_VERSION = "2026.11-v3";

export type CurrentKey = "liberalismos" | "conservadorismos" | "social-democracia" | "socialismos" | "comunismo" | "anarquismos" | "libertarianismos";

/**
 * DIRECT: a faixa decorre do que a fonte afirma.
 * EDITORIAL_INFERENCE: a fonte não trata a dimensão diretamente; a Polis
 * explicita a inferência para que possa ser contestada e revisada.
 */
export type RangeSupport = "DIRECT" | "EDITORIAL_INFERENCE";

export type ProfileRange = { min: number; max: number; support: RangeSupport; justification: string };

export type ReferenceProfile = {
  key: CurrentKey;
  name: string;
  editorialOrder: number;
  summary: string;
  interpretation: string;
  variations: string;
  ranges: Partial<Record<DimensionKey, ProfileRange>>;
  undefinedReasons: Partial<Record<DimensionKey, string>>;
  sourceKeys: string[];
};

export const RANGE_SUPPORT_LABEL: Record<RangeSupport, string> = {
  DIRECT: "Sustentação direta no acervo",
  EDITORIAL_INFERENCE: "Inferência editorial explicitada",
};

const NO_POSITION = "O acervo aprovado não indica uma posição característica da corrente nesta dimensão.";

export const REFERENCE_PROFILES: ReferenceProfile[] = [
  {
    key: "liberalismos",
    name: "Liberalismos",
    editorialOrder: 1,
    summary:
      "Correntes que partem do indivíduo e de seus direitos e atribuem ao Estado a função de garantir segurança, liberdade e propriedade, com papel central do mercado na vida econômica.",
    interpretation:
      "Consideramos o núcleo descrito nos livros didáticos do PNAP (Coelho e Salles, 2015; Coelho, 2014), a aproximação entre liberalismo e democracia descrita pelos mesmos autores e os temas da ementa do ILB: liberalismo e democracia, o argumento neoliberal e os direitos individuais.",
    variations:
      "Segundo Silva Júnior (2014), a teoria liberal contemporânea abriga a tensão entre Rawls, que admite corrigir parte das desigualdades, e Nozick, que prioriza a liberdade. Coelho (2014) registra a revisão de paradigmas dentro do próprio pensamento liberal, o predomínio de Keynes no pós-guerra, a oposição de Hayek e Friedman e o renascimento liberal chamado de neoliberalismo.",
    ranges: {
      economia: {
        min: -1,
        max: -0.2,
        support: "DIRECT",
        justification:
          "Coelho e Salles (2015) descrevem a defesa da liberdade e da propriedade individuais, e Coelho (2014) associa o Estado liberal clássico ao Estado mínimo, com as demais dimensões da vida social reguladas pelo mercado. A faixa se aproxima do centro porque, segundo Silva Júnior (2014), Rawls admite corrigir parte das desigualdades dentro da teoria liberal e, segundo Coelho (2014), Keynes, economista formado no pensamento liberal, defendia a intervenção do governo nas recessões.",
      },
      liberdades: {
        min: -1,
        max: -0.4,
        support: "DIRECT",
        justification:
          "Para Coelho e Salles (2015), o liberalismo se funda no jusnaturalismo, que tem o indivíduo por ponto de partida, e cabe ao Estado garantir a segurança, a liberdade e a propriedade dos indivíduos.",
      },
      participacao: {
        min: -0.8,
        max: 0.1,
        support: "EDITORIAL_INFERENCE",
        justification:
          "A ementa do ILB trata de liberalismo e democracia, e o artigo de Simão, Rodovalho e Teodoro (2023) discute a democracia liberal. A Polis interpreta que a tradição descrita se associa à democracia representativa; o acervo não trata diretamente da participação direta.",
      },
    },
    undefinedReasons: {
      costumes: NO_POSITION,
      socioambiental: NO_POSITION,
    },
    sourceKeys: [
      "pnap-ciencia-politica",
      "pnap-estado-governo-mercado",
      "ilb-doutrina-liberalismo",
      "ufal-ciencia-politica-3",
      "ril-240-democracia-liberal-encruzilhada",
      "ril-204-estado-liberal-estado-democratico",
    ],
  },
  {
    key: "conservadorismos",
    name: "Conservadorismos",
    editorialOrder: 2,
    summary:
      "Correntes que valorizam a manutenção de instituições e tradições e sustentam que mudanças sociais, para serem justas e válidas, não devem romper a continuidade entre o passado e o futuro.",
    interpretation:
      "Consideramos a definição apresentada na obra de João Camilo de Oliveira Torres republicada pela Câmara e a leitura de Defina (2023), que associa a Burke a manutenção de instituições e tradições.",
    variations:
      "Segundo Defina (2023), o conservadorismo brasileiro inicial conciliou o liberalismo econômico com a manutenção do sistema escravocrata, diferindo do modelo europeu. O acervo não descreve outras vertentes em detalhe.",
    ranges: {
      costumes: {
        min: -1,
        max: -0.4,
        support: "DIRECT",
        justification:
          "Torres define o conservadorismo pela ideia de que mudanças sociais justas não podem quebrar a continuidade entre o passado e o futuro, e Defina (2023) associa Burke à manutenção de instituições e tradições.",
      },
      participacao: {
        min: -1,
        max: -0.2,
        support: "EDITORIAL_INFERENCE",
        justification:
          "Da ênfase na manutenção de instituições e na continuidade, a Polis infere preferência por mudanças conduzidas pelas instituições estabelecidas, e não por rupturas ou decisões diretas frequentes.",
      },
      economia: {
        min: -0.8,
        max: 0.2,
        support: "EDITORIAL_INFERENCE",
        justification:
          "No caso brasileiro estudado por Defina (2023), o conservadorismo inicial conciliou-se com o liberalismo econômico. A faixa é ampla porque o acervo não descreve uma posição econômica geral da corrente.",
      },
    },
    undefinedReasons: {
      liberdades: "O acervo aprovado não descreve como a corrente equilibra liberdades individuais e autoridade.",
      socioambiental: NO_POSITION,
    },
    sourceKeys: ["camara-bd-torres-construtores-imperio", "ufmg-temporalidades-pensamento-conservador", "pnap-ciencia-politica"],
  },
  {
    key: "social-democracia",
    name: "Social-democracia",
    editorialOrder: 3,
    summary:
      "Corrente associada, no acervo, ao Estado de bem-estar social, que intervém por meio de políticas públicas no mercado para assegurar um patamar mínimo de igualdade social e de bem-estar.",
    interpretation:
      "Consideramos o Estado de bem-estar social descrito por Coelho (2014), que registra governos sociais-democratas entre os que o construíram no pós-guerra, e os temas das ementas do ILB: histórico, bases materiais do compromisso social-democrata, razões de sua crise e a chamada Terceira Via.",
    variations:
      "A ementa do ILB sobre novas esquerdas trata da Terceira Via e da relação entre esquerda e direita hoje; O acervo não detalha as diferenças entre as vertentes.",
    ranges: {
      economia: {
        min: 0.2,
        max: 0.8,
        support: "DIRECT",
        justification:
          "Coelho (2014) descreve o Estado de bem-estar social intervindo por meio de políticas públicas no mercado para assegurar um patamar mínimo de igualdade social e de bem-estar, e cita os governos sociais-democratas escandinavos e alemão entre os que, no pós-guerra, intervieram fortemente na economia e criaram sistemas de proteção social abrangentes. A intervenção ocorre no mercado, sem substituí-lo, por isso a faixa não chega ao extremo.",
      },
      liberdades: {
        min: -0.8,
        max: 0,
        support: "EDITORIAL_INFERENCE",
        justification:
          "Coelho (2014) apresenta o Estado de bem-estar social como sucessor do Estado liberal, e Moraes (2014) organiza a trajetória do Estado Liberal ao Estado Democrático de Direito. A Polis interpreta que as garantias individuais permanecem nessa trajetória.",
      },
      participacao: {
        min: -0.6,
        max: 0.4,
        support: "EDITORIAL_INFERENCE",
        justification:
          "A ementa do ILB trata de um compromisso social-democrata. A Polis interpreta que a corrente atua pelas instituições representativas, com espaço para negociação entre grupos sociais; o acervo não detalha esse ponto.",
      },
    },
    undefinedReasons: {
      costumes: NO_POSITION,
      socioambiental: NO_POSITION,
    },
    sourceKeys: [
      "pnap-estado-governo-mercado",
      "ilb-doutrina-social-democracia",
      "ilb-doutrina-novas-esquerdas",
      "ril-204-estado-liberal-estado-democratico",
      "ril-238-cultura-politica-esquerda",
    ],
  },
  {
    key: "socialismos",
    name: "Socialismos",
    editorialOrder: 4,
    summary:
      "Correntes que propõem superar a propriedade privada dos meios de produção e as divisões de classe. No pensamento de Marx, o socialismo é a fase de transição para o comunismo; no século XX, deu nome a Estados com controle estatal da produção.",
    interpretation:
      "Consideramos o resumo do pensamento de Marx por Coelho e Salles (2015), com o socialismo como fase transitória e o fim da propriedade privada dos meios de produção, a descrição do Estado socialista do século XX por Coelho (2014) e a distinção, na ementa do ILB, entre a utopia socialista e o socialismo real.",
    variations:
      "Marx distinguia o seu socialismo científico do socialismo utópico de outros filósofos, e a ementa do ILB separa a proposta das experiências históricas. O acervo não descreve socialismos que se apresentam como democráticos; por isso a dimensão de participação fica indefinida.",
    ranges: {
      economia: {
        min: 0.6,
        max: 1,
        support: "DIRECT",
        justification:
          "Coelho e Salles (2015) descrevem o fim da propriedade privada dos meios de produção como etapa da construção do socialismo, e Coelho (2014) aponta o controle estatal de todo o processo produtivo como primeira característica do Estado socialista.",
      },
      liberdades: {
        min: 0,
        max: 0.8,
        support: "EDITORIAL_INFERENCE",
        justification:
          "Coelho (2014) descreve os Estados socialistas do século XX como orientados mais pela igualdade social do que pela liberdade individual, com punição de toda discordância em relação ao partido, e Coelho e Salles (2015) registram que, na fase socialista, o proletariado usaria toda a força do Estado. A faixa começa no centro porque, segundo os mesmos autores, Marx não propunha com a palavra ditadura um governo mais duro ou autoritário que os de seu tempo.",
      },
    },
    undefinedReasons: {
      participacao:
        "O acervo descreve a proposta de um partido operário que toma o poder do Estado e Estados socialistas dirigidos por um único partido, mas não descreve socialismos que se apresentam como democráticos; não permite situar as vertentes de forma uniforme.",
      costumes: "O acervo aprovado não descreve a posição das vertentes socialistas sobre costumes e tradições.",
      socioambiental: NO_POSITION,
    },
    sourceKeys: ["pnap-ciencia-politica", "pnap-estado-governo-mercado", "ilb-doutrina-socialismo"],
  },
  {
    key: "comunismo",
    name: "Comunismo",
    editorialOrder: 5,
    summary:
      "Corrente que, no Manifesto de 1848, propõe abolir a propriedade burguesa e, no pensamento de Marx, projeta uma sociedade sem classes e sem Estado. No século XX, deu nome a partidos e a regimes de partido único.",
    interpretation:
      "Consideramos a proposta do Manifesto Comunista (abolição da propriedade burguesa e centralização dos instrumentos de produção nas mãos do Estado), a sociedade sem classes e sem Estado descrita por Coelho e Salles (2015) e a descrição dos partidos e regimes comunistas do século XX por Coelho (2014) e por Coelho e Salles (2015).",
    variations:
      "Coelho (2014) distingue a orientação leninista, que rejeitava a democracia, do eurocomunismo, que declarou fidelidade às instituições democráticas. Por essa divergência e pela distância entre o horizonte sem Estado e os regimes de partido único, a dimensão de participação fica indefinida.",
    ranges: {
      economia: {
        min: 0.8,
        max: 1,
        support: "DIRECT",
        justification:
          "O Manifesto propõe a abolição da propriedade burguesa e a centralização de todos os instrumentos de produção nas mãos do Estado; segundo Coelho e Salles (2015), nas revoluções comunistas o objetivo primeiro era acabar com a propriedade privada.",
      },
      costumes: {
        min: 0,
        max: 1,
        support: "EDITORIAL_INFERENCE",
        justification:
          "O Manifesto critica instituições sociais de sua época, como a família burguesa, que associa ao capital. A faixa é ampla porque o acervo não descreve a posição dos partidos e regimes comunistas sobre costumes.",
      },
      liberdades: {
        min: 0,
        max: 1,
        support: "EDITORIAL_INFERENCE",
        justification:
          "Coelho e Salles (2015) classificam os regimes comunistas do século XX como totalitários, com partido único e terror de Estado, e Coelho (2014) registra que, com Lênin, a ditadura do proletariado ganhou um significado mais forte. A faixa começa no centro porque o eurocomunismo declarou fidelidade às instituições democráticas e porque o horizonte descrito por Marx é uma sociedade sem Estado.",
      },
    },
    undefinedReasons: {
      participacao:
        "O horizonte descrito por Marx é uma sociedade sem Estado, enquanto os regimes do século XX foram de partido único; o acervo não permite situar a corrente de forma uniforme entre representação e participação direta.",
      socioambiental: NO_POSITION,
    },
    sourceKeys: ["dominiopublico-manifesto-comunista", "pnap-ciencia-politica", "pnap-estado-governo-mercado"],
  },
  {
    key: "anarquismos",
    name: "Anarquismos",
    editorialOrder: 6,
    summary:
      "Correntes que rejeitam a autoridade do Estado e outras autoridades impostas. Em Deus e o Estado, Bakunin aceita apenas a autoridade que considera racional e conforme à liberdade humana.",
    interpretation:
      "Consideramos a posição defendida por Bakunin em Deus e o Estado e o estudo histórico sobre a experiência anarquista no movimento operário brasileiro (greves de 1917).",
    variations:
      "O acervo cobre a vertente de Bakunin, um estudo histórico brasileiro e menções em livro didático à força dos sindicatos anarquistas nos anos 1910; não descreve as demais vertentes. A defesa de mercado sem Estado não tem fonte no acervo.",
    ranges: {
      liberdades: {
        min: -1,
        max: -0.6,
        support: "DIRECT",
        justification:
          "Em Deus e o Estado, Bakunin declara mentirosas, arbitrárias e funestas as autoridades que não sejam racionais e conformes à liberdade humana.",
      },
      participacao: {
        min: 0.5,
        max: 1,
        support: "EDITORIAL_INFERENCE",
        justification:
          "Bakunin rejeita a organização, a direção e a legislação políticas que emanam do soberano ou de um parlamento eleito. A Polis interpreta essa posição como distante da representação e próxima do poder distribuído.",
      },
    },
    undefinedReasons: {
      economia: "O acervo aprovado não documenta a posição econômica das vertentes anarquistas.",
      costumes: NO_POSITION,
      socioambiental: NO_POSITION,
    },
    sourceKeys: ["dominiopublico-bakunin-deus-e-o-estado", "camara-bd-mendes-anarquismo-1917"],
  },
  {
    key: "libertarianismos",
    name: "Libertarianismos",
    editorialOrder: 7,
    summary:
      "Correntes que dão prioridade à liberdade individual e adotam uma concepção de justiça segundo a qual o Estado só pode atuar de forma corretiva.",
    interpretation:
      "Consideramos a concepção libertária de justiça resumida por Rocha e Galuppo (2016) e a posição de Nozick apresentada por Silva Júnior (2014).",
    variations:
      "Rocha e Galuppo (2016) discutem o chamado paternalismo libertário. O acervo não descreve outras vertentes, como a que propõe eliminar o Estado.",
    ranges: {
      economia: {
        min: -1,
        max: -0.6,
        support: "DIRECT",
        justification:
          "Segundo Silva Júnior (2014), Nozick condiciona a distribuição do que é produzido ao valor que as pessoas atribuem às ações e aos serviços de cada um e vê a tributação para fins distributivos como obrigar pessoas a trabalhar sem remuneração; Rocha e Galuppo (2016) descrevem um Estado que só atua de forma corretiva.",
      },
      liberdades: {
        min: -1,
        max: -0.5,
        support: "DIRECT",
        justification: "Segundo Silva Júnior (2014), para Nozick a sociedade ideal maximiza a liberdade de seus membros.",
      },
    },
    undefinedReasons: {
      costumes: NO_POSITION,
      participacao: NO_POSITION,
      socioambiental: NO_POSITION,
    },
    sourceKeys: ["ril-210-paternalismo-libertario", "ufal-ciencia-politica-3", "pnap-estado-governo-mercado"],
  },
];

export const PROFILE_BY_KEY = Object.fromEntries(REFERENCE_PROFILES.map((p) => [p.key, p])) as Record<CurrentKey, ReferenceProfile>;
