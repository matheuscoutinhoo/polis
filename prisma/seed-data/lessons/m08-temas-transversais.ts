import type { SeedModule } from "./types";

export const moduloTemasTransversais: SeedModule = {
  slug: "temas-transversais",
  number: 8,
  title: "Temas transversais",
  summary:
    "O módulo mostra como as fontes do acervo tratam meio ambiente, desenvolvimento sustentável, nacionalismo e populismo e registra o que elas não definem, como ambientalismo e progressismo.",
  area: "IDEIAS",
  stage: "CONTEXT",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "ambientalismo-e-desenvolvimento-sustentavel",
      number: 1,
      title: "Ambientalismo e desenvolvimento sustentável",
      objective: "Reconhecer como as fontes do acervo tratam o meio ambiente e o desenvolvimento sustentável e identificar o que elas não definem.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "Esta lição mostra como as fontes do acervo tratam o meio ambiente e o desenvolvimento sustentável: como tema de compromissos internacionais, de normas brasileiras e de políticas públicas, isto é, de ações do poder público. A lição também registra o que as fontes não definem, a começar pelo termo ambientalismo. Ela descreve; não avalia políticas nem resultados.",
        blocks: [
          { type: "heading", text: "A Agenda 2030 e os ODS" },
          {
            type: "paragraph",
            text: "Segundo o Ministério do Meio Ambiente e Mudança do Clima (MMA), que participa da Agenda 2030, ela “pode ser considerada como um novo esforço e oportunidade global para promover o desenvolvimento sustentável”. A Agenda se compromete com 17 objetivos e 169 metas que buscam, entre outras coisas, acabar com a pobreza e a fome e combater as mudanças climáticas.",
            sources: ["mma-agenda-2030-ods"],
          },
          {
            type: "definition",
            term: "Objetivos de Desenvolvimento Sustentável (ODS)",
            text: "Os objetivos da Agenda 2030. Segundo o MMA, foram adotados em setembro de 2015, numa cúpula da ONU, seguindo uma determinação da Rio+20, e devem orientar as políticas nacionais até 2030. Distribuem-se em quatro dimensões: social, econômica, ambiental e institucional. A ambiental, ligada diretamente ao meio ambiente, inclui a proteção da biodiversidade, a variedade de seres vivos.",
            sources: ["mma-historico-ods", "mma-agenda-2030-ods"],
          },
          {
            type: "quote",
            text: "Dimensão Ambiental - trata da preservação e conservação do meio ambiente, com ações que vão da reversão do desmatamento, proteção das florestas e da biodiversidade, combate à desertificação",
            sourceKey: "mma-historico-ods",
            locator: "Dimensão ambiental",
          },
          { type: "heading", text: "Biodiversidade no plano internacional" },
          {
            type: "paragraph",
            text: "Ganem (2012), da Consultoria Legislativa da Câmara dos Deputados, propõe-se a “traçar um histórico dos princípios, conceitos e ações que orientaram as políticas de conservação da biodiversidade discutidas no plano internacional, desde meados do Século XX”. Como indica o título do estudo, o percurso vai de Estocolmo à Rio+20, pelas conferências da ONU sobre meio ambiente e desenvolvimento.",
            sources: ["camara-bd-ganem-biodiversidade"],
          },
          {
            type: "limit",
            title: "O que o acervo não define",
            text: "Nenhuma fonte do acervo define ambientalismo nem o descreve como corrente política ou como movimento. Também não há definição formal de desenvolvimento sustentável: o MMA usa a expressão ao apresentar a Agenda 2030, e os trechos das normas a seguir não a empregam. Por isso, a lição não define esses termos.",
          },
          { type: "heading", text: "O meio ambiente na Constituição e na lei" },
          {
            type: "quote",
            text: "Art. 225. Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida, impondo-se ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo para as presentes e futuras gerações.",
            sourceKey: "cf88-art225",
            locator: "art. 225, caput",
          },
          {
            type: "paragraph",
            text: "Esse artigo da Constituição de 1988 chama o meio ambiente equilibrado de bem de uso comum do povo, expressão que o trecho não define, e atribui o dever de protegê-lo ao Poder Público, isto é, ao Estado e a seus órgãos, e à coletividade, a sociedade como um todo. Por si só, ele não define o procedimento de licenciamento.",
            sources: ["cf88-art225"],
          },
          {
            type: "paragraph",
            text: "A Lei nº 6.938, de 1981, define o objetivo da Política Nacional do Meio Ambiente: a “preservação, melhoria e recuperação da qualidade ambiental propícia à vida”, visando assegurar no país condições ao desenvolvimento socioeconômico, aos interesses da segurança nacional e à proteção da dignidade da vida humana. A lei combina, assim, qualidade ambiental e desenvolvimento socioeconômico.",
            sources: ["lei-6938-1981"],
          },
          {
            type: "paragraph",
            text: "Já o art. 170 da Constituição funda a ordem econômica, isto é, a organização da economia, na valorização do trabalho humano e na livre iniciativa. Entre os princípios que ela deve observar estão a propriedade privada, a livre concorrência e a defesa do meio ambiente, “inclusive mediante tratamento diferenciado conforme o impacto ambiental dos produtos e serviços e de seus processos de elaboração e prestação”. A combinação desses princípios é objeto de interpretações diferentes; a lição não escolhe uma delas.",
            sources: ["cf88-art170"],
          },
          {
            type: "example",
            title: "Situação hipotética: uma fábrica ao lado da mata em Serra Clara",
            text: "Na cidade fictícia de Serra Clara, uma empresa quer instalar uma fábrica ao lado de um trecho de floresta, e a proposta é debatida numa reunião pública. Parte dos moradores destaca os empregos; outra parte, o risco de desmatamento. As normas da lição organizam as perguntas. Pelo art. 225: como cumprir o dever de defender e preservar o meio ambiente para as presentes e futuras gerações? Pela Lei nº 6.938: como combinar qualidade ambiental e condições ao desenvolvimento socioeconômico? Pelo art. 170: o tratamento diferenciado conforme o impacto ambiental se aplica ao caso? O exemplo não indica qual decisão é a certa nem quem decide: as fontes citadas não detalham o licenciamento.",
            sources: ["cf88-art225", "lei-6938-1981", "cf88-art170"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo não descreve grupos ou movimentos ambientais nem reúne textos de autores que se identifiquem com o ambientalismo; por isso, a lição não apresenta ideias nem críticas atribuídas a eles. As fontes não detalham as conferências citadas, não listam os 17 ODS um a um e não avaliam os resultados das políticas descritas. Os trechos citados não definem expressões como livre iniciativa nem explicam como se aplica o tratamento diferenciado do art. 170.",
          },
        ],
        relatedConcepts: [
          {
            term: "Agenda 2030",
            explanation: "Segundo o MMA, um novo esforço e oportunidade global para promover o desenvolvimento sustentável, com 17 objetivos e 169 metas.",
          },
          {
            term: "Política Nacional do Meio Ambiente",
            explanation:
              "Política cujo objetivo, definido na Lei nº 6.938/1981, combina a preservação, a melhoria e a recuperação da qualidade ambiental com condições ao desenvolvimento socioeconômico.",
          },
          {
            term: "Dimensão ambiental dos ODS",
            explanation:
              "Uma das quatro dimensões dos ODS; segundo o MMA, trata da preservação e conservação do meio ambiente, com ações como a reversão do desmatamento e a proteção das florestas e da biodiversidade.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo o MMA, em quais dimensões se distribuem os Objetivos de Desenvolvimento Sustentável (ODS)?",
            options: [
              { id: "a", text: "Social, econômica, ambiental e institucional." },
              { id: "b", text: "Apenas ambiental: os ODS tratam só de florestas e biodiversidade." },
              { id: "c", text: "Municipal, estadual e federal." },
            ],
            correctOptionId: "a",
            explanation:
              "Segundo o MMA, os ODS se distribuem em quatro dimensões: social, econômica, ambiental e institucional. A ambiental é uma delas, mas não a única: a Agenda 2030 também busca, entre outras coisas, acabar com a pobreza e a fome. Municipal, estadual e federal não aparecem nas fontes como dimensões dos ODS.",
          },
          {
            id: "q2",
            prompt: "Segundo o art. 225 da Constituição, a quem cabe o dever de defender e preservar o meio ambiente?",
            options: [
              { id: "a", text: "Ao Poder Público e à coletividade, para as presentes e futuras gerações." },
              { id: "b", text: "Somente às empresas cujas atividades causam impacto ambiental." },
              { id: "c", text: "Somente ao Ministério do Meio Ambiente e Mudança do Clima." },
            ],
            correctOptionId: "a",
            explanation:
              "O art. 225 impõe esse dever ao Poder Público e à coletividade, para as presentes e futuras gerações; o texto não o restringe às empresas nem a um único órgão. O impacto ambiental de produtos e serviços aparece em outro artigo, o 170, como critério de tratamento diferenciado na defesa do meio ambiente.",
          },
          {
            id: "q3",
            prompt: "Como as fontes desta lição tratam o ambientalismo?",
            options: [
              {
                id: "a",
                text: "Tratam o meio ambiente como tema de normas, políticas públicas e compromissos internacionais; nenhuma define o ambientalismo ou o descreve como corrente política.",
              },
              { id: "b", text: "Descrevem o ambientalismo como corrente política, com autores e propostas próprias." },
              { id: "c", text: "Contam a história do ambientalismo como movimento social no Brasil." },
            ],
            correctOptionId: "a",
            explanation:
              "As fontes da lição são a Constituição, uma lei, páginas do MMA e um estudo sobre políticas internacionais de conservação da biodiversidade. Elas tratam do meio ambiente por normas, políticas e compromissos, e nenhuma descreve o ambientalismo como corrente política ou como movimento. Por isso, a lição não atribui ao termo uma definição que as fontes não trazem.",
          },
        ],
      },
      sources: [
        {
          key: "mma-agenda-2030-ods",
          supports:
            "Sustenta a citação sobre a Agenda 2030 como novo esforço e oportunidade global para promover o desenvolvimento sustentável; os 17 objetivos e 169 metas, que buscam, entre outras coisas, acabar com a pobreza e a fome e combater mudanças climáticas; que uma das dimensões dos ODS está ligada diretamente ao meio ambiente; e que o MMA participa da Agenda 2030.",
        },
        {
          key: "mma-historico-ods",
          supports:
            "Sustenta que os ODS foram adotados em setembro de 2015 na Cúpula da ONU, seguindo mandato da Rio+20, e devem orientar políticas nacionais até 2030; as quatro dimensões (social, econômica, ambiental e institucional); a citação sobre a dimensão ambiental, que inclui a proteção da biodiversidade; e, pela nota de escopo, que a página não descreve o ambientalismo como corrente política.",
        },
        {
          key: "camara-bd-ganem-biodiversidade",
          supports:
            "Sustenta o propósito do estudo de Ganem (2012), da Consultoria Legislativa da Câmara: traçar um histórico dos princípios, conceitos e ações das políticas de conservação da biodiversidade discutidas no plano internacional desde meados do século XX, ao longo das conferências da ONU sobre meio ambiente e desenvolvimento (de Estocolmo à Rio+20, conforme o título).",
        },
        {
          key: "cf88-art225",
          supports:
            "Sustenta a citação do art. 225: direito de todos ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo, e dever do Poder Público e da coletividade de defendê-lo e preservá-lo para as presentes e futuras gerações; pela nota de escopo, que o artigo não define, por si só, o procedimento de licenciamento.",
        },
        {
          key: "lei-6938-1981",
          supports:
            "Sustenta o objetivo da Política Nacional do Meio Ambiente (art. 2º): preservação, melhoria e recuperação da qualidade ambiental propícia à vida, visando assegurar condições ao desenvolvimento socioeconômico, aos interesses da segurança nacional e à proteção da dignidade da vida humana; pela nota de escopo, que a lei combina qualidade ambiental e desenvolvimento socioeconômico.",
        },
        {
          key: "cf88-art170",
          supports:
            "Sustenta que a ordem econômica se funda na valorização do trabalho humano e na livre iniciativa e observa princípios como propriedade privada, livre concorrência e defesa do meio ambiente, inclusive mediante tratamento diferenciado conforme o impacto ambiental; pela nota de escopo, que a combinação de princípios é objeto de interpretações diferentes.",
        },
      ],
    },
    {
      slug: "nacionalismo-populismo-e-progressismo",
      number: 2,
      title: "Nacionalismo, populismo e progressismo",
      objective: "Identificar como as fontes do acervo tratam nacionalismo e populismo e reconhecer o que elas não definem, como o progressismo.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "Esta lição reúne três termos: nacionalismo, populismo e progressismo. Para cada um, mostra como as fontes do acervo o tratam, como objeto de estudo histórico, linguagem, projeto político ou fenômeno que pode ameaçar a democracia, e registra o que o acervo não define. A lição descreve os enquadramentos dos autores; não avalia se são certos ou errados.",
        blocks: [
          { type: "heading", text: "Nacionalismo" },
          {
            type: "paragraph",
            text: "No acervo, o nacionalismo aparece num estudo histórico: Backes (2011) sustenta a existência de um grupo nacionalista com forte presença no Congresso brasileiro no início da Primeira República. Segundo a autora, esse grupo dificultou projetos econômicos demandados pelos presidentes, e sua derrota foi um passo para a hegemonia, isto é, o predomínio, da elite cafeeira paulista, ligada ao café em São Paulo.",
            sources: ["camara-bd-backes-nacionalismo"],
          },
          {
            type: "limit",
            title: "O que o acervo não define",
            text: "O acervo não define nacionalismo nem o descreve como corrente política ou como movimento: o termo qualifica um grupo parlamentar estudado por Backes. Os trechos disponíveis não explicam o que tornava o grupo nacionalista nem informam datas ou os projetos em disputa. Por isso, a lição não estende o caso a outros períodos.",
          },
          { type: "heading", text: "Populismo" },
          {
            type: "paragraph",
            text: "O livro didático de Coelho e Salles (2015) menciona o populismo só de passagem, sem tratá-lo como corrente em seção própria. Três estudos do acervo tratam do termo com enquadramentos diferentes, isto é, com modos diferentes de delimitar o que observar. Nos trechos do acervo, nenhum deles o apresenta como corrente de pensamento.",
            sources: ["pnap-ciencia-politica", "camara-bd-pinto-laclau-populismo", "camara-bd-barros-discurso-populista", "ril-240-populismo-judiciario"],
          },
          {
            type: "comparison",
            title: "Dois enquadramentos do populismo",
            intro: "Os dois quadros seguem o mesmo roteiro: tratamento do termo, objeto de estudo, tese registrada e limite.",
            orderNote: "Ordem cronológica de publicação dos estudos: 2017 e 2019, depois 2023.",
            items: [
              {
                label: "Linguagem e projeto político",
                heading: "Pinto (2017) e Barros (2019)",
                text: "Como tratam o termo: como projeto ou como linguagem política. O que examinam: Pinto, a relação entre hegemonia, democracia radical e populismo na obra de Ernesto Laclau; Barros, que entende o populismo como “um tipo específico de linguagem política”, com base em três dimensões teóricas, aplica a noção de elementos populistas a pronunciamentos de Vargas, Goulart e Lacerda. Tese registrada: para Pinto, o populismo não consegue se realizar totalmente como projeto político em cenários de concorrência democrática. Limite: o acervo traz só os resumos.",
                sources: ["camara-bd-pinto-laclau-populismo", "camara-bd-barros-discurso-populista"],
              },
              {
                label: "Enquadramento crítico",
                heading: "Godoy e Costa (2023)",
                text: "Como tratam o termo: como fenômeno que pode ameaçar a democracia. O que examinam: o Poder Judiciário diante do populismo, que, para os autores, evoluiu a ponto de se infiltrar nele. Tese registrada: “As cortes atuam como veto points contra as ameaças dos regimes populistas à democracia.” Veto points, ou pontos de veto, são instâncias capazes de barrar decisões. O título do artigo trata de como o Judiciário, chamado de último guardião, pode tornar-se a maior ameaça à democracia. Limite: o acervo traz só o resumo.",
                sources: ["ril-240-populismo-judiciario"],
              },
            ],
          },
          { type: "heading", text: "Progressismo" },
          {
            type: "limit",
            title: "Sem fonte no acervo",
            text: "O acervo aprovado da Polis não tem fonte que defina ou descreva o progressismo. Por isso, a lição não define o termo, não o classifica como corrente, movimento, tema ou forma de atuação política e não o associa a grupos, partidos ou posições.",
          },
          { type: "heading", text: "A escala esquerda-direita" },
          {
            type: "paragraph",
            text: "Esquerda e direita são os polos de uma escala usada para classificar partidos. Scheeffer (2018), que estuda os limites dessa classificação, observa que há “várias formas de classificação dos partidos em uma escala esquerda-direita”. O estudo compara a classificação corrente da Ciência Política com o posicionamento dos partidos em 24 votações de caráter ideológico na Câmara, entre 2011 e 2015, e aponta dissonâncias, isto é, diferenças, entre as duas. A posição atribuída a um partido pode, portanto, variar conforme a forma de classificação. O curso do Instituto Legislativo Brasileiro (ILB), do Senado, sobre as chamadas novas esquerdas tem uma unidade intitulada Esquerda e Direita Hoje.",
            sources: ["camara-bd-scheeffer-espectro-ideologico", "ilb-doutrina-novas-esquerdas"],
          },
          {
            type: "example",
            title: "Situação hipotética: dois trabalhos sobre o mesmo discurso",
            text: "Numa escola fictícia de Vale do Sabiá, dois grupos analisam o mesmo discurso de um governante fictício, e os dois usam a palavra populismo. O primeiro adota o enquadramento de Barros (2019) e procura no texto elementos de linguagem populista. O segundo adota o de Godoy e Costa (2023) e pergunta se as ações daquele governo ameaçam a democracia e se as cortes, isto é, os tribunais, funcionam como pontos de veto. A professora pede que cada grupo diga, primeiro, em que sentido usou a palavra. O exemplo mostra como o enquadramento muda a pergunta; não indica qual deles é o correto nem classifica o governante.",
            sources: ["camara-bd-barros-discurso-populista", "ril-240-populismo-judiciario"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "Do curso do ILB, o acervo traz só a ementa; dos estudos, só resumos. As fontes não definem populismo de forma geral, não detalham as três dimensões teóricas de Barros nem definem hegemonia e democracia radical na obra de Laclau; também não reproduzem os pronunciamentos analisados. Nenhuma fonte posiciona os três termos na escala esquerda-direita, e o acervo não reúne textos de autores que se identifiquem como nacionalistas, populistas ou progressistas.",
          },
        ],
        relatedConcepts: [
          {
            term: "Linguagem política",
            explanation:
              "Na dissertação de Barros (2019), o modo de entender o populismo: como um tipo específico de linguagem política, estudado a partir de três dimensões teóricas.",
          },
          {
            term: "Pontos de veto (veto points)",
            explanation: "Expressão usada por Godoy e Costa (2023) para descrever a atuação das cortes contra as ameaças dos regimes populistas à democracia.",
          },
          {
            term: "Escala esquerda-direita",
            explanation: "Escala usada para classificar partidos; segundo Scheeffer (2018), há várias formas de fazer essa classificação, e os resultados podem divergir.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Barros (2019), como o populismo pode ser entendido?",
            options: [
              { id: "a", text: "Como um tipo específico de linguagem política, estudado a partir de três dimensões teóricas." },
              { id: "b", text: "Como uma corrente de pensamento tratada em seção própria nos livros didáticos do acervo." },
              { id: "c", text: "Como um grupo parlamentar do início da Primeira República." },
            ],
            correctOptionId: "a",
            explanation:
              "Barros propõe entender o populismo como um tipo específico de linguagem política e aplica a noção de elementos populistas a pronunciamentos de Vargas, Goulart e Lacerda. A alternativa b não corresponde ao acervo: no livro didático de Coelho e Salles (2015), o populismo aparece só de passagem. A alternativa c descreve o grupo nacionalista estudado por Backes (2011), não o populismo.",
          },
          {
            id: "q2",
            prompt: "Qual enquadramento Godoy e Costa (2023) adotam ao tratar do populismo?",
            options: [
              {
                id: "a",
                text: "Um enquadramento crítico: tratam o populismo como fenômeno que pode ameaçar a democracia e descrevem as cortes como pontos de veto.",
              },
              { id: "b", text: "Tratam o populismo apenas como linguagem a ser identificada em discursos." },
              { id: "c", text: "Concluem que o populismo se realiza totalmente como projeto político em cenários de concorrência democrática." },
            ],
            correctOptionId: "a",
            explanation:
              "Godoy e Costa tratam o populismo como fenômeno que pode ameaçar a democracia e que, para eles, chegou a se infiltrar no Judiciário; diante dele, as cortes atuam como veto points. A alternativa b descreve o enquadramento de Barros (2019). A alternativa c inverte a tese de Pinto (2017), para quem o populismo não consegue se realizar totalmente como projeto político nesses cenários.",
          },
          {
            id: "q3",
            prompt: "O que o estudo de Backes (2011) registra sobre nacionalismo?",
            options: [
              { id: "a", text: "A existência, segundo a autora, de um grupo nacionalista com forte presença no Congresso no início da Primeira República." },
              { id: "b", text: "Uma definição geral de nacionalismo como corrente política." },
              { id: "c", text: "A posição do nacionalismo na escala esquerda-direita." },
            ],
            correctOptionId: "a",
            explanation:
              "Backes sustenta a existência desse grupo e argumenta que ele dificultou projetos econômicos demandados pelos presidentes. O estudo é histórico e trata de um período específico; o acervo não traz uma definição geral de nacionalismo, e nenhuma fonte posiciona o termo na escala esquerda-direita.",
          },
        ],
      },
      sources: [
        {
          key: "camara-bd-backes-nacionalismo",
          supports:
            "Sustenta a interpretação de Backes (2011): a existência de um grupo nacionalista com forte presença no Congresso brasileiro no início da Primeira República, que dificultou projetos econômicos demandados pelos presidentes e cuja derrota foi passo para a hegemonia da elite cafeeira paulista; pela nota de escopo, que se trata de estudo histórico sobre esse grupo.",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, pela afirmação verificada sobre o livro didático de Coelho e Salles (2015), que o populismo aparece nele só por menções, sem ser tratado como corrente em seção própria.",
        },
        {
          key: "camara-bd-pinto-laclau-populismo",
          supports:
            "Sustenta que Pinto (2017) examina a relação entre hegemonia, democracia radical e populismo na obra de Ernesto Laclau e a tese da autora de que o populismo não consegue se realizar totalmente como projeto político em cenários de concorrência democrática.",
        },
        {
          key: "camara-bd-barros-discurso-populista",
          supports:
            "Sustenta a proposta de Barros (2019) de entender o populismo como um tipo específico de linguagem política, com base em três dimensões teóricas (ideacional, parte da sociologia brasileira e filosofia política de Laclau), e a aplicação da noção de elementos populistas a pronunciamentos de Vargas, Goulart e Lacerda.",
        },
        {
          key: "ril-240-populismo-judiciario",
          supports:
            "Sustenta o enquadramento crítico de Godoy e Costa (2023): o populismo como fenômeno que pode ameaçar a democracia e que evoluiu a ponto de se infiltrar no Judiciário; a citação sobre as cortes como veto points contra as ameaças dos regimes populistas; e o título do artigo, sobre como o último guardião pode tornar-se a maior ameaça à democracia.",
        },
        {
          key: "camara-bd-scheeffer-espectro-ideologico",
          supports:
            "Sustenta o trecho do resumo segundo o qual há várias formas de classificar partidos na escala esquerda-direita; pela nota de escopo, que o estudo trata dessas formas e de seus limites; a comparação entre a classificação corrente da Ciência Política e o posicionamento em 24 votações nominais ideológicas na Câmara (2011–2015); e as dissonâncias apontadas.",
        },
        {
          key: "ilb-doutrina-novas-esquerdas",
          supports: "Sustenta que o curso do ILB, do Senado, sobre as chamadas novas esquerdas tem uma unidade intitulada Esquerda e Direita Hoje.",
        },
      ],
    },
  ],
};
