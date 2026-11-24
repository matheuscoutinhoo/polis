import { REUSE, type SeedSource } from "./publishers";

const CF_URL = "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm";
const CF_TITLE = "Constituição da República Federativa do Brasil de 1988";

function cf(article: string, anchor: string, scopeNote: string, excerpts: Array<{ locator: string; text: string }>): SeedSource {
  return {
    key: `cf88-art${article}`,
    publisher: "planalto-legislacao",
    title: `${CF_TITLE} · Art. ${article}`,
    url: `${CF_URL}#${anchor}`,
    author: "Assembleia Nacional Constituinte",
    publishedOn: "1988-10-05",
    locator: `art. ${article}`,
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote,
    excerpts,
  };
}

export const LEGAL_SOURCES: SeedSource[] = [
  cf("1", "art1", "Identifica os fundamentos da República e a origem popular do poder. Não descreve como cada fundamento é aplicado em políticas concretas.", [
    {
      locator: "art. 1º, caput e incisos",
      text: "Art. 1º A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos: I - a soberania; II - a cidadania; III - a dignidade da pessoa humana; IV - os valores sociais do trabalho e da livre iniciativa; V - o pluralismo político.",
    },
    { locator: "art. 1º, parágrafo único", text: "Parágrafo único. Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição." },
  ]),
  cf("2", "art2", "Estabelece os três Poderes da União. Não detalha as competências de cada um.", [
    { locator: "art. 2º", text: "Art. 2º São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário." },
  ]),
  cf("3", "art3", "Lista os objetivos fundamentais da República. Objetivos constitucionais orientam políticas, mas não indicam por si só quais medidas os alcançam.", [
    {
      locator: "art. 3º",
      text: "Art. 3º Constituem objetivos fundamentais da República Federativa do Brasil: I - construir uma sociedade livre, justa e solidária; II - garantir o desenvolvimento nacional; III - erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; IV - promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.",
    },
  ]),
  cf("5", "art5", "Lista direitos e garantias individuais. Os trechos selecionados não esgotam o artigo, que tem dezenas de incisos.", [
    {
      locator: "art. 5º, caput",
      text: "Art. 5º Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade, nos termos seguintes:",
    },
    { locator: "art. 5º, IV", text: "IV - é livre a manifestação do pensamento, sendo vedado o anonimato;" },
    {
      locator: "art. 5º, VI",
      text: "VI - é inviolável a liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e garantida, na forma da lei, a proteção aos locais de culto e a suas liturgias;",
    },
    {
      locator: "art. 5º, XVI",
      text: "XVI - todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio aviso à autoridade competente;",
    },
    { locator: "art. 5º, XXII e XXIII", text: "XXII - é garantido o direito de propriedade; XXIII - a propriedade atenderá a sua função social;" },
  ]),
  cf("6", "art6", "Lista os direitos sociais. Não define como cada direito deve ser financiado ou prestado.", [
    {
      locator: "art. 6º, caput",
      text: "Art. 6º São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, a assistência aos desamparados, na forma desta Constituição.",
    },
  ]),
  cf("14", "art14", "Define as formas de exercício da soberania popular e a obrigatoriedade do voto. Regras detalhadas de eleições estão em lei.", [
    {
      locator: "art. 14, caput",
      text: "Art. 14. A soberania popular será exercida pelo sufrágio universal e pelo voto direto e secreto, com valor igual para todos, e, nos termos da lei, mediante: I - plebiscito; II - referendo; III - iniciativa popular.",
    },
    {
      locator: "art. 14, § 1º",
      text: "§ 1º O alistamento eleitoral e o voto são: I - obrigatórios para os maiores de dezoito anos; II - facultativos para: a) os analfabetos; b) os maiores de setenta anos; c) os maiores de dezesseis e menores de dezoito anos.",
    },
  ]),
  cf("17", "art17", "Estabelece a liberdade de criação de partidos e seus limites. Não trata do programa ou da ideologia de partidos específicos.", [
    {
      locator: "art. 17, caput",
      text: "Art. 17. É livre a criação, fusão, incorporação e extinção de partidos políticos, resguardados a soberania nacional, o regime democrático, o pluripartidarismo, os direitos fundamentais da pessoa humana e observados os seguintes preceitos: I - caráter nacional; II - proibição de recebimento de recursos financeiros de entidade ou governo estrangeiros ou de subordinação a estes; III - prestação de contas à Justiça Eleitoral; IV - funcionamento parlamentar de acordo com a lei.",
    },
  ]),
  cf("18", "art18", "Identifica as esferas da organização brasileira. Não sustenta previsões sobre impactos de uma proposta.", [
    {
      locator: "art. 18, caput",
      text: "Art. 18. A organização político-administrativa da República Federativa do Brasil compreende a União, os Estados, o Distrito Federal e os Municípios, todos autônomos, nos termos desta Constituição.",
    },
  ]),
  cf("21", "art21", "Lista competências exclusivas da União. Os trechos selecionados não esgotam o artigo.", [
    {
      locator: "art. 21, I a III",
      text: "Art. 21. Compete à União: I - manter relações com Estados estrangeiros e participar de organizações internacionais; II - declarar a guerra e celebrar a paz; III - assegurar a defesa nacional;",
    },
  ]),
  cf("23", "art23", "Lista competências comuns aos entes federativos. Não define a divisão de recursos entre eles.", [
    {
      locator: "art. 23, I e II",
      text: "Art. 23. É competência comum da União, dos Estados, do Distrito Federal e dos Municípios: I - zelar pela guarda da Constituição, das leis e das instituições democráticas e conservar o patrimônio público; II - cuidar da saúde e assistência pública, da proteção e garantia das pessoas portadoras de deficiência;",
    },
  ]),
  cf("30", "art30", "Lista competências dos municípios. Os trechos selecionados não esgotam o artigo.", [
    {
      locator: "art. 30, I e V",
      text: "Art. 30. Compete aos Municípios: I - legislar sobre assuntos de interesse local; [...] V - organizar e prestar, diretamente ou sob regime de concessão ou permissão, os serviços públicos de interesse local, incluído o de transporte coletivo, que tem caráter essencial;",
    },
  ]),
  cf("60", "art60", "Define limites para emendas constitucionais (cláusulas pétreas). Não trata do procedimento completo de votação.", [
    {
      locator: "art. 60, § 4º",
      text: "§ 4º Não será objeto de deliberação a proposta de emenda tendente a abolir: I - a forma federativa de Estado; II - o voto direto, secreto, universal e periódico; III - a separação dos Poderes; IV - os direitos e garantias individuais.",
    },
  ]),
  cf("44", "art44", "Define a composição do Congresso Nacional.", [
    { locator: "art. 44", text: "Art. 44. O Poder Legislativo é exercido pelo Congresso Nacional, que se compõe da Câmara dos Deputados e do Senado Federal. Parágrafo único. Cada legislatura terá a duração de quatro anos." },
  ]),
  cf("45", "art45", "Define a forma de eleição dos deputados federais.", [
    { locator: "art. 45, caput", text: "Art. 45. A Câmara dos Deputados compõe-se de representantes do povo, eleitos, pelo sistema proporcional, em cada Estado, em cada Território e no Distrito Federal." },
  ]),
  cf("46", "art46", "Define a forma de eleição e o mandato dos senadores.", [
    {
      locator: "art. 46, caput e § 1º",
      text: "Art. 46. O Senado Federal compõe-se de representantes dos Estados e do Distrito Federal, eleitos segundo o princípio majoritário. § 1º Cada Estado e o Distrito Federal elegerão três Senadores, com mandato de oito anos.",
    },
  ]),
  cf("59", "art59", "Lista os tipos de normas do processo legislativo.", [
    {
      locator: "art. 59",
      text: "Art. 59. O processo legislativo compreende a elaboração de: I - emendas à Constituição; II - leis complementares; III - leis ordinárias; IV - leis delegadas; V - medidas provisórias; VI - decretos legislativos; VII - resoluções.",
    },
  ]),
  cf("61", "art61", "Define quem pode propor leis, inclusive a iniciativa popular.", [
    {
      locator: "art. 61, caput",
      text: "Art. 61. A iniciativa das leis complementares e ordinárias cabe a qualquer membro ou Comissão da Câmara dos Deputados, do Senado Federal ou do Congresso Nacional, ao Presidente da República, ao Supremo Tribunal Federal, aos Tribunais Superiores, ao Procurador-Geral da República e aos cidadãos, na forma e nos casos previstos nesta Constituição.",
    },
    {
      locator: "art. 61, § 2º",
      text: "§ 2º A iniciativa popular pode ser exercida pela apresentação à Câmara dos Deputados de projeto de lei subscrito por, no mínimo, um por cento do eleitorado nacional, distribuído pelo menos por cinco Estados, com não menos de três décimos por cento dos eleitores de cada um deles.",
    },
  ]),
  cf("66", "art66", "Define sanção, veto e a apreciação do veto pelo Congresso.", [
    {
      locator: "art. 66, caput e § 1º",
      text: "Art. 66. A Casa na qual tenha sido concluída a votação enviará o projeto de lei ao Presidente da República, que, aquiescendo, o sancionará. § 1º Se o Presidente da República considerar o projeto, no todo ou em parte, inconstitucional ou contrário ao interesse público, vetá-lo-á total ou parcialmente, no prazo de quinze dias úteis, contados da data do recebimento, e comunicará, dentro de quarenta e oito horas, ao Presidente do Senado Federal os motivos do veto.",
    },
    {
      locator: "art. 66, § 4º",
      text: "§ 4º O veto será apreciado em sessão conjunta, dentro de trinta dias a contar de seu recebimento, só podendo ser rejeitado pelo voto da maioria absoluta dos Deputados e Senadores.",
    },
  ]),
  cf("76", "art76", "Define quem exerce o Poder Executivo federal.", [
    { locator: "art. 76", text: "Art. 76. O Poder Executivo é exercido pelo Presidente da República, auxiliado pelos Ministros de Estado." },
  ]),
  cf("84", "art84", "Lista competências do Presidente da República. Os trechos selecionados não esgotam o artigo.", [
    {
      locator: "art. 84, I a V",
      text: "Art. 84. Compete privativamente ao Presidente da República: I - nomear e exonerar os Ministros de Estado; II - exercer, com o auxílio dos Ministros de Estado, a direção superior da administração federal; III - iniciar o processo legislativo, na forma e nos casos previstos nesta Constituição; IV - sancionar, promulgar e fazer publicar as leis, bem como expedir decretos e regulamentos para sua fiel execução; V - vetar projetos de lei, total ou parcialmente;",
    },
  ]),
  cf("92", "art92", "Lista os órgãos do Poder Judiciário.", [
    {
      locator: "art. 92, I a VII",
      text: "Art. 92. São órgãos do Poder Judiciário: I - o Supremo Tribunal Federal; I-A o Conselho Nacional de Justiça; II - o Superior Tribunal de Justiça; II-A - o Tribunal Superior do Trabalho; III - os Tribunais Regionais Federais e Juízes Federais; IV - os Tribunais e Juízes do Trabalho; V - os Tribunais e Juízes Eleitorais; VI - os Tribunais e Juízes Militares; VII - os Tribunais e Juízes dos Estados e do Distrito Federal e Territórios.",
    },
  ]),
  cf("102", "art102", "Define a competência principal do STF e o julgamento de ações de controle de constitucionalidade.", [
    {
      locator: "art. 102, caput e I, a",
      text: "Art. 102. Compete ao Supremo Tribunal Federal, precipuamente, a guarda da Constituição, cabendo-lhe: I - processar e julgar, originariamente: a) a ação direta de inconstitucionalidade de lei ou ato normativo federal ou estadual e a ação declaratória de constitucionalidade de lei ou ato normativo federal;",
    },
  ]),
  cf("145", "art145", "Define as espécies de tributos que os entes podem instituir. Não trata de alíquotas específicas.", [
    {
      locator: "art. 145, caput",
      text: "Art. 145. A União, os Estados, o Distrito Federal e os Municípios poderão instituir os seguintes tributos: I - impostos; II - taxas, em razão do exercício do poder de polícia ou pela utilização, efetiva ou potencial, de serviços públicos específicos e divisíveis, prestados ao contribuinte ou postos a sua disposição; III - contribuição de melhoria, decorrente de obras públicas.",
    },
    { locator: "art. 145, § 1º (início)", text: "§ 1º Sempre que possível, os impostos terão caráter pessoal e serão graduados segundo a capacidade econômica do contribuinte" },
  ]),
  cf("165", "art165", "Define as três leis orçamentárias de iniciativa do Executivo.", [
    { locator: "art. 165, caput", text: "Art. 165. Leis de iniciativa do Poder Executivo estabelecerão: I - o plano plurianual; II - as diretrizes orçamentárias; III - os orçamentos anuais." },
  ]),
  cf("170", "art170", "Define os fundamentos e princípios da ordem econômica. A combinação de princípios é objeto de interpretações diferentes.", [
    {
      locator: "art. 170, caput e incisos I a VIII",
      text: "Art. 170. A ordem econômica, fundada na valorização do trabalho humano e na livre iniciativa, tem por fim assegurar a todos existência digna, conforme os ditames da justiça social, observados os seguintes princípios: I - soberania nacional; II - propriedade privada; III - função social da propriedade; IV - livre concorrência; V - defesa do consumidor; VI - defesa do meio ambiente, inclusive mediante tratamento diferenciado conforme o impacto ambiental dos produtos e serviços e de seus processos de elaboração e prestação; VII - redução das desigualdades regionais e sociais; VIII - busca do pleno emprego;",
    },
  ]),
  cf("193", "art193", "Define a base e o objetivo da ordem social.", [
    { locator: "art. 193, caput", text: "Art. 193. A ordem social tem como base o primado do trabalho, e como objetivo o bem-estar e a justiça sociais." },
  ]),
  cf("225", "art225", "Estabelece o direito ao meio ambiente equilibrado e o dever de protegê-lo. Não define, por si só, o procedimento de licenciamento.", [
    {
      locator: "art. 225, caput",
      text: "Art. 225. Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida, impondo-se ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo para as presentes e futuras gerações.",
    },
  ]),
  {
    key: "lei-9096-1995",
    publisher: "planalto-legislacao",
    title: "Lei nº 9.096, de 19 de setembro de 1995 (Lei dos Partidos Políticos)",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l9096.htm",
    publishedOn: "1995-09-19",
    locator: "arts. 1º e 7º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote: "Define a finalidade dos partidos e os requisitos de registro no TSE. Não trata do conteúdo programático de partidos específicos.",
    excerpts: [
      {
        locator: "art. 1º",
        text: "Art. 1º O partido político, pessoa jurídica de direito privado, destina-se a assegurar, no interesse do regime democrático, a autenticidade do sistema representativo e a defender os direitos fundamentais definidos na Constituição Federal.",
      },
      {
        locator: "art. 7º, § 1º",
        text: "Só é admitido o registro do estatuto de partido político que tenha caráter nacional, considerando-se como tal aquele que comprove, no período de dois anos, o apoiamento de eleitores não filiados a partido político, correspondente a, pelo menos, 0,5% (cinco décimos por cento) dos votos dados na última eleição geral para a Câmara dos Deputados, não computados os votos em branco e os nulos, distribuídos por um terço, ou mais, dos Estados, com um mínimo de 0,1% (um décimo por cento) do eleitorado que haja votado em cada um deles.",
      },
    ],
  },
  {
    key: "lei-9709-1998",
    publisher: "planalto-legislacao",
    title: "Lei nº 9.709, de 18 de novembro de 1998 (plebiscito, referendo e iniciativa popular)",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l9709.htm",
    publishedOn: "1998-11-18",
    locator: "arts. 1º, 2º e 13",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote: "Define plebiscito, referendo e iniciativa popular. Não avalia a frequência ou os efeitos desses instrumentos.",
    excerpts: [
      {
        locator: "art. 2º, §§ 1º e 2º",
        text: "§ 1º O plebiscito é convocado com anterioridade a ato legislativo ou administrativo, cabendo ao povo, pelo voto, aprovar ou denegar o que lhe tenha sido submetido. § 2º O referendo é convocado com posterioridade a ato legislativo ou administrativo, cumprindo ao povo a respectiva ratificação ou rejeição.",
      },
      {
        locator: "art. 13, caput",
        text: "Art. 13. A iniciativa popular consiste na apresentação de projeto de lei à Câmara dos Deputados, subscrito por, no mínimo, um por cento do eleitorado nacional, distribuído pelo menos por cinco Estados, com não menos de três décimos por cento dos eleitores de cada um deles.",
      },
    ],
  },
  {
    key: "lei-4737-1965-arts-106-108",
    publisher: "planalto-legislacao",
    title: "Lei nº 4.737, de 15 de julho de 1965 (Código Eleitoral) · arts. 106 a 108",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l4737compilado.htm",
    publishedOn: "1965-07-15",
    locator: "arts. 106, 107 e 108 (redação vigente)",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Define o quociente eleitoral, o quociente partidário e a votação mínima individual. A distribuição das sobras (art. 109) foi alterada por decisões do STF; ela não é detalhada nesta fonte.",
    excerpts: [
      {
        locator: "art. 106",
        text: "Art. 106. Determina-se o quociente eleitoral dividindo-se o número de votos válidos apurados pelo de lugares a preencher em cada circunscrição eleitoral, desprezada a fração se igual ou inferior a meio, equivalente a um, se superior.",
      },
      {
        locator: "art. 107",
        text: "Art. 107. Determina-se para cada partido o quociente partidário dividindo-se pelo quociente eleitoral o número de votos válidos dados sob a mesma legenda, desprezada a fração.",
      },
      {
        locator: "art. 108, caput",
        text: "Art. 108. Estarão eleitos, entre os candidatos registrados por um partido que tenham obtido votos em número igual ou superior a 10% (dez por cento) do quociente eleitoral, tantos quantos o respectivo quociente partidário indicar, na ordem da votação nominal que cada um tenha recebido.",
      },
    ],
  },
  {
    key: "lcp-179-2021",
    publisher: "planalto-legislacao",
    title: "Lei Complementar nº 179, de 24 de fevereiro de 2021 (autonomia do Banco Central)",
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp179.htm",
    publishedOn: "2021-02-24",
    locator: "art. 1º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote: "Define os objetivos legais do Banco Central. Não avalia os resultados da política monetária.",
    excerpts: [
      {
        locator: "art. 1º",
        text: "Art. 1º O Banco Central do Brasil tem por objetivo fundamental assegurar a estabilidade de preços. Parágrafo único. Sem prejuízo de seu objetivo fundamental, o Banco Central do Brasil também tem por objetivos zelar pela estabilidade e pela eficiência do sistema financeiro, suavizar as flutuações do nível de atividade econômica e fomentar o pleno emprego.",
      },
    ],
  },
  {
    key: "lei-6938-1981",
    publisher: "planalto-legislacao",
    title: "Lei nº 6.938, de 31 de agosto de 1981 (Política Nacional do Meio Ambiente)",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l6938.htm",
    publishedOn: "1981-08-31",
    locator: "art. 2º, caput",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote: "Define o objetivo da Política Nacional do Meio Ambiente, combinando qualidade ambiental e desenvolvimento socioeconômico.",
    excerpts: [
      {
        locator: "art. 2º, caput",
        text: "A Política Nacional do Meio Ambiente tem por objetivo a preservação, melhoria e recuperação da qualidade ambiental propícia à vida, visando assegurar, no País, condições ao desenvolvimento sócio-econômico, aos interesses da segurança nacional e à proteção da dignidade da vida humana",
      },
    ],
  },
  {
    key: "lei-12528-2011",
    publisher: "planalto-legislacao",
    title: "Lei nº 12.528, de 18 de novembro de 2011 (Comissão Nacional da Verdade)",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12528.htm",
    publishedOn: "2011-11-18",
    locator: "art. 3º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote: "Define os objetivos da Comissão Nacional da Verdade. As conclusões da comissão estão no relatório final, não nesta lei.",
    excerpts: [
      {
        locator: "art. 3º, I e II",
        text: "Art. 3º São objetivos da Comissão Nacional da Verdade: I - esclarecer os fatos e as circunstâncias dos casos de graves violações de direitos humanos mencionados no caput do art. 1º; II - promover o esclarecimento circunstanciado dos casos de torturas, mortes, desaparecimentos forçados, ocultação de cadáveres e sua autoria, ainda que ocorridos no exterior;",
      },
    ],
  },
  {
    key: "decreto-21076-1932",
    publisher: "planalto-legislacao",
    title: "Decreto nº 21.076, de 24 de fevereiro de 1932 (Código Eleitoral de 1932)",
    url: "https://www.planalto.gov.br/ccivil_03/decreto/1930-1949/d21076.htm",
    publishedOn: "1932-02-24",
    locator: "art. 2º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote: "Registra a regra de 1932 que definiu o eleitor sem distinção de sexo. Outras condições da época estão em dispositivos não reproduzidos aqui.",
    excerpts: [{ locator: "art. 2º", text: "Art. 2º E' eleitor o cidadão maior de 21 anos, sem distinção de sexo, alistado na fórma deste Codigo." }],
  },
];
