import type { SeedModule } from "./types";

export const moduloSocialDemocraciaSocialismos: SeedModule = {
  slug: "social-democracia-socialismos-e-comunismo",
  number: 6,
  title: "Social-democracia, socialismos e comunismo",
  summary:
    "Apresenta a social-democracia, os socialismos e o comunismo segundo as fontes do acervo, com ideias centrais, variações, debates e limites de cada recorte.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "social-democracia",
      number: 1,
      title: "Social-democracia: reformas, direitos sociais e mercado",
      objective:
        "Identificar o que as fontes do acervo dizem sobre a social-democracia e o Estado de bem-estar social, separando afirmações das fontes, interpretações de autores e lacunas.",
      minutes: 6,
      currentKeys: ["social-democracia"],
      content: {
        intro:
          "Esta lição apresenta a social-democracia a partir das fontes do acervo da Polis: o que elas destacam, as ideias centrais, as variações, os debates registrados e os limites do material. As fontes usam o nome no singular e não descrevem vertentes internas da corrente. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Social-democracia",
            text: "Doutrina política estudada em curso próprio da série Doutrina Política, do Instituto Legislativo Brasileiro (ILB), do Senado Federal. A ementa pública do curso, isto é, o resumo do seu programa, indica três temas: o histórico da social-democracia, as bases materiais do que chama de compromisso social-democrata e as razões da crise da corrente.",
            sources: ["ilb-doutrina-social-democracia"],
          },
          {
            type: "paragraph",
            text: "A ementa apenas indica esses temas; o conteúdo completo exige cadastro gratuito. Por isso, o acervo não esclarece quem participa do compromisso social-democrata nem quais são suas bases materiais. Para tratar da relação entre Estado e mercado, tema do título, esta lição usa outro conceito do acervo: o Estado de bem-estar social, descrito no livro didático de Ricardo Corrêa Coelho (2014). Os trechos disponíveis não chamam esse modelo de social-democrata; a aproximação é uma escolha de organização desta lição, não uma afirmação das fontes.",
            sources: ["ilb-doutrina-social-democracia", "pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "paragraph",
            text: "Segundo Coelho (2014), o Estado liberal clássico corresponde ao chamado Estado mínimo: uma organização política que interviria apenas no estritamente necessário para garantir a liberdade e a igualdade dos cidadãos, deixando as demais dimensões da vida social à regulação do mercado. O livro descreve assim o modelo que veio depois:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "O Estado de bem-estar social sucede o Estado liberal, intervindo por meio de políticas públicas no mercado a fim de assegurar aos seus cidadãos um patamar mínimo de igualdade social e um padrão mínimo de bem-estar.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 86",
          },
          {
            type: "paragraph",
            text: "Políticas públicas são programas de ação do governo, e “patamar mínimo” indica um piso. Em artigo publicado pelo Senado, Ricardo Quartim de Moraes (2014) também organiza a história do Estado em etapas: Estado Liberal, Estado Social e Estado Democrático de Direito, expressão com que a Constituição de 1988 define a República (art. 1º). É uma interpretação do autor, e os trechos do acervo não detalham como o Estado Social do artigo se relaciona com o Estado de bem-estar social do livro de Coelho.",
            sources: ["pnap-estado-governo-mercado", "ril-204-estado-liberal-estado-democratico", "cf88-art1"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "O acervo não descreve vertentes internas da social-democracia. A mesma série do ILB tem um curso sobre as chamadas novas esquerdas, com uma unidade intitulada “Esquerda e Direita Hoje” e outra sobre a chamada Terceira Via; a ementa não define a Terceira Via nem a apresenta como vertente social-democrata. Esquerda e direita são os polos de uma escala usada para classificar partidos, e há várias formas de fazer essa classificação. Em artigo publicado pelo Senado, Emmanuel Pedro Ribeiro (2023) descreve o momento em que, segundo ele, o pensamento político de esquerda no Brasil “se abriu aos valores democráticos e passou a falar a linguagem dos direitos humanos”. Os trechos do acervo não ligam essa mudança à social-democracia.",
            sources: ["ilb-doutrina-novas-esquerdas", "camara-bd-scheeffer-espectro-ideologico", "ril-238-cultura-politica-esquerda"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "A ementa do curso do ILB dedica uma unidade às razões da crise da social-democracia, mas o trecho público não diz quais são essas razões. Coelho (2014) registra que a passagem para o Estado de bem-estar social exigiu rever paradigmas, isto é, modelos de referência, dentro do próprio pensamento liberal. No mesmo livro, esse modelo aparece ao lado de outros, como o Estado liberal e o Estado socialista. São interpretações do autor.",
            sources: ["ilb-doutrina-social-democracia", "pnap-estado-governo-mercado"],
          },
          {
            type: "example",
            title: "Situação hipotética: a linha de ônibus do bairro afastado",
            text: "Em uma cidade fictícia, a empresa que opera a única linha de ônibus de um bairro afastado reduz os horários, alegando poucos passageiros. A Câmara Municipal discute o que fazer. O conceito de Estado de bem-estar social ajuda a formular a pergunta: o poder público deve intervir, por meio de uma política pública, para assegurar um padrão mínimo de acesso ao transporte? Se sim, de que forma? A Constituição lista o transporte entre os direitos sociais (art. 6º) e atribui aos municípios organizar e prestar os serviços públicos de interesse local, incluído o transporte coletivo (art. 30). Mas o art. 6º não define como cada direito deve ser financiado ou prestado: a cidade ainda precisa decidir. A situação mostra como o conceito organiza a discussão; não indica qual decisão é a melhor nem quais efeitos ela teria.",
            sources: ["pnap-estado-governo-mercado", "cf88-art6", "cf88-art30"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo não traz uma definição da social-democracia nem os países, partidos ou governos associados a ela, e não detalha as reformas que ela propôs ou aplicou. O compromisso social-democrata, suas bases materiais e as razões de sua crise aparecem apenas como temas de uma ementa, e a Terceira Via não é definida. A lição não classifica a Constituição de 1988 como social-democrata, e as fontes do acervo também não o fazem. O acervo também não reúne críticas de outras correntes à social-democracia; por isso, a lição não as resume.",
          },
        ],
        relatedConcepts: [
          {
            term: "Estado de bem-estar social",
            explanation:
              "Segundo Coelho (2014), modelo que sucede o Estado liberal e intervém no mercado por meio de políticas públicas para assegurar um patamar mínimo de igualdade social e de bem-estar.",
          },
          {
            term: "Estado mínimo",
            explanation:
              "Segundo Coelho (2014), Estado que interviria apenas no estritamente necessário para garantir a liberdade e a igualdade dos cidadãos; o livro o associa ao Estado liberal clássico.",
          },
          {
            term: "Direitos sociais",
            explanation:
              "Direitos listados no art. 6º da Constituição, como educação, saúde, trabalho, moradia e transporte; o artigo não define como cada um é financiado ou prestado.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho (2014), como atua o Estado de bem-estar social?",
            options: [
              { id: "a", text: "Intervém no mercado por meio de políticas públicas, para assegurar um patamar mínimo de igualdade social e de bem-estar." },
              { id: "b", text: "Intervém apenas no estritamente necessário e deixa as demais dimensões da vida social à regulação do mercado." },
              { id: "c", text: "Controla todo o processo produtivo." },
            ],
            correctOptionId: "a",
            explanation:
              "No livro de Coelho, o Estado de bem-estar social sucede o Estado liberal e intervém no mercado por meio de políticas públicas. A alternativa b descreve o Estado mínimo, que o mesmo livro associa ao Estado liberal clássico. A alternativa c corresponde à primeira característica que o livro atribui ao Estado socialista, tema da próxima lição.",
          },
          {
            id: "q2",
            prompt: "O que a ementa pública do curso do ILB sobre social-democracia permite afirmar?",
            options: [
              { id: "a", text: "Que a Constituição de 1988 é um texto social-democrata." },
              { id: "b", text: "Que o curso trata do histórico da corrente, das bases materiais do compromisso social-democrata e das razões de sua crise." },
              { id: "c", text: "Que a Terceira Via é uma vertente da social-democracia." },
            ],
            correctOptionId: "b",
            explanation:
              "A ementa indica três temas: o histórico, as bases materiais do compromisso social-democrata e as razões da crise. Ela não classifica a Constituição, e nenhuma fonte do acervo o faz. A Terceira Via aparece em outro curso da série, sobre as chamadas novas esquerdas, sem ser apresentada como vertente social-democrata.",
          },
          {
            id: "q3",
            prompt: "Na situação hipotética, a Constituição lista o transporte entre os direitos sociais. O que isso resolve sobre a linha de ônibus?",
            options: [
              { id: "a", text: "Define quantos horários a linha deve ter." },
              { id: "b", text: "Obriga a prefeitura a pagar a empresa para manter todos os horários." },
              { id: "c", text: "Indica que o transporte é um direito social, mas não define como ele deve ser financiado ou prestado; a cidade ainda precisa decidir." },
            ],
            correctOptionId: "c",
            explanation:
              "O art. 6º lista o transporte entre os direitos sociais, mas não define como cada direito é financiado ou prestado. O art. 30 atribui ao município organizar e prestar o transporte coletivo local, sem fixar horários nem impor uma medida específica, como pagar a empresa. O conceito de Estado de bem-estar social ajuda a formular a pergunta, mas não a responde sozinho.",
          },
        ],
      },
      sources: [
        {
          key: "ilb-doutrina-social-democracia",
          supports:
            "Sustenta que o ILB, do Senado, oferece curso sobre a social-democracia na série Doutrina Política, que a ementa pública indica três temas (histórico, bases materiais do compromisso social-democrata e razões da crise) e, pela nota de escopo, que o conteúdo completo exige cadastro gratuito.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor, a correspondência entre Estado liberal clássico e Estado mínimo (definição da p. 75), a definição de Estado de bem-estar social citada literalmente (p. 86), a revisão de paradigmas no pensamento liberal e a apresentação desse modelo ao lado dos Estados liberal e socialista.",
        },
        {
          key: "ril-204-estado-liberal-estado-democratico",
          supports: "Sustenta, como interpretação do autor, a organização da trajetória Estado Liberal, Estado Social e Estado Democrático de Direito.",
        },
        {
          key: "cf88-art1",
          supports: "Sustenta que a Constituição de 1988 define a República como Estado Democrático de Direito.",
        },
        {
          key: "ilb-doutrina-novas-esquerdas",
          supports:
            "Sustenta que a série do ILB tem curso sobre as chamadas novas esquerdas, com as unidades “Esquerda e Direita Hoje” e sobre a Terceira Via, sem que a ementa pública a defina.",
        },
        {
          key: "camara-bd-scheeffer-espectro-ideologico",
          supports: "Sustenta que há várias formas de classificar partidos numa escala esquerda-direita.",
        },
        {
          key: "ril-238-cultura-politica-esquerda",
          supports:
            "Sustenta, como tese do autor, o momento em que o pensamento político de esquerda no Brasil se abriu aos valores democráticos e passou a falar a linguagem dos direitos humanos (trecho citado literalmente).",
        },
        {
          key: "cf88-art6",
          supports:
            "Sustenta a inclusão do transporte na lista de direitos sociais e, pela nota de escopo, que o artigo não define como cada direito deve ser financiado ou prestado.",
        },
        {
          key: "cf88-art30",
          supports: "Sustenta que compete aos municípios organizar e prestar os serviços públicos de interesse local, incluído o transporte coletivo.",
        },
      ],
    },
    {
      slug: "socialismos-e-comunismo",
      number: 2,
      title: "Socialismos e comunismo: propriedade, classes e Estado",
      objective:
        "Identificar o que as fontes do acervo dizem sobre os socialismos e o comunismo, separando propostas dos autores, interpretações de livros didáticos e lacunas.",
      minutes: 6,
      currentKeys: ["socialismos"],
      content: {
        intro:
          "Esta lição apresenta os socialismos e o comunismo a partir das fontes do acervo da Polis: o que elas destacam, as ideias centrais, as variações, os debates registrados e os limites do material. O plural “socialismos” indica que há variações internas, mas o acervo detalha sobretudo o pensamento marxista. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Socialismos e comunismo",
            text: "No pensamento marxista, tal como apresentado no livro didático de Ricardo Corrêa Coelho e Helena da Motta Salles (2015), o socialismo seria uma fase de transição do capitalismo ao comunismo, e no comunismo o Estado deixaria de existir. O Instituto Legislativo Brasileiro (ILB), do Senado Federal, também estuda o socialismo em curso próprio da série Doutrina Política.",
            sources: ["pnap-ciencia-politica", "ilb-doutrina-socialismo"],
          },
          {
            type: "paragraph",
            text: "Os temas do título, propriedade, classes e Estado, aparecem sobretudo em três fontes do acervo: o Manifesto do Partido Comunista, escrito por Karl Marx e Friedrich Engels em 1848, e dois livros didáticos públicos que apresentam o pensamento marxista. Um deles, de Coelho e Salles (2015), afirma que liberalismo e marxismo orientam “a ação da maior parte dos grupos políticos que se encontram em disputa nas sociedades ocidentais”. Já a ementa do curso do ILB, isto é, o resumo do seu programa, apenas indica temas; o conteúdo completo exige cadastro gratuito.",
            sources: ["dominiopublico-manifesto-comunista", "pnap-ciencia-politica", "pnap-estado-governo-mercado", "ilb-doutrina-socialismo"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "paragraph",
            text: "O Manifesto se apresenta como um texto programático, redigido por comunistas de várias nacionalidades reunidos em Londres; segundo o próprio texto, era hora de expor o modo de ver, os fins e as tendências dos comunistas. No início da seção “Burgueses e Proletários”, Marx e Engels afirmam:",
            sources: ["dominiopublico-manifesto-comunista"],
          },
          {
            type: "quote",
            text: "A história de todas as sociedades que existiram até nossos dias tem sido a história das lutas de classes.",
            sourceKey: "dominiopublico-manifesto-comunista",
            locator: "Burgueses e Proletários (início)",
          },
          {
            type: "paragraph",
            text: "Segundo os autores, essas lutas opõem opressores e oprimidos. Eles escrevem que o que caracteriza o comunismo “não é a abolição da propriedade em geral, mas a abolição da propriedade burguesa”. E propõem que, na “revolução operária”, o proletariado, a classe dos operários, se torne “classe dominante” e use sua supremacia política para “arrancar pouco a pouco todo capital à burguesia” e “centralizar todos os instrumentos de produção nas mãos do Estado”. Em outro livro didático, Coelho (2014) aponta como primeira característica fundamental do Estado socialista “o controle estatal de todo o processo produtivo”.",
            sources: ["dominiopublico-manifesto-comunista", "pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "Nesta lição, o plural “socialismos” indica que o nome reúne formulações diferentes, mas o acervo não descreve cada uma delas. A ementa do ILB traz uma distinção: depois de uma unidade de “Conceitos”, separa “A utopia Socialista”, ou seja, a proposta, de “O Socialismo real”, ou seja, as experiências históricas. A ementa não diz quais experiências são essas. No pensamento marxista, segundo Coelho e Salles (2015), socialismo e comunismo também não são sinônimos: durante a fase socialista, o proletariado usaria “toda a força do Estado para acabar com a sociedade de classes”.",
            sources: ["ilb-doutrina-socialismo", "pnap-ciencia-politica"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "Por ser um texto programático, o Manifesto registra o que Marx e Engels defendiam; ele não comprova suas teses nem os resultados históricos. A ementa do ILB dedica uma unidade às experiências históricas, mas o trecho público não diz como o curso as analisa. Nos livros didáticos do acervo, o marxismo é estudado ao lado de outras ideias: Coelho e Salles (2015) o apresentam junto ao liberalismo, e Coelho (2014) descreve o Estado socialista ao lado de outros modelos, como o Estado liberal e o Estado de bem-estar social. São interpretações dos autores.",
            sources: ["dominiopublico-manifesto-comunista", "ilb-doutrina-socialismo", "pnap-ciencia-politica", "pnap-estado-governo-mercado"],
          },
          {
            type: "example",
            title: "Situação hipotética: a fábrica de calçados da cidade",
            text: "Em uma cidade fictícia, uma fábrica de calçados pertence a uma família e emprega boa parte dos moradores. Os conceitos desta lição ajudam a formular uma pergunta: quem deve controlar os instrumentos de produção, como as máquinas e o prédio da fábrica? No modelo que Coelho (2014) chama de Estado socialista, a resposta seria o Estado, que teria o controle de “todo o processo produtivo”. No Manifesto, Marx e Engels propõem uma passagem gradual: “arrancar pouco a pouco todo capital à burguesia” e centralizar os instrumentos de produção nas mãos do Estado. A situação mostra como os conceitos organizam a pergunta; não indica se a proposta é desejável nem como ela funcionou em experiências reais, que o acervo não detalha.",
            sources: ["pnap-estado-governo-mercado", "dominiopublico-manifesto-comunista"],
          },
          {
            type: "comparison",
            title: "Estado e economia nas duas lições",
            intro: "Os dois quadros seguem o mesmo roteiro: o que as fontes dizem, quem afirma e qual é o limite do trecho.",
            orderNote: "Mesma ordem das lições do módulo.",
            items: [
              {
                label: "Social-democracia",
                heading: "Papel do Estado: intervir no mercado",
                text: "O que as fontes dizem: o Estado de bem-estar social sucede o Estado liberal e intervém no mercado por meio de políticas públicas, para assegurar um patamar mínimo de igualdade social e de bem-estar. Quem afirma: Coelho (2014), em livro didático. Limite: os trechos do acervo não chamam esse modelo de social-democrata; a aproximação foi feita na lição anterior, como escolha de organização.",
                sources: ["pnap-estado-governo-mercado"],
              },
              {
                label: "Socialismos e comunismo",
                heading: "Papel do Estado: controlar a produção",
                text: "O que as fontes dizem: o Estado socialista tem como primeira característica o controle estatal de todo o processo produtivo, e o Manifesto propõe centralizar os instrumentos de produção nas mãos do Estado. Quem afirma: Coelho (2014), em livro didático, e Marx e Engels, como proposta. Limite: o Manifesto não comprova resultados; e, no marxismo, segundo Coelho e Salles (2015), o Estado deixaria de existir no comunismo.",
                sources: ["pnap-estado-governo-mercado", "dominiopublico-manifesto-comunista", "pnap-ciencia-politica"],
              },
            ],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo detalha sobretudo o pensamento marxista; outras vertentes socialistas não são descritas. As experiências históricas, que a ementa do ILB chama de socialismo real, não são documentadas aqui, assim como os países, as datas e os governos ligados a elas. Os trechos citados usam termos como capital, capitalismo, burguesia e proletariado sem defini-los em detalhe. O acervo também não reúne críticas de outras correntes aos socialismos e ao comunismo; por isso, a lição não as resume.",
          },
        ],
        relatedConcepts: [
          {
            term: "Luta de classes",
            explanation: "Segundo Marx e Engels no Manifesto, conflito entre opressores e oprimidos que, para os autores, marca a história das sociedades.",
          },
          {
            term: "Estado socialista",
            explanation: "Segundo Coelho (2014), modelo de Estado cuja primeira característica fundamental é o controle estatal de todo o processo produtivo.",
          },
          {
            term: "Socialismo real",
            explanation: "Nome que a ementa do curso do ILB dá às experiências históricas do socialismo, distintas da proposta, chamada de utopia socialista.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho e Salles (2015), qual é o lugar do socialismo no pensamento marxista?",
            options: [
              { id: "a", text: "Outro nome para o Estado de bem-estar social." },
              { id: "b", text: "A etapa final, na qual o Estado controla tudo de forma permanente." },
              { id: "c", text: "Uma fase de transição do capitalismo ao comunismo." },
            ],
            correctOptionId: "c",
            explanation:
              "Para o marxismo, segundo os autores, o socialismo seria uma fase transitória, durante a qual o proletariado usaria a força do Estado para acabar com a sociedade de classes; no comunismo, o Estado deixaria de existir. Por isso, a alternativa b inverte a ideia. O Estado de bem-estar social é outro modelo, descrito por Coelho (2014) como um Estado que intervém no mercado por meio de políticas públicas.",
          },
          {
            id: "q2",
            prompt: "Segundo Marx e Engels no Manifesto, o que caracteriza o comunismo?",
            options: [
              { id: "a", text: "A abolição de toda forma de propriedade." },
              { id: "b", text: "A abolição da propriedade burguesa, e não da propriedade em geral." },
              { id: "c", text: "A manutenção do capital nas mãos da burguesia." },
            ],
            correctOptionId: "b",
            explanation:
              "Os autores escrevem que o que caracteriza o comunismo não é a abolição da propriedade em geral, mas a abolição da propriedade burguesa; a alternativa a ignora essa distinção. A alternativa c contraria a proposta do texto, que fala em arrancar pouco a pouco todo capital à burguesia. A pergunta trata do que o texto afirma: o Manifesto registra o que os autores defendiam, sem comprovar suas teses.",
          },
          {
            id: "q3",
            prompt: "Na ementa do curso do ILB sobre socialismo, o que distingue “A utopia Socialista” de “O Socialismo real”?",
            options: [
              { id: "a", text: "A primeira se refere à proposta socialista; a segunda, às experiências históricas." },
              { id: "b", text: "São dois nomes para a mesma coisa." },
              { id: "c", text: "A primeira trata do comunismo; a segunda, da social-democracia." },
            ],
            correctOptionId: "a",
            explanation:
              "A ementa separa a proposta, chamada de utopia socialista, das experiências históricas, chamadas de socialismo real; os nomes não são sinônimos. A social-democracia não é tema dessas unidades: ela tem curso próprio na mesma série do ILB.",
          },
        ],
      },
      sources: [
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, como interpretação dos autores, que no pensamento marxista o socialismo seria fase transitória do capitalismo ao comunismo, durante a qual o proletariado usaria toda a força do Estado para acabar com a sociedade de classes (p. 65), que no comunismo o Estado deixaria de existir e que liberalismo e marxismo orientam a maior parte dos grupos políticos em disputa nas sociedades ocidentais (p. 43).",
        },
        {
          key: "ilb-doutrina-socialismo",
          supports:
            "Sustenta que o ILB, do Senado, oferece curso sobre socialismo na série Doutrina Política, que a ementa tem as unidades Conceitos, A utopia Socialista e O Socialismo real e, pela nota de escopo, que ela distingue a proposta das experiências históricas e que o conteúdo completo exige cadastro gratuito.",
        },
        {
          key: "dominiopublico-manifesto-comunista",
          supports:
            "Sustenta o que Marx e Engels afirmavam e propunham em 1848: a apresentação do texto como manifesto programático, a história como história das lutas de classes (citação literal), a oposição entre opressores e oprimidos, a abolição da propriedade burguesa e a proposta de centralizar os instrumentos de produção nas mãos do Estado. Pela nota de escopo, o texto não comprova as teses nem os resultados históricos.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor, que a primeira característica fundamental do Estado socialista é o controle estatal de todo o processo produtivo (p. 81), a apresentação desse modelo ao lado dos Estados liberal e de bem-estar social e a definição de Estado de bem-estar social usada na comparação (p. 86).",
        },
      ],
    },
  ],
};
