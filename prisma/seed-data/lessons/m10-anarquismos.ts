import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloAnarquismos: SeedModule = {
  slug: "anarquismos",
  number: 10,
  title: "Anarquismos",
  summary:
    "Os anarquismos segundo as fontes do acervo: a crítica de Bakunin à autoridade e à organização política, a presença anarquista no movimento operário brasileiro e os debates com outras correntes sobre o Estado.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "autoridade-e-estado",
      number: 1,
      title: "Anarquismos: autoridade, Estado e auto-organização",
      objective: "Identificar o que Bakunin defendia sobre autoridade e organização política e como o acervo registra a experiência anarquista no Brasil.",
      minutes: 6,
      currentKeys: ["anarquismos"],
      reviewedOn: REVISED_ON,
      previous: { module: "anarquismos-e-libertarianismos", lesson: "anarquismos" },
      content: {
        intro:
          "Esta lição apresenta as ideias centrais do anarquismo a partir de um texto de Mikhail Bakunin, a principal fonte do acervo sobre a corrente. O plural “anarquismos” indica que a corrente tem vertentes, e o texto de Bakunin representa apenas uma delas. A experiência anarquista no Brasil e os debates são tema da próxima lição. A lição descreve essas ideias, sem avaliá-las.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Anarquismo",
            text: "Nome de uma corrente que, no acervo da Polis, aparece de duas formas: na posição de um autor anarquista, Mikhail Bakunin, no texto Deus e o Estado, e num estudo histórico sobre a presença anarquista no movimento operário brasileiro. O acervo não traz uma definição geral da corrente; por isso, esta lição a apresenta pelo que essas duas fontes mostram.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado", "camara-bd-mendes-anarquismo-1917"],
          },
          {
            type: "paragraph",
            text: "Nos trechos de Deus e o Estado reunidos no acervo, o tema central é a autoridade: qual seria legítima, qual não seria e se há necessidade de organização política. A edição disponível no portal Domínio Público, do Ministério da Educação, reproduz a primeira, de 1882, apresentada por Carlo Cafiero e Elisée Reclus, com tradução de Plínio Augusto Coelho. Por ser um texto do próprio autor, ele registra a posição que Bakunin defendia, mas não a comprova.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "paragraph",
            text: "Nos trechos do acervo, Bakunin distingue tipos de autoridade. Ele descreve como “exclusivamente legítima” uma autoridade que considera “racional e conforme à liberdade humana” e declara “todas as outras autoridades mentirosas, arbitrárias e funestas” (funestas quer dizer nocivas). Essa distinção não equivale a recusar qualquer autoridade, como mostra o trecho a seguir.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado"],
          },
          {
            type: "quote",
            text: "Decorre daí que rejeito toda autoridade? Longe de mim este pensamento. Quando se trata de botas, apelo para a autoridade dos sapateiros",
            sourceKey: "dominiopublico-bakunin-deus-e-o-estado",
            locator: "p. 26",
          },
          {
            type: "paragraph",
            text: "Bakunin também afirma reconhecer “a autoridade absoluta da ciência”, mas rejeita “a infalibilidade e a universalidade do cientista”, isto é, a ideia de que o cientista nunca erra e entende de tudo. Em outra passagem, escreve que “a igreja e o Estado são minhas duas ovelhas negras”. Sobre a política, projeta que “não haverá necessidade de organização, nem de direção nem de legislação políticas”. Para ele, essas três coisas emanam “da vontade do soberano ou da votação de um parlamento eleito pelo sufrágio universal”, ou seja, pelo voto de todos os cidadãos com direito a votar. Como o trecho começa no meio de uma frase, ele não mostra em que situação o autor faz essa projeção.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "O catálogo de fontes da Polis registra que o texto de Bakunin representa uma das vertentes do anarquismo, não todas; os trechos disponíveis não descrevem em que as vertentes se diferenciam. A presença anarquista no movimento operário brasileiro, estudada por Maurício Matos Mendes (2009), é tema da próxima lição.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado", "camara-bd-mendes-anarquismo-1917"],
          },
          {
            type: "example",
            title: "Situação hipotética: a horta do bairro",
            text: "Numa cidade fictícia, moradores de um bairro criam uma horta num terreno público vazio. Para decidir o que plantar, consultam uma agrônoma, assim como Bakunin diz apelar para a autoridade dos sapateiros quando se trata de botas. Depois, a prefeitura publica uma regra com horários de uso do terreno. Com a distinção do autor, a pergunta passa a ser se cada uma dessas autoridades é “racional e conforme à liberdade humana”. O exemplo mostra como o conceito organiza a discussão; não diz qual resposta é a certa nem se a visão de Bakunin é correta.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo cobre uma vertente do anarquismo, a de Bakunin. Ele não descreve as demais vertentes nem reúne textos de outros autores anarquistas. Os trechos de Bakunin são curtos e não mostram como a vida coletiva se organizaria sem organização política; por isso, a “auto-organização” do título fica aqui como pergunta em aberto. O anarcocapitalismo não tem fonte no acervo e, por isso, não é definido nem apresentado nesta lição.",
          },
        ],
        relatedConcepts: [
          {
            term: "Autoridade legítima",
            explanation:
              "Nos trechos de Bakunin, a autoridade que o autor considera “racional e conforme à liberdade humana”; as demais ele declara mentirosas, arbitrárias e funestas.",
          },
          {
            term: "Vertente",
            explanation: "Linha de pensamento dentro de uma corrente; o catálogo da Polis registra o texto de Bakunin como uma das vertentes do anarquismo, não todas.",
          },
          {
            term: "Texto primário",
            explanation: "Texto escrito pelo próprio autor de uma corrente, como Deus e o Estado; registra a posição que ele defendia, mas não a comprova.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Nos trechos de Deus e o Estado citados na lição, Bakunin rejeita toda autoridade?",
            options: [
              { id: "a", text: "Sim: para ele, nenhuma autoridade é aceitável." },
              { id: "b", text: "Não: ele apela para a autoridade dos sapateiros quando se trata de botas e reconhece a autoridade da ciência." },
              { id: "c", text: "Não: ele aceita qualquer autoridade, desde que venha de um parlamento eleito." },
            ],
            correctOptionId: "b",
            explanation:
              "Bakunin pergunta se rejeita toda autoridade e responde: “Longe de mim este pensamento”. Ele apela para a autoridade dos sapateiros quando se trata de botas e reconhece a autoridade da ciência, embora rejeite a infalibilidade do cientista. O equívoco provável é supor que o autor recusa qualquer autoridade. A alternativa c também não corresponde ao texto: a votação de um parlamento eleito aparece entre as origens da organização política que, na projeção dele, deixaria de ser necessária.",
          },
          {
            id: "q2",
            prompt: "Para Bakunin, de onde emanam a organização, a direção e a legislação políticas que, na projeção dele, deixariam de ser necessárias?",
            options: [
              { id: "a", text: "Apenas da vontade de um soberano." },
              { id: "b", text: "Da vontade do soberano ou da votação de um parlamento eleito pelo sufrágio universal." },
              { id: "c", text: "Da autoridade absoluta da ciência." },
            ],
            correctOptionId: "b",
            explanation:
              "O trecho cita as duas origens: a vontade do soberano e a votação de um parlamento eleito pelo sufrágio universal. O equívoco provável é pensar que a projeção do autor alcança só governantes que não foram eleitos. A ciência aparece em outro trecho, no qual Bakunin reconhece sua autoridade, mas rejeita a infalibilidade e a universalidade do cientista.",
          },
          {
            id: "q3",
            prompt: "No exemplo da horta, que pergunta a distinção de Bakunin ajuda a formular?",
            options: [
              { id: "a", text: "Se cada autoridade envolvida, a da agrônoma e a da prefeitura, é racional e conforme à liberdade humana." },
              { id: "b", text: "Quantos moradores devem votar na escolha das plantas." },
              { id: "c", text: "Se a horta deve ser vendida a uma empresa." },
            ],
            correctOptionId: "a",
            explanation:
              "A distinção de Bakunin separa a autoridade que ele considera legítima, racional e conforme à liberdade humana, das demais. O exemplo usa essa distinção para formular a pergunta, sem dizer qual resposta é a certa. As alternativas b e c tratam de questões que o trecho do autor não aborda.",
          },
        ],
      },
      sources: [
        {
          key: "dominiopublico-bakunin-deus-e-o-estado",
          supports:
            "Texto primário de Mikhail Bakunin (Deus e o Estado), em edição que reproduz a primeira, de 1882, apresentada por Carlo Cafiero e Elisée Reclus, com tradução de Plínio Augusto Coelho. Sustenta os trechos citados: p. 26 (não rejeita toda autoridade; autoridade dos sapateiros), p. 27 (autoridade “exclusivamente legítima”, racional e conforme à liberdade humana; demais autoridades mentirosas, arbitrárias e funestas; autoridade da ciência sem infalibilidade do cientista; a igreja e o Estado como “duas ovelhas negras”) e p. 23 (projeção de que não haverá necessidade de organização, direção e legislação políticas). Pela nota de escopo, registra a posição de um autor anarquista sem comprová-la e representa uma das vertentes do anarquismo, não todas.",
        },
        {
          key: "camara-bd-mendes-anarquismo-1917",
          supports:
            "Estudo histórico (monografia de especialização do Cefor/Câmara, 2009) sobre a experiência anarquista no Brasil; sustenta, na definição, que o acervo registra a corrente também como presença no movimento operário brasileiro.",
        },
      ],
    },
    {
      slug: "experiencia-no-brasil-e-debates",
      number: 2,
      title: "Anarquismos: a experiência no Brasil e os debates sobre o Estado",
      objective:
        "Identificar como o acervo registra a presença anarquista no movimento operário brasileiro e os debates com outras correntes, distinguindo o termo anarquia, usado pela ciência política, do nome da corrente.",
      minutes: 7,
      currentKeys: ["anarquismos"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "Esta lição mostra o anarquismo como experiência histórica no Brasil e como objeto de debate com outras correntes. As fontes são um estudo histórico publicado pela Câmara dos Deputados e dois livros didáticos públicos, de Ricardo Corrêa Coelho (2014) e de Coelho e Helena da Motta Salles (2015), que tratam da corrente apenas em menções. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "A experiência anarquista no Brasil" },
          {
            type: "paragraph",
            text: "O estudo de Maurício Matos Mendes (2009), monografia de especialização do Cefor, da Câmara dos Deputados, trata da presença anarquista no movimento operário brasileiro. Ele investiga a repercussão na Câmara das greves operárias de 1917 e analisa o papel da Casa na política de expulsão de estrangeiros da segunda década do século XX. Os trechos do acervo não detalham os argumentos apresentados na Câmara nem quem foi atingido por essa política.",
            sources: ["camara-bd-mendes-anarquismo-1917"],
          },
          {
            type: "paragraph",
            text: "O livro didático de Coelho (2014) ajuda a situar esse período. Segundo o autor, os anos anteriores à Lei Eloy Chaves, de 1923, que criou as Caixas de Aposentadoria e Pensão, foram marcados por diversos movimentos grevistas e intensa agitação operária; até então, a questão social chegou a ser tratada como “caso de polícia”, expressão que o autor atribui ao presidente Washington Luís. Sobre os sindicatos, o livro registra:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Se nos anos de 1910 os patrões e o governo viram-se, por diversas vezes, desafiados por movimentos reivindicatórios organizados pelos sindicatos, o mesmo não aconteceu nos anos de 1920, que foram marcados pelo recesso do movimento operário e decadência dos sindicatos anarquistas, que tiveram grande força na década anterior.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 91–92",
          },
          {
            type: "paragraph",
            text: "Na interpretação do autor, por isso, os benefícios sociais concedidos logo depois de 1930 não podem ser creditados à pressão do movimento operário organizado. O livro não descreve as ideias dos sindicatos anarquistas nem explica por que eles entraram em decadência.",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Anarquia e anarquismo" },
          {
            type: "definition",
            term: "Anarquia, na ciência política",
            text: "No livro de Coelho e Salles (2015), situação de uma sociedade em que não existe uma instância que exerça com exclusividade a força física sobre os seus membros; nesse caso, a rigor, não se pode falar na existência de um Estado. Os autores seguem a definição do sociólogo Max Weber, para quem o Estado se caracteriza pelo monopólio do uso legítimo da força física.",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "paragraph",
            text: "A palavra anarquia, nesse sentido, descreve uma situação; anarquismo é o nome de uma corrente de ideias. O trecho do livro não trata da corrente, e o acervo não traz texto que ligue as duas palavras. Por isso, a lição não afirma que os anarquistas defendam a situação descrita pelos autores: na lição anterior, viu-se que Bakunin rejeitava autoridades que não considerava legítimas, sem recusar toda autoridade.",
            sources: ["pnap-ciencia-politica", "dominiopublico-bakunin-deus-e-o-estado"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "O acervo registra uma crítica vinda de outra corrente. Coelho (2014) reproduz, em tradução para o espanhol, um trecho em que Lênin, que comandou o Estado soviético depois da revolução russa de 1917, chama de utopia absurda a ideia de passar do capitalismo ao socialismo sem coerção e sem ditadura e a qualifica como um absurdo democrático-pequeno-burguês e anarquista. É a posição de Lênin, tratada no módulo Comunismo; o acervo não traz respostas de autores anarquistas a essa crítica.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "comparison",
            title: "O lugar do Estado em três correntes",
            intro:
              "Nas fontes do acervo, três correntes projetam o fim do Estado ou restringem o seu papel, de modos diferentes. Os quadros seguem o mesmo roteiro: o que a fonte diz, o conceito-chave e o limite do trecho.",
            orderNote: "Mesma ordem dos módulos da trilha.",
            items: [
              {
                label: "Comunismo",
                heading: "Papel do Estado, no pensamento de Marx",
                text: "O que diz: segundo Coelho e Salles (2015), depois de uma fase de transição em que o proletariado usaria a força do Estado, “o próprio Estado deixaria de existir” quando as classes fossem abolidas. Conceito-chave: classes sociais. Limite: é um resumo didático de uma proposta, e os mesmos autores classificam como totalitários os regimes comunistas do século XX.",
                sources: ["pnap-ciencia-politica"],
              },
              {
                label: "Anarquismos",
                heading: "Papel do Estado, na vertente de Bakunin",
                text: "O que diz: Bakunin projeta que “não haverá necessidade de organização, nem de direção nem de legislação políticas”. Conceito-chave: autoridade; o autor só reconhece como legítima a que considera “racional e conforme à liberdade humana”. Limite: é a posição de um autor, em uma das vertentes, e os trechos não mostram como a vida coletiva se organizaria.",
                sources: ["dominiopublico-bakunin-deus-e-o-estado"],
              },
              {
                label: "Libertarianismos",
                heading: "Papel do Estado, na descrição de Rocha e Galuppo",
                text: "O que diz: para os autores, o libertarianismo defende uma concepção de justiça em que o Estado “só pode atuar corretivamente”. Conceito-chave: justiça; a ação do Estado é admitida, mas só de forma corretiva. Limite: os autores apontam dificuldade em colocar essa concepção em prática, e o trecho não detalha o que seria corrigido.",
                sources: ["ril-210-paternalismo-libertario"],
              },
            ],
          },
          {
            type: "example",
            title: "Situação hipotética: a greve na tecelagem de Serra Clara",
            text: "Na cidade fictícia de Serra Clara, no início do século XX, operários de uma tecelagem entram em greve, organizados por um sindicato de orientação anarquista. Na Câmara Municipal, vereadores discutem como responder. Os conceitos das duas lições ajudam a formular perguntas: que autoridades os grevistas reconhecem como legítimas? O poder público trata a greve como questão social ou como caso de polícia? A situação não reproduz os debates reais de 1917, que os trechos do acervo não detalham, nem indica qual resposta seria a certa.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado", "pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "Sobre a experiência anarquista no Brasil, o acervo traz o resumo de um estudo e menções em um livro didático, sem documentos dos sindicatos nem textos de militantes. A crítica de Lênin chega por citação em outro livro, e o acervo não traz respostas anarquistas a ela. O anarcocapitalismo não tem fonte no acervo e, por isso, não é definido nem apresentado nesta lição.",
          },
        ],
        relatedConcepts: [
          {
            term: "Anarquia",
            explanation:
              "No livro de Coelho e Salles (2015), situação em que não existe uma instância que exerça com exclusividade a força física sobre os membros de uma sociedade; difere do nome da corrente, anarquismo.",
          },
          {
            term: "Questão social",
            explanation:
              "Expressão usada por Coelho (2014) para os problemas ligados às condições de vida e de trabalho dos operários; segundo o autor, só a partir da Lei Eloy Chaves, de 1923, o Estado brasileiro mostrou alguma preocupação com ela.",
          },
          {
            term: "Monopólio da força",
            explanation: "Na definição de Max Weber seguida por Coelho e Salles (2015), traço que caracteriza o Estado: o uso legítimo e exclusivo da força física.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Como o acervo da Polis cobre o anarquismo?",
            options: [
              { id: "a", text: "Com textos de todas as vertentes anarquistas e uma definição geral da corrente." },
              { id: "b", text: "Com um texto de Bakunin, um estudo histórico sobre a experiência anarquista no Brasil e menções em livros didáticos." },
              { id: "c", text: "Apenas com um estudo sobre as greves operárias de 1917." },
            ],
            correctOptionId: "b",
            explanation:
              "O catálogo registra o texto de Bakunin como uma das vertentes do anarquismo, não todas, inclui o estudo de Mendes (2009) sobre a experiência anarquista no Brasil e traz menções à corrente em dois livros didáticos. O acervo não tem uma definição geral da corrente nem textos de outras vertentes.",
          },
          {
            id: "q2",
            prompt: "Segundo Coelho (2014), o que aconteceu com os sindicatos anarquistas no Brasil nos anos 1920?",
            options: [
              { id: "a", text: "Entraram em decadência, depois de terem tido grande força na década anterior." },
              { id: "b", text: "Chegaram ao governo federal." },
              { id: "c", text: "Surgiram pela primeira vez no país." },
            ],
            correctOptionId: "a",
            explanation:
              "O autor descreve os anos 1920 como marcados pelo recesso do movimento operário e pela decadência dos sindicatos anarquistas, que tiveram grande força nos anos 1910. As alternativas b e c contrariam o texto: os sindicatos já existiam e eram fortes na década anterior.",
          },
          {
            id: "q3",
            prompt: "No livro de Coelho e Salles (2015), o que significa uma situação de anarquia?",
            options: [
              { id: "a", text: "Uma sociedade sem uma instância que exerça com exclusividade a força física; nela, a rigor, não se pode falar em Estado." },
              { id: "b", text: "O programa de um partido anarquista." },
              { id: "c", text: "Um governo eleito por sufrágio universal." },
            ],
            correctOptionId: "a",
            explanation:
              "Os autores usam o termo no quadro da definição de Estado de Max Weber. O trecho não trata da corrente anarquista, por isso a alternativa b confunde a situação descrita com o nome da corrente. A alternativa c não tem relação com a definição.",
          },
        ],
      },
      sources: [
        {
          key: "camara-bd-mendes-anarquismo-1917",
          supports:
            "Estudo histórico (monografia de especialização do Cefor/Câmara, 2009) sobre a experiência anarquista no Brasil e a presença anarquista no movimento operário brasileiro; sustenta a repercussão na Câmara das greves operárias de 1917 e o papel da Câmara na política de expulsão de estrangeiros da segunda década do século XX.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor: o trecho de Lênin, citado em espanhol, sobre a passagem ao socialismo sem coerção nem ditadura (p. 56); a Lei Eloy Chaves e a questão social como caso de polícia (p. 90); os movimentos grevistas anteriores a 1923 e a força dos sindicatos anarquistas nos anos 1910, citada literalmente, com seu declínio nos anos 1920 (p. 91–92); e a leitura de que os benefícios do pós-1930 não podem ser creditados à pressão operária (p. 91).",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta a definição de Estado segundo Weber e a de situação de anarquia (p. 21) e, no quadro comparativo, o fim do Estado no pensamento de Marx (p. 65–66) e os regimes comunistas que mantiveram o controle do Estado (p. 79–86), como interpretações dos autores.",
        },
        {
          key: "dominiopublico-bakunin-deus-e-o-estado",
          supports:
            "Usado no quadro comparativo e no exemplo: projeção de Bakunin de que não haverá necessidade de organização, direção e legislação políticas (p. 23) e autoridade que ele considera legítima por ser racional e conforme à liberdade humana (p. 26–27).",
        },
        {
          key: "ril-210-paternalismo-libertario",
          supports: "Usado no quadro comparativo: concepção libertária de justiça segundo a qual o Estado só pode atuar corretivamente, como interpretação dos autores.",
        },
      ],
    },
  ],
};
