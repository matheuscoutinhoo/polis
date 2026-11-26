import type { SeedModule } from "./types";

export const moduloHistoria: SeedModule = {
  slug: "historia-politica-do-brasil",
  number: 13,
  title: "História política do Brasil",
  summary: "Constituições, voto e regimes políticos como contexto para os debates atuais.",
  area: "INSTITUICOES",
  stage: "CONTEXT",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "constituicoes-e-voto",
      number: 1,
      title: "Constituições e a ampliação do voto",
      objective: "Situar as sete Constituições brasileiras e as mudanças sobre quem podia votar.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "As regras sobre quem pode votar no Brasil mudaram ao longo do tempo. Esta lição situa as sete Constituições do país e mostra, em ordem cronológica, alguns marcos dessas mudanças: do decreto de 1932 à regra em vigor hoje.",
        blocks: [
          { type: "heading", text: "Sete Constituições" },
          {
            type: "paragraph",
            text: "Constituição é a norma que organiza o Estado e define direitos básicos, como as regras do voto. Segundo o glossário legislativo do Senado, o Brasil teve sete: as de 1824, 1891, 1934, 1937, 1946, 1967 e 1988. A atual foi promulgada em 5 de outubro de 1988 e ficou conhecida como Constituição Cidadã. As sete não foram adotadas da mesma forma:",
            sources: ["senado-glossario-constituicoes", "cf88-art14"],
          },
          {
            type: "quote",
            text: "Das sete Constituições, quatro foram promulgadas por assembleias constituintes, duas foram impostas — uma por D. Pedro I e outra por Getúlio Vargas — e uma aprovada pelo Congresso por exigência do regime militar.",
            sourceKey: "senado-glossario-constituicoes",
            locator: "Introdução",
          },
          {
            type: "definition",
            term: "Constituição promulgada e Constituição imposta",
            text: "Uma Constituição promulgada por assembleia constituinte é elaborada e aprovada por um grupo de representantes reunido para essa tarefa. Uma Constituição imposta é editada por quem governa, sem passar por uma assembleia. O regime militar citado no trecho, período em que militares governaram o país, é tema da próxima lição.",
            sources: ["senado-glossario-constituicoes"],
          },
          {
            type: "paragraph",
            text: "A Constituição de 1934 criou a Justiça Eleitoral e a Justiça do Trabalho, ramos da Justiça dedicados às eleições e às relações de trabalho. A de 1937 foi imposta por Getúlio Vargas, no período chamado Estado Novo. Segundo o glossário do Senado, ela suprimiu os partidos e concentrou o poder no Executivo, o Poder chefiado pelo presidente.",
            sources: ["senado-glossario-constituicoes"],
          },
          { type: "heading", text: "Quem podia votar" },
          {
            type: "definition",
            term: "Alistamento, voto obrigatório e voto facultativo",
            text: "Alistamento eleitoral é a inscrição da pessoa como eleitora; sem ele, não se vota. Quando o voto é obrigatório, quem está na regra precisa se alistar e votar. Quando é facultativo, a pessoa escolhe se faz isso. No voto secreto, a escolha de cada eleitor não é revelada.",
            sources: ["cf88-art14", "decreto-21076-1932"],
          },
          {
            type: "comparison",
            title: "Quatro marcos sobre o direito de voto",
            intro: "Cada marco traz a regra, quem podia votar, uma ressalva e a fonte.",
            orderNote: "Ordem cronológica, do marco mais antigo à regra atual.",
            items: [
              {
                label: "1932",
                heading: "Código Eleitoral, por decreto",
                text: "Regra: o Decreto nº 21.076, do então presidente Getúlio Vargas, definiu o eleitor sem distinção de sexo. Quem podia votar: pelo art. 2º, o cidadão maior de 21 anos alistado na forma do Código, inclusive mulheres. Ressalva: outras condições da época não são detalhadas aqui. Fonte: o próprio decreto e texto do Senado sobre o voto feminino.",
                sources: ["decreto-21076-1932", "senado-voto-feminino-94-anos"],
              },
              {
                label: "1934",
                heading: "Constituição de 1934",
                text: "Regra: a nova Constituição incorporou o voto feminino e tornou o voto secreto e obrigatório. Quem podia votar: pessoas a partir dos 18 anos, inclusive mulheres. Ressalva: mendigos e analfabetos continuaram impedidos de votar, e, para as mulheres, o voto ainda era facultativo. Fonte: glossário do Senado e texto do Senado sobre o voto feminino.",
                sources: ["senado-glossario-constituicoes", "senado-voto-feminino-94-anos"],
              },
              {
                label: "1965",
                heading: "Equiparação do voto feminino",
                text: "Regra: o voto das mulheres foi equiparado ao dos homens. Quem podia votar: as mulheres passaram a ter o voto obrigatório, como os homens. Ressalva: esta lição não detalha a norma que fez a mudança nem as demais regras eleitorais daquele ano. Fonte: texto do Senado sobre o voto feminino.",
                sources: ["senado-voto-feminino-94-anos"],
              },
              {
                label: "1988",
                heading: "Constituição de 1988 (regra atual)",
                text: "Regra: o voto é direto e secreto, com valor igual para todos. Quem pode votar: alistamento e voto são obrigatórios para maiores de 18 anos. Ressalva: são facultativos para analfabetos, para maiores de 70 anos e para jovens de 16 e 17 anos. Fonte: art. 14 da Constituição de 1988.",
                sources: ["cf88-art14"],
              },
            ],
          },
          {
            type: "example",
            title: "Exemplo: a mesma pessoa em três épocas",
            text: "Imagine uma mulher de 19 anos que não sabe ler. Em 1932, ela não seria eleitora: o art. 2º do decreto exigia ser maior de 21 anos. Em 1934, a idade mínima passou a ser 18 anos, mas a Constituição manteve a proibição do voto de analfabetos; ela continuaria sem votar. Hoje, pela Constituição de 1988, ela pode se alistar e votar, de forma facultativa, porque é analfabeta. Se aprender a ler, o voto passa a ser obrigatório para ela.",
            sources: ["decreto-21076-1932", "senado-glossario-constituicoes", "cf88-art14"],
          },
          {
            type: "limit",
            title: "Limites desta lição",
            text: "Fontes oficiais descrevem de formas diferentes as condições de 1932 para o voto das mulheres. Por isso, esta lição fica nos pontos em que elas coincidem: o decreto de 1932 definiu o eleitor sem distinção de sexo, e a Constituição de 1934 incorporou o voto feminino. A lição também não detalha cada uma das sete Constituições; o glossário do Senado traz um resumo de cada uma.",
          },
        ],
        relatedConcepts: [
          { term: "Assembleia constituinte", explanation: "Grupo de representantes reunido para elaborar e aprovar uma Constituição." },
          {
            term: "Sufrágio universal",
            explanation: "Direito de voto de todas as pessoas que cumprem as condições gerais da Constituição, como a idade mínima; a Constituição de 1988 o prevê no art. 14.",
          },
          {
            term: "Voto facultativo",
            explanation: "Voto que a pessoa pode escolher exercer; hoje vale para analfabetos, maiores de 70 anos e jovens de 16 e 17 anos.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo o glossário do Senado, como foi adotada a Constituição de 1937?",
            options: [
              { id: "a", text: "Foi promulgada por uma assembleia constituinte" },
              { id: "b", text: "Foi imposta por Getúlio Vargas" },
              { id: "c", text: "Foi aprovada pelo Congresso por exigência do regime militar" },
            ],
            correctOptionId: "b",
            explanation:
              "A Constituição de 1937 foi imposta por Getúlio Vargas, no Estado Novo, e suprimiu os partidos. Das sete Constituições, quatro foram promulgadas por assembleias constituintes e uma foi aprovada pelo Congresso por exigência do regime militar; a de 1937 não está em nenhum desses dois grupos.",
          },
          {
            id: "q2",
            prompt: "Segundo o texto do Senado sobre o voto feminino, o que mudou para as mulheres em 1965?",
            options: [
              { id: "a", text: "Elas puderam votar pela primeira vez" },
              { id: "b", text: "O voto delas foi equiparado ao dos homens e se tornou obrigatório" },
              { id: "c", text: "Elas passaram a poder ser candidatas pela primeira vez" },
            ],
            correctOptionId: "b",
            explanation:
              "O direito de votar e de ser votada veio em 1932, por decreto, e foi incorporado pela Constituição de 1934, ainda de forma facultativa para as mulheres. A mudança de 1965 foi a equiparação ao voto masculino, que tornou o voto obrigatório também para elas.",
          },
          {
            id: "q3",
            prompt: "Pela Constituição de 1988, para quem o voto é facultativo?",
            options: [
              { id: "a", text: "Para todas as pessoas maiores de 18 anos" },
              { id: "b", text: "Para analfabetos, maiores de 70 anos e jovens de 16 e 17 anos" },
              { id: "c", text: "Apenas para as mulheres" },
              { id: "d", text: "Para quem tem entre 18 e 70 anos" },
            ],
            correctOptionId: "b",
            explanation:
              "O art. 14 torna alistamento e voto obrigatórios para maiores de 18 anos e facultativos para analfabetos, maiores de 70 anos e jovens de 16 e 17 anos. O voto facultativo só para mulheres é de outro período: segundo o Senado, valia na Constituição de 1934 e mudou em 1965. Em 1934, analfabetos nem podiam votar.",
          },
        ],
      },
      sources: [
        {
          key: "senado-glossario-constituicoes",
          supports:
            "As sete Constituições (1824, 1891, 1934, 1937, 1946, 1967 e 1988) e como foram adotadas; promulgação da Constituição Cidadã em 5/10/1988; voto secreto e obrigatório a partir dos 18 anos, voto feminino e proibição para mendigos e analfabetos em 1934; criação da Justiça Eleitoral e da Justiça do Trabalho; Constituição de 1937 imposta por Vargas no Estado Novo, com supressão dos partidos e concentração de poder no Executivo.",
        },
        {
          key: "decreto-21076-1932",
          supports: "Art. 2º do Código Eleitoral de 1932: eleitor é o cidadão maior de 21 anos, sem distinção de sexo, alistado na forma do Código.",
        },
        {
          key: "senado-voto-feminino-94-anos",
          supports:
            "Direito das mulheres de votar e ser votadas por decreto do então presidente Getúlio Vargas em 1932; incorporação pela Constituição de 1934, ainda facultativo para as mulheres; equiparação ao voto masculino, obrigatório, em 1965.",
        },
        {
          key: "cf88-art14",
          supports:
            "Regra atual: voto direto e secreto, com valor igual para todos; alistamento e voto obrigatórios para maiores de 18 anos e facultativos para analfabetos, maiores de 70 anos e jovens de 16 e 17 anos.",
        },
      ],
    },
    {
      slug: "ditadura-e-redemocratizacao",
      number: 2,
      title: "Ditadura militar e redemocratização",
      objective: "Compreender o golpe de 1964, a repressão, a campanha das Diretas e a Constituinte de 1987–1988.",
      minutes: 7,
      currentKeys: [],
      content: {
        intro:
          "Em 1964, um golpe militar deu início a um período ditatorial no Brasil. Nos anos 1980, vieram a campanha por eleições diretas, uma eleição indireta para presidente e a Assembleia Constituinte, que elaborou a Constituição de 1988. Esta lição apresenta esses marcos com base em registros oficiais e indica quando um trecho é a interpretação de quem o escreveu.",
        blocks: [
          { type: "heading", text: "O golpe de 1964 e a repressão" },
          {
            type: "paragraph",
            text: "Golpe é a tomada do poder fora das regras previstas para a troca de governantes. Em uma exposição sobre o regime militar, o Arquivo Nacional descreve assim o início do período:",
            sources: ["memorias-reveladas-a-repressao"],
          },
          {
            type: "quote",
            text: "Em abril de 1964, um golpe militar depôs o presidente João Goulart (1961-1964), instituindo um período ditatorial no Brasil com o objetivo de resolver a crise econômica e afastar da política os opositores à nova ordem.",
            sourceKey: "memorias-reveladas-a-repressao",
            locator: "Abertura",
          },
          {
            type: "paragraph",
            text: "Segundo o Arquivo Nacional, atos institucionais, normas editadas pelo regime, permitiram cassar direitos políticos e mandatos. Cassar direitos políticos é retirar de alguém direitos como o de votar e o de ser votado; cassar um mandato é tirar do cargo alguém eleito. Os atos também permitiram extinguir partidos, julgar civis em tribunais militares e suspender o habeas corpus, pedido à Justiça contra prisões ilegais, nos crimes contra a segurança nacional. A exposição cita estimativas de cerca de 50 mil pessoas presas e 20 mil torturadas.",
            sources: ["memorias-reveladas-a-repressao"],
          },
          { type: "heading", text: "Diretas Já e eleição indireta" },
          {
            type: "paragraph",
            text: "Na eleição direta, os próprios eleitores escolhem quem ocupará o cargo. Na indireta, a escolha é feita por um grupo de representantes. Segundo a Agência Senado, depois de meses da campanha Diretas Já, a Câmara dos Deputados rejeitou, em 25 de abril de 1984, a emenda Dante de Oliveira (PEC 5/1983), que restabelecia a eleição direta para presidente. Em janeiro de 1985, o Congresso elegeu de forma indireta o civil (não militar) Tancredo Neves.",
            sources: ["senado-diretas-ja-40-anos"],
          },
          {
            type: "definition",
            term: "Proposta de emenda à Constituição (PEC)",
            text: "Proposta para mudar o texto da Constituição. Nem tudo pode ser mudado assim: o art. 60 da Constituição de 1988 proíbe deliberar sobre proposta de emenda que tente abolir certos pontos.",
            sources: ["cf88-art60"],
          },
          {
            type: "paragraph",
            text: "A reportagem da Agência Senado sobre os 40 anos da campanha faz esta interpretação:",
            sources: ["senado-diretas-ja-40-anos"],
          },
          {
            type: "quote",
            text: "Apesar da derrota, a campanha uniu o Brasil e enfraqueceu a ditadura militar.",
            sourceKey: "senado-diretas-ja-40-anos",
            locator: "Parágrafo 2",
          },
          { type: "heading", text: "A Constituinte e a Constituição de 1988" },
          {
            type: "paragraph",
            text: "Convocada em 1985, a Assembleia Nacional Constituinte foi instalada em 1º de fevereiro de 1987. Segundo a Agência Câmara, ela trabalhou por 20 meses, com 559 membros (72 senadores e 487 deputados), e teve ampla participação popular: foram 72.719 sugestões de cidadãos. A Constituição promulgada em 5 de outubro de 1988 criou o Sistema Único de Saúde (SUS) e definiu a educação como dever do Estado.",
            sources: ["camara-30-anos-constituinte"],
          },
          {
            type: "paragraph",
            text: "Redemocratização é a volta a um regime democrático. O infográfico da Agência Câmara avalia assim o papel da nova Constituição:",
            sources: ["camara-30-anos-constituinte"],
          },
          {
            type: "quote",
            text: "A Constituição Cidadã, promulgada em 5 de outubro de 1988, tornou-se o principal símbolo do processo de redemocratização nacional.",
            sourceKey: "camara-30-anos-constituinte",
            locator: "Texto principal",
          },
          {
            type: "paragraph",
            text: "Segundo o glossário do Senado, ela é a sétima Constituição do país; a anterior, de 1967, foi aprovada pelo Congresso por exigência do regime militar. Em seu art. 60, a Constituição de 1988 impede que uma proposta de emenda tente abolir o voto direto, secreto, universal e periódico, isto é, com eleições em intervalos regulares. Esse tipo de proteção é chamado de cláusula pétrea.",
            sources: ["senado-glossario-constituicoes", "cf88-art60"],
          },
          {
            type: "example",
            title: "Exemplo: de 1984 a 1989, em datas",
            text: "25 de abril de 1984: a Câmara rejeita a emenda Dante de Oliveira, que restabelecia a eleição direta para presidente. Janeiro de 1985: o Congresso elege de forma indireta o civil Tancredo Neves. 1º de fevereiro de 1987: é instalada a Assembleia Nacional Constituinte, convocada em 1985. 5 de outubro de 1988: a nova Constituição é promulgada. 1989: Fernando Collor é eleito, o primeiro presidente escolhido pelo voto popular desde 1964. Em cinco anos, a escolha do presidente passou de indireta a direta.",
            sources: ["senado-diretas-ja-40-anos", "camara-30-anos-constituinte"],
          },
          { type: "heading", text: "A Comissão Nacional da Verdade" },
          {
            type: "paragraph",
            text: "A Comissão Nacional da Verdade (CNV) foi criada pela Lei nº 12.528/2011 e instituída em 16 de maio de 2012. Segundo o Arquivo Nacional, sua finalidade foi apurar graves violações de direitos humanos ocorridas entre 18 de setembro de 1946 e 5 de outubro de 1988, período que começa antes do golpe de 1964. Entre os objetivos previstos na lei está esclarecer casos de torturas, mortes, desaparecimentos forçados e ocultação de cadáveres, e sua autoria. O relatório final da comissão tem três volumes.",
            sources: ["memorias-reveladas-cnv", "lei-12528-2011"],
          },
          {
            type: "limit",
            title: "Limites desta lição",
            text: "A lição não detalha cada ato institucional, cada governo do período nem as conclusões da CNV, que estão em seu relatório final. Os números de presos e torturados são estimativas citadas pelo Arquivo Nacional. Avaliações como “enfraqueceu a ditadura” e “principal símbolo” são interpretações dos textos citados.",
          },
        ],
        relatedConcepts: [
          {
            term: "Ato institucional",
            explanation: "Norma editada pelo regime militar que, segundo o Arquivo Nacional, permitiu medidas como cassar mandatos e extinguir partidos.",
          },
          {
            term: "Eleição indireta",
            explanation: "Eleição em que o ocupante do cargo é escolhido por um grupo de representantes, e não diretamente pelos eleitores.",
          },
          {
            term: "Cláusula pétrea",
            explanation: "Ponto da Constituição que não pode ser abolido por emenda, como o voto direto, secreto, universal e periódico.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo o Arquivo Nacional, o que os atos institucionais do regime militar permitiram?",
            options: [
              { id: "a", text: "Cassar direitos políticos e mandatos, extinguir partidos e julgar civis em tribunais militares" },
              { id: "b", text: "Restabelecer a eleição direta para presidente" },
              { id: "c", text: "Criar a Comissão Nacional da Verdade" },
              { id: "d", text: "Ampliar o habeas corpus nos crimes contra a segurança nacional" },
            ],
            correctOptionId: "a",
            explanation:
              "O Arquivo Nacional registra que os atos institucionais permitiram cassar direitos políticos e mandatos, extinguir partidos, julgar civis em tribunais militares e suspender, e não ampliar, o habeas corpus nos crimes contra a segurança nacional. A eleição direta para presidente só voltou em 1989, e a CNV foi criada por lei em 2011.",
          },
          {
            id: "q2",
            prompt: "Qual sequência está em ordem cronológica?",
            options: [
              {
                id: "a",
                text: "Rejeição da emenda das Diretas, eleição indireta de Tancredo Neves, promulgação da Constituição, eleição direta para presidente",
              },
              {
                id: "b",
                text: "Eleição direta para presidente, rejeição da emenda das Diretas, promulgação da Constituição, eleição indireta de Tancredo Neves",
              },
              {
                id: "c",
                text: "Promulgação da Constituição, rejeição da emenda das Diretas, eleição indireta de Tancredo Neves, eleição direta para presidente",
              },
            ],
            correctOptionId: "a",
            explanation:
              "A emenda foi rejeitada em 25 de abril de 1984; Tancredo Neves foi eleito de forma indireta em janeiro de 1985; a Constituição foi promulgada em 5 de outubro de 1988; e a eleição direta para presidente ocorreu em 1989. A Constituição não poderia vir antes de 1984: a Constituinte só foi instalada em 1987.",
          },
          {
            id: "q3",
            prompt: "Segundo a Agência Câmara, como era composta a Assembleia Nacional Constituinte instalada em 1987?",
            options: [
              { id: "a", text: "Por 559 membros: 72 senadores e 487 deputados" },
              { id: "b", text: "Por 72.719 cidadãos escolhidos por sorteio" },
              { id: "c", text: "Apenas por deputados federais" },
            ],
            correctOptionId: "a",
            explanation:
              "O infográfico informa 559 membros, sendo 72 senadores e 487 deputados; por isso, não eram apenas deputados. O número 72.719 corresponde às sugestões enviadas por cidadãos, a forma de participação popular destacada pelo infográfico.",
          },
        ],
      },
      sources: [
        {
          key: "memorias-reveladas-a-repressao",
          supports:
            "Golpe militar de abril de 1964, que depôs João Goulart e instituiu um período ditatorial; atos institucionais que permitiram cassações, extinção de partidos, julgamento de civis por tribunais militares e suspensão do habeas corpus em crimes contra a segurança nacional; estimativas de cerca de 50 mil presos e 20 mil torturados citadas pela exposição.",
        },
        {
          key: "memorias-reveladas-cnv",
          supports:
            "Criação da CNV pela Lei 12.528/2011, instituição em 16/5/2012, período investigado (18/9/1946 a 5/10/1988) e relatório final em três volumes.",
        },
        {
          key: "lei-12528-2011",
          supports:
            "Objetivos legais da CNV: esclarecer graves violações de direitos humanos e casos de torturas, mortes, desaparecimentos forçados e ocultação de cadáveres, e sua autoria.",
        },
        {
          key: "senado-diretas-ja-40-anos",
          supports:
            "Rejeição da emenda Dante de Oliveira (PEC 5/1983) pela Câmara em 25/4/1984, após meses da campanha Diretas Já; eleição indireta de Tancredo Neves pelo Congresso em janeiro de 1985; eleição de Collor em 1989, primeiro presidente escolhido pelo voto popular desde 1964; avaliação da reportagem de que a campanha enfraqueceu a ditadura.",
        },
        {
          key: "camara-30-anos-constituinte",
          supports:
            "Assembleia Nacional Constituinte convocada em 1985 e instalada em 1º/2/1987: 20 meses de trabalho, 559 membros (72 senadores e 487 deputados) e 72.719 sugestões de cidadãos; promulgação em 5/10/1988; criação do SUS e educação como dever do Estado; avaliação da Constituição como símbolo da redemocratização.",
        },
        {
          key: "senado-glossario-constituicoes",
          supports: "A Constituição de 1988 como a sétima do país; a de 1967 aprovada pelo Congresso por exigência do regime militar.",
        },
        {
          key: "cf88-art60",
          supports: "Art. 60, § 4º: proposta de emenda tendente a abolir o voto direto, secreto, universal e periódico não pode ser objeto de deliberação (cláusula pétrea).",
        },
      ],
    },
  ],
};
