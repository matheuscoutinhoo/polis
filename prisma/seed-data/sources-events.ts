import { REUSE, type SeedSource } from "./publishers";

// Verified official sources for the events catalog (filled from the events research).
export const EVENT_SOURCES: SeedSource[] = [
  // Lei 15.270/2025 — Imposto de Renda
  {
    key: "planalto-lei15270",
    publisher: "planalto-legislacao",
    title: "Lei nº 15.270, de 26 de novembro de 2025",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm",
    publishedOn: "2025-11-26",
    locator: "arts. 3º-A, 6º-A, 11-A e 16-A incluídos na Lei 9.250/1995; arts. 4º, 6º e 8º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Texto oficial da lei, conferido no Portal da Legislação do Planalto em 23/11/2026. Sustenta as regras de redução do IRPF, a retenção sobre lucros e dividendos, a tributação mínima, a compensação a estados e municípios, o prazo para a política de atualização da tabela e a produção de efeitos. Não informa o andamento das ações no STF.",
    excerpts: [
      {
        locator: "art. 3º-A, § 2º (Lei 9.250/1995)",
        text: "§ 2º Os contribuintes que tiverem rendimentos tributáveis sujeitos à incidência mensal superior a R$ 7.350,00 (sete mil, trezentos e cinquenta reais) não terão redução no imposto devido.",
      },
      {
        locator: "art. 6º-A, caput (Lei 9.250/1995)",
        text: "A partir do mês de janeiro do ano-calendário de 2026, o pagamento, o creditamento, o emprego ou a entrega de lucros e dividendos por uma mesma pessoa jurídica a uma mesma pessoa física residente no Brasil em montante superior a R$ 50.000,00 (cinquenta mil reais) em um mesmo mês fica sujeito à retenção na fonte do Imposto sobre a Renda das Pessoas Físicas à alíquota de 10% (dez por cento) sobre o total do valor pago, creditado, empregado ou entregue.",
      },
      {
        locator: "art. 16-A, caput (Lei 9.250/1995)",
        text: "A partir do exercício de 2027, ano-calendário de 2026, a pessoa física cuja soma de todos os rendimentos recebidos no ano-calendário seja superior a R$ 600.000,00 (seiscentos mil reais) fica sujeita à tributação mínima do Imposto sobre a Renda das Pessoas Físicas, nos termos deste artigo.",
      },
      {
        locator: "art. 6º",
        text: "Art. 6º No prazo de 1 (um) ano, o Poder Executivo enviará ao Congresso Nacional projeto de lei com a previsão de política nacional de atualização dos valores previstos na legislação do Imposto sobre a Renda das Pessoas Físicas.",
      },
    ],
  },
  {
    key: "congresso-pl1087",
    publisher: "congresso",
    title: "Projeto de Lei Nº 1087/2025 - Matérias Bicamerais - Congresso Nacional",
    url: "https://www.congressonacional.leg.br/materias/materias-bicamerais/-/ver/pl-1087-2025",
    publishedOn: "2025-11-26",
    locator: "Tramitação na Câmara (18/03/2025 a 06/10/2025), no Senado (08/10/2025 a 05/11/2025) e sanção",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Registro oficial da tramitação do PL 1087/2025 nas duas Casas: sustenta datas, relatorias, o resultado da votação na Câmara e a sanção sem vetos. Não traz o conteúdo dos debates.",
    excerpts: [
      { locator: "Câmara — Plenário, 18/03/2025", text: "Apresentação do PL n. 1087/2025 (Projeto de Lei), pelo Poder Executivo" },
      {
        locator: "Câmara — Plenário, 01/10/2025",
        text: "Aprovada a Subemenda Substitutiva Global ao Projeto de Lei nº 1.087, de 2025, adotada pelo relator da Comissão Especial. Sim: 493; Total: 493.",
      },
      { locator: "Sanção (Presidência da República)", text: "Situação: Encerrada sem vetos" },
    ],
  },
  {
    key: "agcamara-ir-aprovacao",
    publisher: "camara",
    title: "Câmara aprova projeto que isenta do Imposto de Renda quem ganha até R$ 5 mil por mês",
    url: "https://www.camara.leg.br/noticias/1206672-camara-aprova-projeto-que-isenta-do-imposto-de-renda-quem-ganha-ate-r",
    author: "Agência Câmara de Notícias",
    publishedOn: "2025-10-01",
    locator: "Texto principal; seções Correção da tabela, Justiça tributária, Mudança estrutural e Críticas",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Notícia institucional da Câmara sobre a aprovação em 1º/10/2025: registra as mudanças do substitutivo e declarações de parlamentares. Declarações e estimativas citadas são de seus autores, não fatos verificados.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "A Câmara dos Deputados aprovou o Projeto de Lei 1087/25, do Poder Executivo, que concede desconto para zerar o Imposto de Renda das Pessoas Físicas (IRPF) de quem ganha até R$ 5 mil mensais e institui cobrança adicional para aqueles com rendimento tributável acima de R$ 600 mil ao ano.",
      },
      {
        locator: "Correção da tabela",
        text: "De acordo com o texto, a redução gradual para os rendimentos acima de R$ 5 mil mensais, que antes iriam até R$ 7 mil, passa a contemplar até o valor de R$ 7.350,00 (quanto mais ganha, menor a redução).",
      },
      {
        locator: "Justiça tributária",
        text: "Arthur Lira afirmou que a proposta vai beneficiar diretamente 15,5 milhões de pessoas, enquanto cerca de 140 mil pessoas serão atingidas na compensação da isenção.",
      },
    ],
  },
  {
    key: "agsenado-ir-aprovacao",
    publisher: "senado",
    title: "Isenção de IR para quem ganha até R$ 5 mil segue para sanção",
    url: "https://www12.senado.leg.br/noticias/materias/2025/11/05/isencao-de-ir-para-quem-ganha-ate-r-5-mil-segue-para-sancao",
    author: "Agência Senado",
    publishedOn: "2025-11-05",
    locator: "Parágrafos 1 a 7; seção Emprego",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre a aprovação em 5/11/2025: registra o relatório, a rejeição de emendas e declarações de senadores. Estimativas citadas por parlamentares não foram verificadas.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "O Senado aprovou nesta quarta-feira (5) o projeto de lei que isenta do Imposto de Renda (IR) quem ganha até R$ 5.000 mensais e reduz alíquotas para salários de R$ 5.000,01 a R$ 7.350.",
      },
      {
        locator: "Parágrafo 2",
        text: "Os senadores apoiaram o relatório do senador Renan Calheiros (MDB-AL), que mantém a versão aprovada na Câmara dos Deputados, apenas com ajustes de redação.",
      },
      {
        locator: "Declaração do relator",
        text: "Vai beneficiar perto de 25 milhões de trabalhadores e será compensado pelo aumento da carga sobre 200 mil “super-ricos”. Quem tem menos, paga menos; quem tem mais, paga mais",
      },
    ],
  },
  {
    key: "agsenado-ir-regras",
    publisher: "senado",
    title: "Entenda as regras para isenção do Imposto de Renda e taxação de altas rendas",
    url: "https://www12.senado.leg.br/noticias/materias/2025/11/05/entenda-as-regras-para-isencao-do-imposto-de-renda-e-taxacao-de-altas-rendas",
    author: "Agência Senado",
    publishedOn: "2025-11-05",
    locator: "Seções IRPF anual, Altas rendas, Abatimento, Renda de investimentos e Compensação",
    materialType: "CONTEUDO_DIDATICO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Material explicativo da Agência Senado sobre as regras do projeto aprovado. Resume o texto antes da sanção; em caso de diferença, prevalece o texto oficial da lei.",
    excerpts: [
      {
        locator: "IRPF anual",
        text: "Já a partir de 2027, será concedida a isenção do IRPF anual, com base no ano-calendário de 2026, para quem tiver rendimentos anuais tributáveis de até R$ 60.000. Os contribuintes com rendimentos tributáveis sujeitos ao ajuste anual entre R$ 60.000,01 a R$ 88.200 terão uma redução parcial, de forma decrescente quanto maior for a renda.",
      },
      {
        locator: "Altas rendas",
        text: "Haverá uma alíquota mínima de IR para quem ganha a partir de R$ 600 mil por ano. O texto prevê uma progressão, partindo de 0% e chegando a 10% para rendimentos acima de R$ 1,2 milhão por ano, incluindo dividendos.",
      },
      {
        locator: "Compensação",
        text: "Estados, Distrito Federal e municípios serão compensados das reduções com o aumento de receitas dos respectivos Fundos de Participação.",
      },
    ],
  },
  {
    key: "receita-orientacao-ir",
    publisher: "receita",
    title: "Receita Federal orienta fontes pagadoras e contribuintes a calcular a redução do imposto de renda a partir de 1º de janeiro de 2026",
    url: "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2025/dezembro/receita-federal-orienta-fontes-pagadoras-e-contribuintes-a-calcular-a-reducao-do-imposto-de-renda-a-partir-de-1o-de-janeiro-de-2026",
    publishedOn: "2025-12-11",
    sourceUpdatedOn: "2026-10-28",
    locator: "Seções Mensal - até R$ 5 mil; Mensal - Redução gradual; Anual",
    materialType: "CONTEUDO_DIDATICO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Orientação oficial da Receita Federal para aplicar a redução mensal do IRPF desde janeiro de 2026, com exemplos de cálculo. Não detalha a tributação mínima de altas rendas.",
    excerpts: [
      {
        locator: "Mensal - até R$ 5 mil",
        text: "A partir de janeiro de 2026, passam a não pagar IRPF os contribuintes com renda mensal de até R$ 5.000,00.",
      },
      { locator: "Mensal - até R$ 5 mil (exemplo)", text: "Aplicando a redução, que pode chegar a R$ 312,89, não haveria IRPF a ser recolhido." },
      {
        locator: "Mensal - até R$ 5 mil (alerta)",
        text: "Importante alertar que a isenção só é garantida para PFs que aufiram dentro do mês uma renda mensal de até R$ 5.000,00. Caso a pessoa tenha duas fontes pagadoras com renda em cada de R$ 4.000,00, não haverá incidência do imposto de Renda Retido na Fonte no mês do pagamento, mas na apuração anual será cobrada a eventual diferença de IRPF.",
      },
    ],
  },
  {
    key: "fazenda-sancao-ir",
    publisher: "fazenda",
    title: "Presidente sanciona lei que amplia isenção do Imposto de Renda para quem ganha até R$ 5 mil",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/noticias/2025/novembro/presidente-sanciona-lei-que-amplia-isencao-do-imposto-de-renda-para-quem-ganha-ate-r-5-mil",
    publishedOn: "2025-11-26",
    sourceUpdatedOn: "2026-10-27",
    locator: "Texto principal",
    materialType: "DECLARACAO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Nota do Ministério da Fazenda sobre a sanção. Os números de beneficiados e de atingidos e a afirmação de que não há impacto fiscal são estimativas e avaliações do governo, não resultados medidos.",
    excerpts: [
      {
        locator: "Parágrafo 3",
        text: "No total, cerca de 15 milhões de brasileiros vão deixar de pagar imposto de renda com a nova lei, sendo 10 milhões que passarão a ser isentos e outros 5 milhões que contarão com redução no imposto.",
      },
      { locator: "Parágrafo 6", text: "A estimativa é de que este aumento da carga alcance 140 mil brasileiros de alta renda." },
      {
        locator: "Parágrafo 6",
        text: "Não há, portanto, impacto fiscal: a medida não prejudica as contas do governo, não exige corte de gastos e não afeta nenhum serviço oferecido à população.",
      },
    ],
  },
  {
    key: "senado-norma-lei15270",
    publisher: "senado",
    title: "Lei nº 15.270 de 26/11/2025 (Legislação Federal — Senado Federal)",
    url: "https://legis.senado.leg.br/norma/41758136",
    publishedOn: "2025-11-26",
    locator: "Ementa; Publicação do Texto Principal; Normas alteradas",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Ficha da norma na base de legislação do Senado: confirma a ementa, a publicação no Diário Oficial da União de 27/11/2025 e o início dos efeitos. Não reproduz o texto integral.",
    excerpts: [
      {
        locator: "Ementa",
        text: "para instituir a redução do imposto sobre a renda devido nas bases de cálculo mensal e anual e a tributação mínima para as pessoas físicas que auferem altas rendas",
      },
      { locator: "Normas alteradas — Lei 9.250/1995", text: "As alterações a esta lei produzem efeitos a partir de 1º/1/2026." },
    ],
  },
  {
    key: "stf-dividendos-prazo",
    publisher: "stf",
    title: "STF prorroga prazo para aprovação de lucros e dividendos até 31 janeiro de 2026",
    url: "https://noticias.stf.jus.br/postsnoticias/stf-prorroga-prazo-para-aprovacao-de-lucros-e-dividendos-ate-janeiro-de-2026/",
    author: "Jorge Macedo (STF)",
    publishedOn: "2025-12-26",
    locator: "Parágrafos 1 a 3; seção Liminar da OAB foi negada",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia oficial do STF sobre a liminar de 26/12/2025 nas ADIs 7912 e 7914 e o pedido negado na ADI 7917. A decisão é provisória e seria submetida a referendo do Plenário; o desfecho não consta da notícia.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "prorrogou até 31 de janeiro de 2026 o prazo relacionado à exigência de aprovação da distribuição de lucros e dividendos previsto na Lei 15.270/2025",
      },
      {
        locator: "Parágrafo 2",
        text: "A decisão, tomada nesta sexta-feira (26) nas Ações Diretas de Inconstitucionalidade (ADIs) 7912 e 7914, será submetida a referendo do Pleno do STF na sessão virtual marcada para 13/02 a 24/02/2026.",
      },
      {
        locator: "Liminar da OAB foi negada",
        text: "Na mesma decisão, o ministro negou o pedido cautelar apresentado na ADI 7917, proposta pelo Conselho Federal da Ordem dos Advogados do Brasil (OAB).",
      },
    ],
  },
  {
    key: "stf-novas-adis-ir",
    publisher: "stf",
    title: "Novas ações questionam no STF tributação de lucros e renda elevada",
    url: "https://noticias.stf.jus.br/postsnoticias/novas-acoes-questionam-no-stf-tributacao-de-lucros-e-renda-elevada/",
    author: "Jorge Macedo (STF)",
    publishedOn: "2026-02-09",
    locator: "Parágrafos 1 a 4",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia oficial do STF sobre as ADIs 7933 e 7934. Registra os argumentos dos autores, que não equivalem a decisão do tribunal.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "As ações foram distribuídas, por prevenção, ao ministro Nunes Marques, que já é relator de outras ações sobre o tema.",
      },
      {
        locator: "Parágrafo 2",
        text: "A ADI 7933 foi apresentada pelo Partido Liberal (PL), que sustenta que a Lei 15.270/2025 promove mudanças profundas no regime do Imposto de Renda com prazo curto para entrada em vigor.",
      },
    ],
  },

  // Lei 15.100/2025 — celulares nas escolas
  {
    key: "planalto-lei15100",
    publisher: "planalto-legislacao",
    title: "Lei nº 15.100, de 13 de janeiro de 2025",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15100.htm",
    publishedOn: "2025-01-13",
    locator: "arts. 1º a 5º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Texto oficial da lei, conferido no Portal da Legislação do Planalto em 23/11/2026: proibição, exceções, ações de saúde mental e vigência. Não detalha a regulamentação feita depois por decreto.",
    excerpts: [
      {
        locator: "art. 2º, caput",
        text: "Art. 2º Fica proibido o uso, por estudantes, de aparelhos eletrônicos portáteis pessoais durante a aula, o recreio ou intervalos entre as aulas, para todas as etapas da educação básica.",
      },
      {
        locator: "art. 2º, § 1º",
        text: "§ 1º Em sala de aula, o uso de aparelhos eletrônicos é permitido para fins estritamente pedagógicos ou didáticos, conforme orientação dos profissionais de educação.",
      },
      {
        locator: "art. 3º",
        text: "Art. 3º É permitido o uso de aparelhos eletrônicos portáteis pessoais por estudantes, independentemente da etapa de ensino e do local de uso, dentro ou fora da sala de aula, para os seguintes fins: I - garantir a acessibilidade; II - garantir a inclusão; III - atender às condições de saúde dos estudantes; IV - garantir os direitos fundamentais.",
      },
      { locator: "art. 5º", text: "Art. 5º Esta Lei entra em vigor na data de sua publicação." },
    ],
  },
  {
    key: "camara-api-pl104",
    publisher: "camara",
    title: "API de Dados Abertos: PL 104/2015, dados da proposição e tramitações",
    url: "https://dadosabertos.camara.leg.br/api/v2/proposicoes/945492/tramitacoes",
    publishedOn: "2025-01-13",
    locator: "Tramitações de 03/02/2015, 30/10/2024, 17/12/2024 e 13/01/2025",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Dados abertos oficiais da tramitação do PL 104/2015 na Câmara: sustentam as datas de apresentação, aprovação na Comissão de Educação, envio ao Senado e transformação em lei.",
    excerpts: [
      { locator: "Plenário, 03/02/2015", text: "Apresentação do Projeto de Lei n. 104/2015, pelo Deputado Alceu Moreira (PMDB-RS)" },
      { locator: "Comissão de Educação, 30/10/2024", text: "Aprovado o Parecer com Complementação de Voto." },
      { locator: "Mesa Diretora, 17/12/2024", text: "Remessa ao Senado Federal por meio do Of. nº 649/2024/PS-GSE." },
    ],
  },
  {
    key: "agcamara-ccjc-celular",
    publisher: "camara",
    title: "Comissão de Constituição e Justiça aprova projeto que proíbe celulares em escolas",
    url: "https://www.camara.leg.br/noticias/1120424-comissao-de-constituicao-e-justica-aprova-projeto-que-proibe-celulares-em-escolas/",
    author: "Agência Câmara de Notícias",
    publishedOn: "2024-12-11",
    locator: "Texto principal; seções Exceções, Exemplo fluminense, Críticas e Saúde mental",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Notícia institucional da Câmara sobre a aprovação na CCJC em 11/12/2024: registra o conteúdo do texto da época e declarações de deputados, que não são fatos verificados.",
    excerpts: [
      {
        locator: "Parágrafo 2",
        text: "A proposta tramitou em caráter conclusivo e poderá seguir ao Senado, a menos que haja recurso para votá-la no Plenário da Câmara.",
      },
      {
        locator: "Exemplo fluminense",
        text: "Renan Ferreirinha citou exemplo bem-sucedido do Rio de Janeiro, onde o uso já é proibido há um ano nas 1.557 unidades escolares, para defender a proposta.",
      },
      { locator: "Críticas", text: "Para a deputada Julia Zanatta (PL-SC), o celular pode ser utilizado pelos alunos como meio de prova." },
    ],
  },
  {
    key: "senado-pl4932",
    publisher: "congresso",
    title: "Projeto de Lei n° 4932, de 2024",
    url: "https://www.congressonacional.leg.br/web/atividade/materias/-/materia/166801",
    publishedOn: "2025-01-14",
    locator: "Situação atual; tramitação de 17/12/2024 a 14/01/2025",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Registro oficial da tramitação do PL 4.932/2024 no Senado: confirma a urgência, o resultado da votação da emenda e a transformação em lei.",
    excerpts: [
      { locator: "Estado atual", text: "14/01/2025 - TRANSFORMADA EM NORMA JURÍDICA" },
      { locator: "Plenário, 18/12/2024", text: "Aprovado o Requerimento nº 957, de 2024, de Líderes, que solicita urgência para a matéria." },
    ],
  },
  {
    key: "agsenado-celular",
    publisher: "senado",
    title: "Senado aprova restrição do uso de celulares por estudantes em escolas",
    url: "https://www12.senado.leg.br/noticias/materias/2024/12/18/senado-aprova-restricao-do-uso-de-celulares-por-estudantes-em-escolas",
    author: "Agência Senado",
    publishedOn: "2024-12-18",
    locator: "Parágrafos 1 a 4; seções Acompanhamento e Gravações",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre a aprovação em 18/12/2024: registra a votação da emenda e declarações de senadores, que não são fatos verificados.",
    excerpts: [
      {
        locator: "Gravações",
        text: "Em votação, a emenda de Marinho foi rejeitada pela maioria dos parlamentares: 42 votos contrários e 16 votos favoráveis.",
      },
      {
        locator: "Gravações",
        text: "Ele solicitou que a limitação de uso dos celulares fosse modulada e se aplicasse somente a alunos até o nono ano do ensino fundamental.",
      },
      {
        locator: "Declaração do relator",
        text: "Em todos os lugares do mundo onde se apresentou a medida de restrição de uso de aparelhos celulares, houve a melhoria do desempenho escolar, da disciplina na escola e redução do bullying",
      },
    ],
  },
  {
    key: "senado-norma-lei15100",
    publisher: "senado",
    title: "Lei nº 15.100 de 13/01/2025 (Legislação Federal — Senado Federal)",
    url: "https://legis.senado.leg.br/norma/40157066",
    publishedOn: "2025-01-13",
    locator: "Ementa; Publicação do Texto Principal; Normas posteriores",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Ficha da norma na base de legislação do Senado: confirma a ementa, a publicação no Diário Oficial da União de 14/01/2025 e o decreto que a regulamenta.",
    excerpts: [
      {
        locator: "Ementa",
        text: "Dispõe sobre a utilização, por estudantes, de aparelhos eletrônicos portáteis pessoais nos estabelecimentos públicos e privados de ensino da educação básica.",
      },
      { locator: "Publicação do Texto Principal", text: "Diário Oficial da União de 14/01/2025" },
    ],
  },
  {
    key: "senado-norma-decreto12385",
    publisher: "senado",
    title: "Decreto nº 12.385 de 18/02/2025 (Legislação Federal — Senado Federal)",
    url: "https://legis.senado.leg.br/norma/40383692",
    publishedOn: "2025-02-18",
    locator: "Ementa; Publicação do Texto Principal",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Ficha do decreto na base de legislação do Senado: confirma a ementa e a publicação em 19/02/2025. O texto integral do decreto não foi lido.",
    excerpts: [
      {
        locator: "Ementa",
        text: "Regulamenta a Lei nº 15.100, de 13 de janeiro de 2025, para tratar da proibição do uso, por estudantes, de aparelhos eletrônicos portáteis pessoais durante a aula, o recreio ou o intervalo entre as aulas, para todas as etapas da educação básica",
      },
      { locator: "Publicação do Texto Principal", text: "Diário Oficial da União de 19/02/2025" },
    ],
  },
  {
    key: "mec-sancao-celular",
    publisher: "mec",
    title: "Sancionada lei que restringe uso de celulares nas escolas",
    url: "https://www.gov.br/mec/pt-br/assuntos/noticias/2025/janeiro/sancionada-lei-que-restringe-uso-de-celulares-nas-escolas",
    publishedOn: "2025-01-13",
    sourceUpdatedOn: "2026-10-26",
    locator: "Texto principal",
    materialType: "DECLARACAO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia do MEC sobre a sanção: resume a lei e traz declarações de autoridades e a divisão de tarefas na implementação, segundo o ministério.",
    excerpts: [
      {
        locator: "Declaração do ministro da Educação",
        text: "O objetivo da lei não é proibir o uso de celulares, mas proteger nossas crianças e adolescentes por meio da restrição a esses aparelhos",
      },
      {
        locator: "Implementação",
        text: "Os estados e municípios, em parceria com as comunidades escolares, serão responsáveis por definir os formatos mais adequados para a implementação da lei, considerando as particularidades locais.",
      },
    ],
  },
  {
    key: "mec-cne-diretrizes",
    publisher: "mec",
    title: "CNE aprova diretrizes para uso de celulares nas escolas",
    url: "https://www.gov.br/mec/pt-br/assuntos/noticias/2025/fevereiro/cne-aprova-diretrizes-para-uso-de-celulares-nas-escolas",
    publishedOn: "2025-02-20",
    sourceUpdatedOn: "2026-10-26",
    locator: "Texto principal; seção Decreto",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia do MEC sobre as diretrizes do CNE e o conteúdo do Decreto 12.385/2025. É a descrição do ministério; não substitui a leitura do decreto e da resolução.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "O documento visa orientar as redes de ensino e as escolas sobre a aplicação da legislação referente em todas as etapas da educação básica e às diferentes modalidades educacionais.",
      },
      {
        locator: "Parágrafo 2",
        text: "A votação aprovou por unanimidade as diretrizes, tendo ocorrido após publicação do Decreto Presidencial nº 12.385/2025, que regulamentou a Lei nº 15.100/2025 e remeteu ao CNE a função de emitir diretrizes mais detalhadas e aplicáveis à realidade das escolas.",
      },
      {
        locator: "Decreto",
        text: "Ela determina que as escolas públicas e privadas, observadas normas complementares dos sistemas de ensino e do CNE, devem estabelecer, em seus regimentos internos e em suas propostas pedagógicas: as estratégias de orientação aos estudantes e às suas famílias; as estratégias de orientação e de formação de professores; os critérios para orientar o uso pedagógico dos aparelhos eletrônicos portáteis pessoais; a forma de guardar os dispositivos; e as consequências do descumprimento das restrições.",
      },
    ],
  },
  {
    key: "mec-pesquisa-2026",
    publisher: "mec",
    title: "Pesquisa aponta ampla adesão à restrição de celulares nas escolas",
    url: "https://www.gov.br/mec/pt-br/assuntos/noticias/2026/junho/pesquisa-aponta-ampla-adesao-a-restricao-de-celulares-nas-escolas",
    publishedOn: "2026-06-30",
    sourceUpdatedOn: "2026-10-26",
    locator: "Texto principal; seções Educação digital e Desafios",
    materialType: "DADO_ESTATISTICO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Pesquisa coordenada pelo MEC com o Inep sobre o primeiro ano da lei. Reúne percepções declaradas por gestores escolares; não mede aprendizagem nem demonstra, sozinha, relação de causa e efeito.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "92% dos gestores escolares afirmam que a legislação já está sendo implementada nas instituições, sendo que 45% consideram o processo consolidado e 47% avaliam que a implementação está em curso",
      },
      {
        locator: "Metodologia",
        text: "A Pesquisa Nacional 1º ano da Lei nº 15.100/2025 contou com a seleção de 8.189 escolas da educação básica, distribuídas em todas as unidades da Federação, com dados representativos a nível nacional das escolas públicas e privadas e, para a rede pública, dos anos iniciais e finais do ensino fundamental e do ensino médio. Nesta primeira etapa, foram divulgados os resultados referentes à percepção dos gestores escolares. Os dados relativos aos professores serão apresentados no segundo semestre.",
      },
      {
        locator: "Mudanças nas escolas",
        text: "Antes da lei, 13% das instituições permitiam utilizar o aparelho em qualquer espaço e horário. Após a implementação da norma, esse percentual caiu para zero. Já a restrição do uso de celulares em todos os espaços escolares passou de 20% para 48% das escolas.",
      },
      {
        locator: "Impactos percebidos",
        text: "Entre os impactos percebidos pelos entrevistados, 97% concordam que a medida contribuiu para ampliar a participação dos estudantes nas atividades pedagógicas. Outros 95% avaliam que a restrição favoreceu a socialização presencial e a concentração durante as aulas.",
      },
    ],
  },

  // Lei 15.190/2025 — licenciamento ambiental
  {
    key: "agsenado-lgla-debate",
    publisher: "senado",
    title: "Licenciamento ambiental pode destravar o país, dizem senadores",
    url: "https://www12.senado.leg.br/noticias/materias/2025/05/21/licenciamento-ambiental-pode-destravar-o-pais-dizem-senadores",
    author: "Agência Senado",
    publishedOn: "2025-05-21",
    locator: "Parágrafos 1 a 5; seções Emaranhado normativo, Carta aberta, Petróleo e Críticas",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre a aprovação em 21/05/2025: registra o placar, a criação da LAE e posições a favor e contra o texto. Declarações não são fatos verificados.",
    excerpts: [
      { locator: "Parágrafo 1", text: "A aprovação, por 54 votos a 13, se refletiu nas falas dos senadores." },
      {
        locator: "Emaranhado normativo",
        text: "A realidade existente hoje, apontou a relatora, é um “cipoal” normativo com mais de 27 mil normas ambientais.",
      },
      {
        locator: "Petróleo",
        text: "Essa medida foi incluída no projeto por uma emenda apresentada em Plenário pelo presidente do Senado: a emenda prevê a criação da Licença Ambiental Especial (LAE).",
      },
    ],
  },
  {
    key: "agcamara-lgla-aprovacao",
    publisher: "camara",
    title: "Câmara aprova projeto que altera regras de licenciamento ambiental",
    url: "https://www.camara.leg.br/noticias/1181164-noticia",
    author: "Agência Câmara de Notícias",
    publishedOn: "2025-07-17",
    sourceUpdatedOn: "2025-07-17",
    locator: "Texto principal; seções Licença por adesão e Autoridades envolvidas",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Notícia institucional da Câmara sobre a aprovação final em 17/07/2025: resume as regras aprovadas. Descreve o texto antes dos vetos e da derrubada de parte deles.",
    excerpts: [
      {
        locator: "Parágrafo 2",
        text: "O substitutivo aprovado pela Câmara dos Deputados incorpora 29 emendas do Senado ao Projeto de Lei 2159/21, com parecer favorável do relator, deputado Zé Vitor (PL-MG).",
      },
      {
        locator: "Licença por adesão",
        text: "Cada ente federativo, conforme a competência concorrente de licenciamento ambiental, definirá quais atividades de pequeno ou médio porte e baixo ou médio potencial poluidor poderão usar a LAC, cuja vigência será de 5 a 10 anos.",
      },
      {
        locator: "Autoridades envolvidas",
        text: "Nota técnica da organização não governamental Instituto Socioambiental (ISA) indica que há pelo menos 259 terras indígenas em processo de demarcação (equivalente a 32% da área total desse tipo de terra) que ficariam de fora da análise por ainda não estarem homologadas.",
      },
    ],
  },
  {
    key: "agcamara-lgla-debate",
    publisher: "camara",
    title: "Deputados manifestam-se a favor e contra o projeto sobre licenciamento ambiental",
    url: "https://www.camara.leg.br/noticias/1181186-deputados-manifestam-se-a-favor-e-contra-o-projeto-sobre-licenciamento-ambiental",
    author: "Agência Câmara de Notícias",
    publishedOn: "2025-07-17",
    locator: "Parágrafos 2 a 5",
    materialType: "DECLARACAO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote: "Notícia institucional da Câmara com falas de deputados a favor e contra o projeto. Declarações não são fatos verificados.",
    excerpts: [
      {
        locator: "Parágrafo 2",
        text: "O coordenador da Frente Parlamentar da Agropecuária, deputado Pedro Lupion (PP-PR), lembrou que várias obras ferroviárias pelo Brasil estão paradas esperando o licenciamento ambiental",
      },
      {
        locator: "Parágrafo 3",
        text: "Já o coordenador da Frente Parlamentar Mista Ambientalista, deputado Nilto Tatto (PT-SP), afirmou que o texto não resolve os gargalos de licenciamento ambiental.",
      },
      {
        locator: "Parágrafo 4",
        text: "Para a deputada Sâmia Bomfim (Psol-SP), a aprovação do projeto poderá causar novas tragédias como as de Brumadinho e Mariana, em Minas Gerais, que passarão a ocorrer em todo o País.",
      },
    ],
  },
  {
    key: "agsenado-lgla-sancao",
    publisher: "senado",
    title: "Publicada Lei do Licenciamento Ambiental, com 63 vetos",
    url: "https://www12.senado.leg.br/noticias/materias/2025/08/08/publicada-lei-do-licenciamento-ambiental-com-63-vetos",
    author: "Agência Senado",
    publishedOn: "2025-08-08",
    locator: "Parágrafos 1 a 3; seções Vetados e Palavra final",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre a publicação da lei com vetos e a regra para derrubá-los. Descreve os vetos antes da análise pelo Congresso.",
    excerpts: [
      { locator: "Parágrafo 2", text: "Lula vetou 63 dos 400 dispositivos do projeto aprovado pelo Congresso" },
      {
        locator: "Parágrafo 3",
        text: "Uma medida provisória (MP 1.308/2025) e outro projeto de lei, com urgência constitucional, também foram assinados por Lula, para recompor em parte os dispositivos vetados.",
      },
      {
        locator: "Palavra final",
        text: "Para a rejeição do veto é necessária a maioria absoluta dos votos de deputados e senadores, ou seja, 257 votos de deputados e 41 votos de senadores, computados separadamente.",
      },
    ],
  },
  {
    key: "planalto-lgla-vetos",
    publisher: "planalto-noticias",
    title: "Governo detalha vetos e novo projeto para aperfeiçoar a Lei Geral do Licenciamento Ambiental",
    url: "https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/noticias/2025/08/governo-detalha-vetos-e-novo-projeto-para-aperfeicoar-a-lei-geral-do-licenciamento-ambiental",
    publishedOn: "2025-08-08",
    sourceUpdatedOn: "2026-10-26",
    locator: "Texto principal; seção Vetos",
    materialType: "DECLARACAO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Notícia da Presidência da República com a justificativa do governo para os vetos. Expressa a posição do Poder Executivo.",
    excerpts: [
      { locator: "Declaração da ministra Marina Silva", text: "Com esses vetos, conciliamos proteção ambiental, segurança jurídica e prosperidade econômica" },
      {
        locator: "Vetos",
        text: "Ao justificar os vetos, o Governo Federal seguiu quatro diretrizes: garantir a integridade do processo de licenciamento, assegurar os direitos dos povos indígenas e comunidades quilombolas, dar segurança jurídica a empreendimentos e investidores, e incorporar inovações que tornem o licenciamento mais ágil, sem comprometer sua qualidade.",
      },
    ],
  },
  {
    key: "agsenado-lgla-vetos-derrubados",
    publisher: "senado",
    title: "Congresso derruba 52 itens de veto à Lei Geral do Licenciamento Ambiental",
    url: "https://www12.senado.leg.br/noticias/materias/2025/11/27/congresso-derruba-52-itens-de-veto-a-lei-geral-do-licenciamento-ambiental",
    author: "Agência Senado",
    publishedOn: "2025-11-27",
    locator: "Parágrafo 1; seções Diálogo e consenso, Vetos, Dispensa do licenciamento ambiental e Entes federativos",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre a sessão de 27/11/2025: registra os itens restabelecidos e declarações de parlamentares, que não são fatos verificados.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "Por maioria de votos em ambas as Casas, o Congresso Nacional derrubou, nesta quinta-feira (27), veto do Poder Executivo à 52 pontos da Lei Geral do Licenciamento Ambiental",
      },
      {
        locator: "Diálogo e consenso",
        text: "Davi informou que houve acordo entre governo e oposição para o sobrestamento dos itens 32 a 38 que tratam da Licença Ambiental Especial (LAE).",
      },
      {
        locator: "Vetos",
        text: "Ele lembrou que muitos dos itens vetados são temas inconstitucionais, como os que atingem a Mata Atlântica, protegida pela Constituição.",
      },
    ],
  },
  {
    key: "congresso-vet29",
    publisher: "congresso",
    title: "Veto nº 29/2025 Parcial (Licenciamento ambiental)",
    url: "https://www.congressonacional.leg.br/materias/vetos/-/veto/detalhe/17570",
    publishedOn: "2025-11-27",
    locator: "Dados do veto; Dispositivos vetados / resultado; tramitação de 27/11/2025",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Página oficial do Veto 29/2025: identifica a origem do projeto, lista os dispositivos vetados e o resultado de cada um na sessão de 27/11/2025.",
    excerpts: [
      { locator: "Dados do veto", text: "Matéria vetada: PL 3729/2004 - Casa Iniciadora: Câmara dos Deputados" },
      { locator: "Dispositivos vetados / resultado", text: "Resultado da cédula apurada na Sessão Conjunta em 27/11/2025" },
      { locator: "Plenário do Congresso Nacional, 27/11/2025", text: "Adiada a apreciação dos vetos aos dispositivos 29.25.032 a 29.25.038." },
    ],
  },
  {
    key: "senado-pl2159",
    publisher: "senado",
    title: "Projeto de Lei n° 2159, de 2021",
    url: "https://www25.senado.leg.br/web/atividade/materias/-/materia/148785",
    publishedOn: "2025-08-08",
    locator: "Situação atual",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Registro oficial da tramitação do PL 2.159/2021 no Senado: confirma a sanção com veto parcial em 08/08/2025.",
    excerpts: [{ locator: "Estado atual", text: "08/08/2025 - TRANSFORMADA EM NORMA JURÍDICA COM VETO PARCIAL" }],
  },
  {
    key: "senado-norma-lei15190",
    publisher: "senado",
    title: "Lei nº 15.190 de 08/08/2025 (Legislação Federal — Senado Federal)",
    url: "https://legis.senado.leg.br/norma/41198421",
    publishedOn: "2025-08-08",
    locator: "Ementa; Publicação do Texto Principal; Normas posteriores",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Ficha da norma na base de legislação do Senado: confirma a ementa, as publicações no Diário Oficial (inclusive a da parte do veto rejeitada) e as normas posteriores que alteram a lei. O conteúdo dessas normas não foi lido.",
    excerpts: [
      { locator: "Ementa", text: "Dispõe sobre o licenciamento ambiental; regulamenta o inciso IV do § 1º do art. 225 da Constituição Federal" },
      {
        locator: "Publicação do Texto Principal",
        text: "[ Publicação de Veto Parcialmente Rejeitado ] (Seq. 1) [Diário Oficial da União de 08/12/2025] (p. 1, col. 1)",
      },
    ],
  },
  {
    key: "planalto-lei15190",
    publisher: "planalto-legislacao",
    title: "Lei nº 15.190, de 8 de agosto de 2025 (Lei Geral do Licenciamento Ambiental)",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15190.htm",
    publishedOn: "2025-08-08",
    locator: "arts. 1º, 22 e 67 (texto compilado)",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Texto oficial compilado da lei, conferido no Portal da Legislação do Planalto em 23/11/2026, com as partes promulgadas após a derrubada dos vetos. Os trechos citados não esgotam a lei.",
    excerpts: [
      {
        locator: "art. 1º, caput",
        text: "Art. 1º Esta Lei, denominada Lei Geral do Licenciamento Ambiental, estabelece normas gerais para o licenciamento de atividade ou de empreendimento utilizador de recursos ambientais, efetiva ou potencialmente poluidor ou capaz, sob qualquer forma, de causar degradação do meio ambiente, previsto no art. 10 da Lei nº 6.938, de 31 de agosto de 1981.",
      },
      {
        locator: "art. 1º, § 1º",
        text: "§ 1º As disposições desta Lei aplicam-se ao licenciamento ambiental realizado perante os órgãos e entidades da União, dos Estados, do Distrito Federal e dos Municípios integrantes do Sistema Nacional do Meio Ambiente (Sisnama), observadas as atribuições estabelecidas na Lei Complementar nº 140, de 8 de dezembro de 2011.",
      },
      {
        locator: "art. 22, caput e inciso I (promulgação de partes vetadas)",
        text: "Art. 22. O licenciamento ambiental simplificado pela modalidade por adesão e compromisso pode ocorrer se forem atendidas, cumulativamente, as seguintes condições: (Promulgação partes vetadas) I - a atividade ou o empreendimento for qualificado, simultaneamente, como de pequeno ou médio porte e baixo ou médio potencial poluidor;",
      },
      { locator: "art. 67", text: "Art. 67. Esta Lei entra em vigor após decorridos 180 (cento e oitenta) dias de sua publicação oficial." },
    ],
  },
  {
    key: "stf-adis-lgla",
    publisher: "stf",
    title: "Partidos e associações questionam pontos da Lei Geral de Licenciamento Ambiental",
    url: "https://noticias.stf.jus.br/postsnoticias/partidos-e-associacoes-questionam-pontos-da-lei-geral-de-licenciamento-ambiental/",
    author: "Edilene Cordeiro e Suélen Pires (STF)",
    publishedOn: "2025-12-29",
    locator: "Parágrafo 1; seções Flexibilização, Cooperação federativa, Licença especial e Pedido de informações",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia oficial do STF sobre as ADIs 7913, 7916 e 7919. Registra os argumentos dos autores e um despacho inicial; não há decisão de mérito na notícia.",
    excerpts: [
      { locator: "Parágrafo 1", text: "As ações foram distribuídas ao ministro Alexandre de Moraes." },
      {
        locator: "Flexibilização",
        text: "A legenda sustenta que a flexibilização do processo de licenciamento viola o direito fundamental ao meio ambiente equilibrado e os princípios da precaução e da proibição de retrocesso social.",
      },
      {
        locator: "Licença especial",
        text: "Na ADI 7919, além da Lei Geral de Licenciamento Ambiental, o PSOL e a Apib questionam a Lei 15.300/2025, que regulamentou a Licença Ambiental Especial (LAE).",
      },
    ],
  },

  // Lei 15.211/2025 — ECA Digital
  {
    key: "planalto-lei15211",
    publisher: "planalto-legislacao",
    title: "Lei nº 15.211, de 17 de setembro de 2025 (Estatuto Digital da Criança e do Adolescente)",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm",
    publishedOn: "2025-09-17",
    locator: "arts. 7º, 24, 31, 34, 35, 36-A, 37 e 41-A (texto compilado)",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Texto oficial compilado da lei, conferido no Portal da Legislação do Planalto em 23/11/2026, com as alterações das Leis 15.352/2026 e 15.504/2026. Os trechos citados não esgotam a lei.",
    excerpts: [
      {
        locator: "art. 7º, caput",
        text: "Art. 7º Os fornecedores de produtos ou serviços de tecnologia da informação direcionados a crianças e a adolescentes ou de acesso provável por eles deverão, desde a concepção de seus produtos e serviços, garantir, por padrão, a configuração no modelo mais protetivo disponível em relação à privacidade e à proteção de dados pessoais, considerados a autonomia e o desenvolvimento progressivo do indivíduo e justificado o melhor interesse da criança e do adolescente.",
      },
      {
        locator: "art. 31, caput",
        text: "Art. 31. Os provedores de aplicações de internet direcionadas a crianças e a adolescentes ou de acesso provável por eles que possuírem mais de 1.000.000 (um milhão) de usuários nessa faixa etária registrados, com conexão de internet no território nacional, deverão elaborar relatórios semestrais, em língua portuguesa, a serem publicados no sítio eletrônico do provedor",
      },
      {
        locator: "art. 37, parágrafo único",
        text: "A regulamentação não poderá, em nenhuma hipótese, impor, autorizar ou resultar na implantação de mecanismos de vigilância massiva, genérica ou indiscriminada",
      },
      { locator: "art. 41-A", text: "Art. 41-A. Esta Lei entra em vigor em 17 de março de 2026. (Incluído pela Lei nº 15.352, de 2026)" },
    ],
  },
  {
    key: "agcamara-eca-aprovacao",
    publisher: "camara",
    title: "Câmara aprova projeto sobre proteção de crianças em ambientes digitais",
    url: "https://www.camara.leg.br/noticias/1191188-noticia",
    author: "Agência Câmara de Notícias",
    publishedOn: "2025-08-20",
    sourceUpdatedOn: "2025-08-21",
    locator: "Parágrafos 2 e 3; seções Fim de censuras e Recuo",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Notícia institucional da Câmara sobre a aprovação em 20/08/2025, com mudanças: registra o texto da época e declarações de deputados, que não são fatos verificados.",
    excerpts: [
      {
        locator: "Parágrafo 2",
        text: "De autoria do Senado, o Projeto de Lei 2628/22 foi aprovado nesta quarta-feira (20) com mudanças feitas pelos deputados.",
      },
      {
        locator: "Parágrafo 3",
        text: "O relator do projeto, deputado Jadyel Alencar (Republicanos-PI), disse ter alterado a proposta para garantir que as famílias exerçam o papel de proteção de forma eficaz, sem substituí-lo pelas plataformas.",
      },
      {
        locator: "Seção final",
        text: "Porém, o líder do Novo, deputado Marcel van Hattem (RS), afirmou que o texto ainda possui dispositivos que permitem ao governo fazer, por medida provisória, a regulação do tema.",
      },
    ],
  },
  {
    key: "agsenado-eca-aprovacao",
    publisher: "senado",
    title: "Adultização: Senado aprova projeto para proteger crianças em ambientes digitais",
    url: "https://www12.senado.leg.br/noticias/materias/2025/08/27/adultizacao-senado-aprova-projeto-para-proteger-criancas-em-ambientes-digitais",
    author: "Agência Senado",
    publishedOn: "2025-08-27",
    locator: "Parágrafos 1 a 9; seções Penalidades e Caixas de recompensas",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre a votação final em 27/08/2025: resume o texto aprovado e registra declarações de senadores, que não são fatos verificados.",
    excerpts: [
      {
        locator: "Parágrafo 3",
        text: "Apresentada pelo senador Alessandro Vieira (MDB-SE) em 2022, a proposta sofreu modificações durante votação na Câmara na quarta-feira (20).",
      },
      { locator: "Declaração do autor", text: "Esta é a primeira lei das Américas sobre o tema." },
      {
        locator: "Penalidades",
        text: "As penalidades mais severas — suspensão ou proibição de atividades — só poderão ser impostas pelo Poder Judiciário.",
      },
    ],
  },
  {
    key: "senado-pl2628",
    publisher: "senado",
    title: "Projeto de Lei n° 2628, de 2022 (Substitutivo da Câmara dos Deputados)",
    url: "https://www25.senado.leg.br/web/atividade/materias/-/materia/170017",
    publishedOn: "2025-09-19",
    locator: "Situação atual",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Registro oficial da tramitação do PL 2.628/2022 no Senado: confirma a transformação em lei com veto parcial.",
    excerpts: [{ locator: "Estado atual", text: "19/09/2025 - TRANSFORMADA EM NORMA JURÍDICA COM VETO PARCIAL" }],
  },
  {
    key: "camara-legin-lei15211",
    publisher: "camara",
    title: "LEI Nº 15.211, DE 17 DE SETEMBRO DE 2025 (Legislação Informatizada — Dados da Norma)",
    url: "https://www2.camara.leg.br/legin/fed/lei/2025/lei-15211-17-setembro-2025-797997-norma-pl.html",
    publishedOn: "2025-09-17",
    locator: "Ementa; Veto; Vide Norma(s)",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Ficha da lei na base de legislação da Câmara: ementa, dispositivos vetados e normas posteriores (decretos, medidas provisórias e leis). Não descreve o conteúdo dessas normas.",
    excerpts: [
      {
        locator: "Ementa",
        text: "EMENTA: Dispõe sobre a proteção de crianças e adolescentes em ambientes digitais (Estatuto Digital da Criança e do Adolescente).",
      },
      { locator: "Vide Norma(s)", text: "Lei Ordinária nº 15504 de 15 de Setembro de 2026 (Poder Legislativo) - (Acréscimo de Artigo)." },
      { locator: "Vide Norma(s)", text: "Medida Provisória nº 1319 de 17 de Setembro de 2025 (Poder Executivo) - (Alteração sem Eficácia)." },
      { locator: "Vide Norma(s)", text: "Medida Provisória nº 1318 de 17 de Setembro de 2025 (Poder Executivo) - (Alteração sem Eficácia)." },
    ],
  },
  {
    key: "planalto-vep1307-2025",
    publisher: "planalto-legislacao",
    title: "Mensagem nº 1.307, de 17 de setembro de 2025 (veto parcial ao PL 2.628/2022)",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Msg/Vep/VEP-1307-25.htm",
    publishedOn: "2025-09-17",
    locator: "Dispositivos vetados e razões do veto",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Mensagem oficial de veto, conferida no Planalto em 23/11/2026: identifica os três dispositivos vetados e as razões apresentadas pelo governo. A decisão final sobre o veto cabe ao Congresso.",
    excerpts: [
      {
        locator: "Abertura",
        text: "decidi vetar parcialmente, por inconstitucionalidade e contrariedade ao interesse público, o Projeto de Lei nº 2.628, de 2022",
      },
      {
        locator: "§ 7º do art. 35 do projeto (vetado)",
        text: "§ 7º Compete à Agência Nacional de Telecomunicações (Anatel) encaminhar as ordens de bloqueio previstas no § 6º deste artigo, facultada a ela a definição da técnica mais adequada para a sua implementação.",
      },
      {
        locator: "art. 36 do projeto (vetado)",
        text: "Art. 36. Os valores decorrentes das multas aplicadas com base nesta Lei serão destinados ao Fundo Nacional para a Criança e o Adolescente, instituído pela Lei nº 8.242, de 12 de outubro de 1991, a serem utilizados necessariamente em políticas e projetos que tenham por objetivo a proteção de crianças e de adolescentes.",
      },
      { locator: "art. 41 do projeto (vetado)", text: "Art. 41. Esta Lei entra em vigor após decorrido 1 (um) ano de sua publicação oficial." },
    ],
  },
  {
    key: "mjsp-lei15352-eca",
    publisher: "mjsp",
    title: "Sancionado projeto que fortalece a ANPD e fixa início da vigência do ECA Digital",
    url: "https://www.gov.br/mj/pt-br/assuntos/noticias/sancionado-projeto-que-fortalece-a-anpd-e-fixa-inicio-da-vigencia-do-eca-digital",
    publishedOn: "2026-02-26",
    sourceUpdatedOn: "2026-10-25",
    locator: "Texto principal; seção O ECA Digital",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia do Ministério da Justiça sobre a Lei 15.352/2026 e as obrigações aplicáveis desde 17/03/2026. É um resumo do governo; em caso de diferença, prevalece o texto da lei.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "A proposta transforma a Autoridade Nacional de Proteção de Dados (ANPD) em agência reguladora e mantém o órgão vinculado ao Ministério da Justiça e Segurança Pública (MJSP).",
      },
      {
        locator: "O ECA Digital",
        text: "A partir de 17 de março, a nova legislação proíbe a autodeclaração de idade em sites e produtos digitais restritos a menores de 18 anos.",
      },
      {
        locator: "O ECA Digital",
        text: "Jogos eletrônicos com caixas de recompensa devem impedir o acesso de crianças e adolescentes ou oferecer versões sem essa funcionalidade;",
      },
    ],
  },
  {
    key: "anpd-eca-digital",
    publisher: "anpd",
    title: "Eca Digital",
    url: "https://www.gov.br/anpd/pt-br/assuntos/eca-digital",
    publishedOn: "2026-06-01",
    sourceUpdatedOn: "2026-06-10",
    locator: "Seções ECA Digital e Aferição de Idade",
    materialType: "CONTEUDO_DIDATICO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Página oficial da ANPD sobre o ECA Digital: competências da agência e situação das orientações sobre aferição de idade na última atualização (10/06/2026).",
    excerpts: [
      {
        locator: "ECA Digital",
        text: "Após a sanção da lei, foi editado o Decreto nº 12.622, de 17 de setembro de 2025, que conferiu à ANPD a competência para zelar pela aplicação da nova legislação, regulamentar parte de seus dispositivos e fiscalizar o seu cumprimento em todo o território nacional.",
      },
      {
        locator: "Aferição de Idade",
        text: "O documento reflete a posição institucional da ANPD e servirá de referência para as atividades de monitoramento da Agência até a publicação de orientações definitivas, após consulta à sociedade.",
      },
      {
        locator: "Aferição de Idade",
        text: "O guia recebeu uma proposta de atualização pela ANPD e foi submetido à Tomada de Subsídios. As contribuições estão sendo consolidadas.",
      },
    ],
  },
  {
    key: "congresso-vet32",
    publisher: "congresso",
    title: "Veto nº 32/2025 Parcial (Sanções previstas no Estatuto Digital da Criança e do Adolescente)",
    url: "https://www.congressonacional.leg.br/materias/vetos/-/veto/detalhe/17609",
    publishedOn: "2025-09-17",
    locator: "Dados do veto; Inclusões na Ordem do Dia",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote: "Página oficial do Veto 32/2025, consultada em 21/11/2026: situação de tramitação e resultado (ainda não apreciado) dos três dispositivos vetados.",
    excerpts: [
      { locator: "Cabeçalho", text: "Veto nº 32/2025 Parcial Em tramitação Sobrestando pauta" },
      { locator: "Dados do veto", text: "Recebido no Congresso Nacional: em 18/09/2025 Sobrestando a pauta a partir de: 18/10/2025" },
      { locator: "Inclusões na Ordem do Dia", text: "18/06/2026 Votação, em turno único - Não apreciado" },
    ],
  },
  {
    key: "planalto-decreto12880",
    publisher: "planalto-legislacao",
    title: "Decreto nº 12.880, de 18 de março de 2026",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12880.htm",
    publishedOn: "2026-03-18",
    locator: "Ementa e art. 1º",
    materialType: "ATO_REGISTRO",
    reuseKind: "OFFICIAL_ACT",
    reuseCondition: REUSE.officialAct,
    scopeNote:
      "Texto oficial do decreto, conferido no Planalto em 23/11/2026 (ementa e art. 1º). Os demais artigos não foram resumidos neste acontecimento.",
    excerpts: [
      {
        locator: "Ementa",
        text: "Regulamenta a Lei nº 15.211, de 17 de setembro de 2025, que dispõe sobre a proteção de crianças e adolescentes em ambientes digitais, e institui a Política Nacional de Promoção e Proteção dos Direitos da Criança e do Adolescente no Ambiente Digital.",
      },
      {
        locator: "art. 1º, parágrafo único",
        text: "Parágrafo único. Competem à Agência Nacional de Proteção de Dados – ANPD a regulamentação e a fiscalização do disposto na Lei nº 15.211, de 17 de setembro de 2025",
      },
    ],
  },

  // Eleições gerais de 2026
  {
    key: "agsenado-calendario-2026",
    publisher: "senado",
    title: "Confira datas e prazos do calendário eleitoral de 2026",
    url: "https://www12.senado.leg.br/noticias/infomaterias/2026/03/confira-datas-e-prazos-do-calendario-eleitoral-de-2026",
    author: "Agência Senado",
    publishedOn: "2026-03-12",
    locator: "Introdução; calendário de dezembro de 2026 a fevereiro de 2027",
    materialType: "CONTEUDO_DIDATICO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Infográfico da Agência Senado que reproduz o calendário eleitoral divulgado pelo TSE. As datas de diplomação e de posse são previsões do calendário.",
    excerpts: [
      { locator: "Introdução", text: "O primeiro turno das eleições está marcado para 4 de outubro, com eventual segundo turno em 25 de outubro." },
      { locator: "Introdução", text: "Entre os marcos mais importantes está o início da propaganda eleitoral, em 16 de agosto." },
      { locator: "Calendário — Dezembro 2026", text: "18 de Dezembro • Justiça Prazo para diplomação dos eleitos" },
      {
        locator: "Calendário — Janeiro e Fevereiro 2027",
        text: "05 de Janeiro • Geral Posse Presidencial 06 de Janeiro • Geral Posse de Governadores e Vice-Governadores Fevereiro 2027 01 de Fevereiro • Geral Posse de Senadores e Deputados Federais",
      },
    ],
  },
  {
    key: "agcamara-lula-reeleito",
    publisher: "camara",
    title: "Lula é reeleito presidente com quase 52% dos votos válidos no 2º turno",
    url: "https://www.camara.leg.br/noticias/1313705-lula-e-reeleito-presidente-com-quase-52-dos-votos-validos-no-2o-turno",
    author: "Agência Câmara de Notícias",
    publishedOn: "2026-10-25",
    sourceUpdatedOn: "2026-10-26",
    locator: "Parágrafos 1 a 5",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Notícia institucional da Câmara com os resultados do 1º e do 2º turno da eleição presidencial, segundo o TSE. O portal do TSE não pôde ser consultado diretamente.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "O presidente da República, Luiz Inácio Lula da Silva (PT), foi reeleito neste domingo (25) com 51,79% dos votos válidos no segundo turno, alcançando um inédito quarto mandato. O senador Flávio Bolsonaro (PL) ficou com 48,21%.",
      },
      { locator: "Parágrafo 2", text: "Lula obteve 64.256.232 votos" },
      { locator: "Parágrafo 3", text: "No primeiro turno, Flávio havia obtido 47,03% dos votos válidos, contra 45,16% de Lula." },
      {
        locator: "Parágrafo 4",
        text: "Segundo o Tribunal Superior Eleitoral (TSE), apenas 19,22% dos eleitores e eleitoras aptos deixaram de votar",
      },
    ],
  },
  {
    key: "agsenado-lula-reeleito",
    publisher: "senado",
    title: "Lula é reeleito para quarto mandato de presidente",
    url: "https://www12.senado.leg.br/noticias/materias/2026/10/25/lula-e-reeleito-para-quarto-mandato-de-presidente",
    author: "Agência Senado",
    publishedOn: "2026-10-25",
    sourceUpdatedOn: "2026-10-25",
    locator: "Parágrafos 1 a 5; seção Prorrogação",
    materialType: "ATO_REGISTRO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaSenado,
    scopeNote:
      "Notícia institucional do Senado sobre o resultado, a prorrogação da votação e declarações dos candidatos. Declarações não são fatos verificados; números parciais variam conforme o horário da apuração.",
    excerpts: [
      { locator: "Parágrafo 1", text: "A posse será no dia 5 de janeiro de 2027." },
      {
        locator: "Parágrafo 4",
        text: "Ao fim da apuração, às 22h33, Lula obteve o total de 64,2 milhões de votos (51,78%), contra 59,8 milhões de votos de Flávio (48,22%).",
      },
      {
        locator: "Prorrogação",
        text: "A medida valeu para todos os locais em que as urnas ainda estavam abertas no momento da decisão, que ocorreu logo após as 17h. As urnas já fechadas não foram reabertas.",
      },
      { locator: "Prorrogação", text: "Após a derrota, Flávio afirmou que vai pedir anulação das eleições" },
    ],
  },
  {
    key: "agcamara-tse-presidente",
    publisher: "camara",
    title: "Presidente do TSE afirma que a decisão de prorrogar a votação exigiu medidas extraordinárias",
    url: "https://www.camara.leg.br/noticias/1313728-presidente-do-tse-afirma-que-a-decisao-de-prorrogar-a-votacao-exigiu-medidas-extraordinarias",
    author: "Agência Câmara de Notícias",
    publishedOn: "2026-10-25",
    locator: "Parágrafos 1 a 9; seções Prorrogação e Comparecimento e acesso à votação",
    materialType: "DECLARACAO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Notícia institucional da Câmara com declarações do presidente do TSE sobre a prorrogação e o balanço do 2º turno. Expressa a avaliação do ministro.",
    excerpts: [
      { locator: "Parágrafo 2", text: "Segundo ele, não havia norma que autorizasse a prorrogação." },
      {
        locator: "Parágrafo 6",
        text: "Nunes Marques ressaltou que a decisão judicial foi cumprida integralmente e que não houve comprometimento da apuração.",
      },
      { locator: "Parágrafo 9", text: "Prorrogar uma eleição é possível, mas ela tem que ser pensada, ela tem que ser calculada e estruturada" },
      { locator: "Comparecimento e acesso à votação", text: "O percentual de abstenção foi de 19,21%" },
    ],
  },
  {
    key: "stf-prorrogacao-votacao",
    publisher: "stf",
    title: "STF prorroga votação até as 19h em locais onde urnas permaneceram abertas após as 17h",
    url: "https://noticias.stf.jus.br/postsnoticias/stf-prorroga-votacao-ate-as-19h-em-locais-onde-urnas-permaneceram-abertas-apos-as-17h/",
    author: "Suélen Pires (STF)",
    publishedOn: "2026-10-25",
    locator: "Parágrafos 1 a 3",
    materialType: "ATO_REGISTRO",
    reuseKind: "REFERENCE_ONLY",
    reuseCondition: REUSE.referenceOnly,
    scopeNote:
      "Notícia oficial do STF sobre a liminar na Reclamação 101673, que prorrogou a votação do 2º turno. Decisão provisória; a notícia não informa desdobramentos.",
    excerpts: [
      {
        locator: "Parágrafo 1",
        text: "O ministro Cristiano Zanin, do Supremo Tribunal Federal (STF), estendeu o período de votação até as 19h em todos os municípios brasileiros, nos locais onde as urnas não foram fechadas às 17h.",
      },
      {
        locator: "Parágrafo 2",
        text: "A decisão foi tomada na Reclamação (Rcl) 101673, apresentada pela Coligação Brasil Pronto Pra Mais contra atos dos municípios baianos de Salvador, Feira de Santana e Lauro de Freitas, que reduziram, neste domingo, a oferta de transporte público coletivo.",
      },
      {
        locator: "Parágrafo 2",
        text: "A coligação apontava desacordo com a decisão do STF na Arguição de Descumprimento de Preceito Fundamental (ADPF) 1013, na qual decidiu que o poder público tem o dever de fornecer serviço gratuito de transporte coletivo nos dias de eleições.",
      },
      {
        locator: "Parágrafo 3",
        text: "Porém, o ministro observou que as duas candidaturas que disputam as eleições presidenciais no segundo turno alegaram problemas de transporte de eleitores, razão pela qual concedeu a liminar.",
      },
    ],
  },
  {
    key: "agcamara-renovacao",
    publisher: "camara",
    title: "Taxa de renovação da Câmara dos Deputados fica em 33,72%",
    url: "https://www.camara.leg.br/noticias/1309174-taxa-de-renovacao-da-camara-dos-deputados-fica-em-3567",
    author: "Agência Câmara de Notícias",
    publishedOn: "2026-10-05",
    sourceUpdatedOn: "2026-10-14",
    locator: "Parágrafos 1 e 2 (com a atualização do critério)",
    materialType: "DADO_ESTATISTICO",
    reuseKind: "OPEN_LICENSE",
    reuseCondition: REUSE.agenciaCamara,
    scopeNote:
      "Levantamento da Agência Câmara sobre deputados federais de primeiro mandato eleitos em 2026, com o critério usado na contagem e a correção do percentual divulgado inicialmente.",
    excerpts: [
      { locator: "Parágrafo 1", text: "Dos 513 deputados federais eleitos ontem, 173 vão exercer seu primeiro mandato na Câmara dos Deputados." },
      { locator: "Parágrafo 1", text: "Esse número representa uma taxa de renovação de 33,72% dos integrantes da Casa." },
      {
        locator: "Atualização",
        text: "Atualização: o percentual de renovação inicialmente divulgado foi de 35,67%, mas foi alterado em razão da mudança de conceito sobre \"deputado novo\".",
      },
    ],
  },
];
