import type { SeedModule } from "./types";

export const moduloOrganizacao: SeedModule = {
  slug: "como-o-brasil-se-organiza",
  number: 2,
  title: "Como o Brasil se organiza",
  summary: "Os três Poderes e a federação: União, estados, Distrito Federal e municípios.",
  area: "INSTITUICOES",
  stage: "FOUNDATIONS",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "os-tres-poderes",
      number: 1,
      title: "Os três Poderes",
      objective: "Reconhecer as funções do Legislativo, do Executivo e do Judiciário e como eles se limitam mutuamente.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "A Constituição distribui o poder da União entre três Poderes: o Legislativo, o Executivo e o Judiciário. Esta lição apresenta o que cada um faz e mostra situações em que um Poder limita a decisão de outro.",
        blocks: [
          {
            type: "quote",
            text: "Art. 2º São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
            sourceKey: "cf88-art2",
            locator: "art. 2º",
          },
          {
            type: "paragraph",
            text: "“Independentes” indica que nenhum Poder está subordinado aos outros; “harmônicos entre si”, que devem atuar em equilíbrio. Nesta lição, chamamos de controle mútuo as situações, previstas nas fontes, em que um Poder pode limitar ou revisar a decisão de outro.",
            sources: ["cf88-art2"],
          },
          { type: "heading", text: "Legislativo: representar, votar leis e fiscalizar" },
          {
            type: "paragraph",
            text: "Na União, o Poder Legislativo é exercido pelo Congresso Nacional, formado pela Câmara dos Deputados e pelo Senado Federal (art. 44). Os deputados são “representantes do povo”, eleitos em cada estado e no Distrito Federal (art. 45). Os senadores representam os estados e o Distrito Federal: são três por unidade, com mandato, isto é, o período para o qual são eleitos, de oito anos (art. 46).",
            sources: ["cf88-art44", "cf88-art45", "cf88-art46"],
          },
          {
            type: "paragraph",
            text: "A Câmara descreve seu papel em três funções: representar o cidadão, votar as leis e fiscalizar o governo, ou seja, acompanhar e controlar o que ele faz. O Senado se organiza em comissões, que reúnem grupos de senadores, e em Plenário, a reunião de todos os senadores. Segundo o Senado, o Plenário é “a instância máxima de deliberação”: o espaço de decisão mais alto da Casa.",
            sources: ["camara-papel-e-estrutura", "senado-funcionamento"],
          },
          { type: "heading", text: "Executivo: administrar e executar as leis" },
          {
            type: "paragraph",
            text: "Na União, o Poder Executivo é exercido pelo presidente da República, auxiliado pelos ministros de Estado (art. 76). Segundo o Senado, o Executivo federal é responsável por administrar o país, executar as leis aprovadas pelo Legislativo e conduzir a política externa, isto é, as relações com outros países. Entre as competências, ou atribuições, do presidente estão nomear e exonerar (dispensar) ministros, dirigir a administração federal, propor leis nos casos previstos na Constituição, sancionar (aprovar) e fazer publicar as leis e vetar (recusar) projetos de lei (art. 84).",
            sources: ["cf88-art76", "senado-verifica-poder-executivo", "cf88-art84"],
          },
          { type: "heading", text: "Judiciário: a guarda da Constituição" },
          {
            type: "paragraph",
            text: "O art. 92 lista os órgãos do Poder Judiciário. Entre eles estão o Supremo Tribunal Federal (STF) e os tribunais e juízes federais, do trabalho, eleitorais, militares e dos estados e do Distrito Federal. Em sua descrição institucional, o STF se apresenta como “o órgão de cúpula do Poder Judiciário”, ou seja, o de posição mais alta. Pelo art. 102, cabe a ele, principalmente, a guarda da Constituição, que o material didático do tribunal chama de “a lei maior do Brasil”.",
            sources: ["cf88-art92", "stf-institucional", "cf88-art102", "stf-com-voce"],
          },
          { type: "heading", text: "Como um Poder limita o outro" },
          {
            type: "example",
            title: "Do projeto aprovado ao STF",
            text: "Um projeto de lei, isto é, uma proposta de nova lei, teve a votação concluída no Congresso. A Casa (Câmara ou Senado) onde a votação terminou o envia ao presidente da República. Se concordar, ele o sanciona. Se o considerar, no todo ou em parte, inconstitucional (contrário à Constituição) ou contrário ao interesse público, ele o veta, total ou parcialmente, em até 15 dias úteis, e comunica os motivos ao presidente do Senado em 48 horas. O veto vai então a uma sessão conjunta de deputados e senadores, que deve analisá-lo em até 30 dias. Ele só pode ser rejeitado pelo voto da maioria absoluta, ou seja, mais da metade, dos deputados e senadores. Depois de publicada, uma lei federal ou estadual ainda pode ser questionada no STF por uma ação direta de inconstitucionalidade, que o tribunal processa e julga.",
            sources: ["cf88-art66", "cf88-art84", "cf88-art102"],
          },
          {
            type: "paragraph",
            text: "Há outros controles nas fontes desta lição. Segundo o Senado, o Executivo presta contas ao Congresso, isto é, informa e justifica o que fez, e o Congresso o fiscaliza com o auxílio do Tribunal de Contas da União (TCU). A composição do STF também envolve os outros dois Poderes: segundo o tribunal, seus 11 ministros são nomeados pelo presidente da República depois que a escolha é aprovada pela maioria absoluta do Senado.",
            sources: ["senado-verifica-poder-executivo", "stf-com-voce", "stf-institucional"],
          },
          {
            type: "limit",
            title: "O que fica de fora",
            text: "Esta lição trata dos três Poderes na União. Ela não detalha as regras de eleição de deputados e senadores nem as funções dos demais órgãos do Judiciário, e os trechos citados do art. 84 não esgotam as competências do presidente. As funções da Câmara e o papel do STF aparecem também em descrições publicadas pelas próprias instituições.",
          },
        ],
        relatedConcepts: [
          {
            term: "Sanção",
            explanation: "Concordância do presidente da República com um projeto de lei aprovado pelo Congresso, prevista no art. 66.",
          },
          {
            term: "Veto",
            explanation:
              "Recusa, total ou parcial, de um projeto de lei pelo presidente, por inconstitucionalidade ou contrariedade ao interesse público; o Congresso pode rejeitá-lo (art. 66).",
          },
          {
            term: "Fiscalização",
            explanation: "Acompanhamento e controle do que o governo faz; a Câmara a descreve como uma de suas funções, e o Congresso a exerce com o auxílio do TCU.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "O presidente da República vetou um projeto de lei aprovado no Congresso. Segundo o art. 66, o que pode acontecer com esse veto?",
            options: [
              { id: "a", text: "Nada: o veto do presidente é sempre a decisão final." },
              { id: "b", text: "Ele pode ser rejeitado em sessão conjunta, pelo voto da maioria absoluta dos deputados e senadores." },
              { id: "c", text: "Ele só pode ser derrubado pelo STF." },
            ],
            correctOptionId: "b",
            explanation:
              "Pelo art. 66, § 4º, o veto é analisado em sessão conjunta, dentro de 30 dias, e pode ser rejeitado pelo voto da maioria absoluta dos deputados e senadores. Portanto, o veto não é necessariamente a palavra final. O STF julga ações sobre a constitucionalidade de leis (art. 102), mas o art. 66 atribui a análise do veto ao Congresso.",
          },
          {
            id: "q2",
            prompt: "Segundo o art. 102 da Constituição, qual é a principal atribuição do Supremo Tribunal Federal?",
            options: [
              { id: "a", text: "Votar as leis federais." },
              { id: "b", text: "A guarda da Constituição." },
              { id: "c", text: "Administrar o país e conduzir a política externa." },
            ],
            correctOptionId: "b",
            explanation:
              "O art. 102 atribui ao STF, principalmente, a guarda da Constituição. Votar as leis é uma das funções que a Câmara descreve como suas, no Legislativo. Administrar o país e conduzir a política externa são responsabilidades do Executivo federal, segundo o Senado.",
          },
          {
            id: "q3",
            prompt: "Segundo as informações do próprio STF, como são escolhidos os seus ministros?",
            options: [
              { id: "a", text: "São eleitos pelo voto direto da população." },
              { id: "b", text: "São nomeados pelo presidente da República depois de aprovação pela maioria absoluta do Senado." },
              { id: "c", text: "São escolhidos pelos próprios ministros do STF, sem participação dos outros Poderes." },
            ],
            correctOptionId: "b",
            explanation:
              "O STF informa que seus 11 ministros são nomeados pelo presidente da República depois que a escolha é aprovada pela maioria absoluta do Senado. A escolha envolve, portanto, o Executivo e o Legislativo, e não passa por eleição direta.",
          },
        ],
      },
      sources: [
        {
          key: "cf88-art2",
          supports: "Sustenta que Legislativo, Executivo e Judiciário são os Poderes da União, independentes e harmônicos entre si.",
        },
        {
          key: "cf88-art44",
          supports: "Sustenta que o Poder Legislativo é exercido pelo Congresso Nacional, composto pela Câmara dos Deputados e pelo Senado Federal.",
        },
        {
          key: "cf88-art45",
          supports: "Sustenta que os deputados federais são representantes do povo, eleitos em cada estado e no Distrito Federal.",
        },
        {
          key: "cf88-art46",
          supports: "Sustenta que os senadores representam os estados e o Distrito Federal, três por unidade, com mandato de oito anos.",
        },
        {
          key: "cf88-art76",
          supports: "Sustenta que o Poder Executivo é exercido pelo presidente da República, auxiliado pelos ministros de Estado.",
        },
        {
          key: "cf88-art84",
          supports:
            "Sustenta as competências do presidente citadas: nomear e exonerar ministros, dirigir a administração federal, iniciar o processo legislativo, sancionar e fazer publicar as leis e vetar projetos de lei.",
        },
        {
          key: "cf88-art92",
          supports: "Sustenta a lista de órgãos do Poder Judiciário, com o STF entre eles.",
        },
        {
          key: "cf88-art102",
          supports:
            "Sustenta que compete ao STF, principalmente, a guarda da Constituição e o julgamento da ação direta de inconstitucionalidade de lei federal ou estadual.",
        },
        {
          key: "cf88-art66",
          supports:
            "Sustenta a sanção, o veto total ou parcial com seus motivos e prazos e a análise do veto em sessão conjunta, com rejeição apenas pela maioria absoluta dos deputados e senadores.",
        },
        {
          key: "camara-papel-e-estrutura",
          supports: "Sustenta a descrição que a Câmara faz de seu próprio papel: representar o cidadão, votar as leis e fiscalizar o governo.",
        },
        {
          key: "senado-funcionamento",
          supports: "Sustenta a organização do Senado em Plenário, que reúne todos os senadores e é a instância máxima de deliberação, e em comissões.",
        },
        {
          key: "stf-institucional",
          supports:
            "Sustenta a descrição do STF como órgão de cúpula do Poder Judiciário e a nomeação dos ministros pelo presidente após aprovação pela maioria absoluta do Senado.",
        },
        {
          key: "stf-com-voce",
          supports:
            "Sustenta que o STF chama a Constituição de lei maior do Brasil e que o tribunal tem 11 ministros indicados pelo presidente e aprovados pelo Senado.",
        },
        {
          key: "senado-verifica-poder-executivo",
          supports:
            "Sustenta as funções do Executivo federal (administrar o país, executar as leis e conduzir a política externa) e que ele presta contas ao Congresso, que o fiscaliza com auxílio do TCU.",
        },
      ],
    },
    {
      slug: "uniao-estados-e-municipios",
      number: 2,
      title: "União, estados e municípios",
      objective: "Identificar o que é uma federação e quais responsabilidades cabem a cada esfera.",
      minutes: 5,
      currentKeys: [],
      content: {
        intro:
          "O Brasil reúne União, estados, Distrito Federal e municípios em sua organização político-administrativa. A Constituição reconhece a autonomia dessas esferas. Para compreender uma decisão pública, um primeiro passo é identificar qual esfera e qual instituição estão envolvidas. Esta lição explica o que é uma federação e o que cabe a cada esfera.",
        blocks: [
          { type: "heading", text: "O que é uma federação" },
          {
            type: "definition",
            term: "Federação",
            text: "Nesta lição, federação é a forma de organização descrita no art. 18: o país reúne várias esferas, a União, os estados, o Distrito Federal e os municípios, “todos autônomos, nos termos desta Constituição”.",
            sources: ["cf88-art18"],
          },
          {
            type: "definition",
            term: "Autonomia",
            text: "Capacidade de cada esfera de agir com atribuições próprias, dentro dos limites da Constituição. Os municípios, por exemplo, podem “legislar sobre assuntos de interesse local” (art. 30, I), isto é, criar leis sobre temas da própria cidade.",
            sources: ["cf88-art18", "cf88-art30"],
          },
          {
            type: "paragraph",
            text: "Essas atribuições são chamadas de competências. Algumas cabem a uma só esfera; outras são comuns, ou seja, cabem a todas. O Poder Executivo também se divide por esferas: segundo o Senado, há o Executivo federal, o estadual e o municipal, com presidente, governadores e prefeitos.",
            sources: ["cf88-art21", "cf88-art23", "cf88-art30", "senado-verifica-poder-executivo"],
          },
          { type: "heading", text: "Quem cuida de quê" },
          {
            type: "paragraph",
            text: "Compete à União, entre outras atribuições, manter relações com Estados estrangeiros, isto é, com outros países, e participar de organizações internacionais; declarar a guerra e celebrar a paz; e assegurar a defesa nacional (art. 21).",
            sources: ["cf88-art21"],
          },
          {
            type: "paragraph",
            text: "São competências comuns da União, dos estados, do Distrito Federal e dos municípios, entre outras, zelar pela guarda da Constituição, das leis e das instituições democráticas, conservar o patrimônio público e cuidar da saúde, da assistência pública e da proteção e garantia das pessoas com deficiência (art. 23). O artigo não define como os recursos são divididos entre as esferas.",
            sources: ["cf88-art23"],
          },
          {
            type: "paragraph",
            text: "Compete aos municípios legislar sobre assuntos de interesse local e organizar e prestar os serviços públicos de interesse local. O art. 30 inclui expressamente o transporte coletivo e o descreve como essencial:",
            sources: ["cf88-art30"],
          },
          {
            type: "quote",
            text: "V - organizar e prestar, diretamente ou sob regime de concessão ou permissão, os serviços públicos de interesse local, incluído o de transporte coletivo, que tem caráter essencial",
            sourceKey: "cf88-art30",
            locator: "art. 30, V",
          },
          {
            type: "example",
            title: "Ônibus, defesa e saúde: quem responde?",
            text: "Uma linha de ônibus que circula dentro de uma cidade é transporte coletivo de interesse local. Cabe ao município organizá-la e prestá-la, diretamente ou sob regime de concessão ou permissão, formas em que outro prestador, e não a própria prefeitura, opera o serviço (art. 30, V). Já assegurar a defesa nacional cabe à União (art. 21, III). E cuidar da saúde é competência comum: União, estados, Distrito Federal e municípios têm essa atribuição (art. 23, II). Diante de uma decisão sobre um posto de saúde, portanto, vale verificar qual esfera e qual órgão a tomaram.",
            sources: ["cf88-art30", "cf88-art21", "cf88-art23"],
          },
          { type: "heading", text: "Uma organização protegida" },
          {
            type: "paragraph",
            text: "Uma emenda é uma mudança no texto da Constituição. Pelo art. 60, § 4º, I, a proposta de emenda que tenda a abolir “a forma federativa de Estado” não pode nem ser votada. Esse é um dos limites conhecidos como cláusulas pétreas.",
            sources: ["cf88-art60"],
          },
          {
            type: "limit",
            title: "Recorte desta lição",
            text: "Os trechos dos arts. 21, 23 e 30 não esgotam esses artigos, e as competências próprias dos estados não aparecem nas fontes usadas aqui. Esta lição também não detalha a situação específica do Distrito Federal nem a divisão de recursos entre as esferas. Em um caso concreto, as competências precisam ser consultadas no documento correspondente.",
          },
        ],
        relatedConcepts: [
          {
            term: "Competência comum",
            explanation: "Atribuição que cabe ao mesmo tempo à União, aos estados, ao Distrito Federal e aos municípios, como cuidar da saúde (art. 23).",
          },
          {
            term: "Interesse local",
            explanation: "Expressão usada no art. 30 para os assuntos e os serviços públicos que cabem aos municípios, como o transporte coletivo.",
          },
          {
            term: "Cláusula pétrea",
            explanation: "Limite do art. 60, § 4º: não pode ser votada a proposta de emenda que tenda a abolir certos pontos, como a forma federativa de Estado.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo o art. 18 da Constituição, como ficam a União, os estados, o Distrito Federal e os municípios na organização do país?",
            options: [
              { id: "a", text: "Todos são autônomos, nos termos da Constituição." },
              { id: "b", text: "Os municípios são subordinados aos estados, e os estados, à União." },
              { id: "c", text: "Só a União é autônoma; as demais esferas apenas cumprem suas ordens." },
            ],
            correctOptionId: "a",
            explanation:
              "O art. 18 diz que essas esferas são “todos autônomos, nos termos desta Constituição”. Autonomia não significa ausência de regras: cada esfera atua dentro das competências que a Constituição lhe atribui, como as dos arts. 21, 23 e 30. As outras opções descrevem uma relação de subordinação que não aparece no art. 18.",
          },
          {
            id: "q2",
            prompt: "Uma linha de ônibus circula apenas dentro de uma cidade. Pela Constituição, quem deve organizar e prestar esse serviço?",
            options: [
              { id: "a", text: "A União." },
              { id: "b", text: "O estado." },
              { id: "c", text: "O município." },
            ],
            correctOptionId: "c",
            explanation:
              "O art. 30, V, atribui aos municípios organizar e prestar os serviços públicos de interesse local, “incluído o de transporte coletivo”. O município pode fazer isso diretamente ou sob regime de concessão ou permissão. A União aparece no art. 21 com outras competências, como assegurar a defesa nacional.",
          },
          {
            id: "q3",
            prompt: "Pelo art. 23 da Constituição, cuidar da saúde é competência de qual esfera?",
            options: [
              { id: "a", text: "Apenas da União." },
              { id: "b", text: "Apenas dos municípios." },
              { id: "c", text: "Da União, dos estados, do Distrito Federal e dos municípios, em comum." },
            ],
            correctOptionId: "c",
            explanation:
              "O art. 23 lista competências comuns, e entre elas está cuidar da saúde e assistência pública. Isso significa que todas as esferas têm essa atribuição. O artigo não define como os recursos são divididos entre elas; por isso, em cada caso, vale verificar qual esfera tomou a decisão.",
          },
        ],
      },
      sources: [
        {
          key: "cf88-art18",
          supports:
            "Sustenta que a organização político-administrativa do Brasil compreende a União, os estados, o Distrito Federal e os municípios, todos autônomos nos termos da Constituição.",
        },
        {
          key: "cf88-art21",
          supports:
            "Sustenta as competências da União citadas: manter relações com Estados estrangeiros e participar de organizações internacionais, declarar a guerra e celebrar a paz e assegurar a defesa nacional.",
        },
        {
          key: "cf88-art23",
          supports:
            "Sustenta as competências comuns citadas, entre elas cuidar da saúde, e, pela nota de escopo, que o artigo não define a divisão de recursos entre as esferas.",
        },
        {
          key: "cf88-art30",
          supports:
            "Sustenta que compete aos municípios legislar sobre assuntos de interesse local e organizar e prestar os serviços públicos de interesse local, incluído o transporte coletivo, de caráter essencial.",
        },
        {
          key: "cf88-art60",
          supports: "Sustenta que a forma federativa de Estado está entre os limites a emendas constitucionais (cláusulas pétreas) do § 4º.",
        },
        {
          key: "senado-verifica-poder-executivo",
          supports: "Sustenta que o Poder Executivo se organiza nas esferas federal, estadual e municipal, com presidente, governadores e prefeitos.",
        },
      ],
    },
  ],
};
