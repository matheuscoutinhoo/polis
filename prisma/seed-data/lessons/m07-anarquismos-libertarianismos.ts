import type { SeedModule } from "./types";

export const moduloAnarquismosLibertarianismos: SeedModule = {
  slug: "anarquismos-e-libertarianismos",
  number: 7,
  title: "Anarquismos e libertarianismos",
  summary: "Como anarquismos e libertarianismos tratam a autoridade, o Estado e a liberdade, segundo as fontes do acervo.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "anarquismos",
      number: 1,
      title: "Anarquismos: autoridade, Estado e auto-organização",
      objective: "Identificar o que Bakunin defendia sobre autoridade e organização política e como o acervo registra a experiência anarquista no Brasil.",
      minutes: 6,
      currentKeys: ["anarquismos"],
      content: {
        intro:
          "Esta lição apresenta o anarquismo a partir de duas fontes do acervo: um texto de Mikhail Bakunin e um estudo histórico sobre a experiência anarquista no Brasil. O plural “anarquismos” indica que a corrente tem vertentes, e o texto de Bakunin representa apenas uma delas. A lição descreve essas ideias, sem avaliá-las.",
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
            text: "O catálogo de fontes da Polis registra que o texto de Bakunin representa uma das vertentes do anarquismo, não todas; os trechos disponíveis não descrevem em que as vertentes se diferenciam. O acervo também mostra a corrente como experiência histórica no Brasil: o estudo de Maurício Matos Mendes (2009), monografia de especialização do Cefor, da Câmara dos Deputados, trata da presença anarquista no movimento operário brasileiro.",
            sources: ["dominiopublico-bakunin-deus-e-o-estado", "camara-bd-mendes-anarquismo-1917"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "O estudo de Mendes registra a reação de uma instituição pública, a Câmara dos Deputados, às greves de 1917. Ele investiga a repercussão dessas greves operárias na Câmara e analisa o papel da Casa na política de expulsão de estrangeiros da segunda década do século XX. Os trechos do acervo não detalham os argumentos apresentados na Câmara nem quem foi atingido por essa política.",
            sources: ["camara-bd-mendes-anarquismo-1917"],
          },
          {
            type: "limit",
            title: "Críticas não documentadas",
            text: "O acervo não reúne textos que critiquem as ideias anarquistas, e os trechos do estudo de Mendes não trazem avaliações dessas ideias. Por isso, esta lição não apresenta críticas à corrente.",
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
            text: "O acervo cobre uma vertente do anarquismo, a de Bakunin, e um estudo histórico brasileiro. Ele não descreve as demais vertentes nem reúne textos de outros autores anarquistas. Os trechos de Bakunin são curtos e não mostram como a vida coletiva se organizaria sem organização política; por isso, a “auto-organização” do título fica aqui como pergunta em aberto. O anarcocapitalismo não tem fonte no acervo e, por isso, não é definido nem apresentado nesta lição.",
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
            prompt: "Como o acervo da Polis cobre o anarquismo?",
            options: [
              { id: "a", text: "Com textos de todas as vertentes anarquistas e uma definição geral da corrente." },
              { id: "b", text: "Com um texto de Bakunin, que representa uma das vertentes, e um estudo histórico sobre a experiência anarquista no Brasil." },
              { id: "c", text: "Apenas com um estudo sobre as greves operárias de 1917." },
            ],
            correctOptionId: "b",
            explanation:
              "O catálogo registra o texto de Bakunin como uma das vertentes do anarquismo, não todas, e inclui o estudo de Mendes (2009) sobre a experiência anarquista no Brasil e a repercussão das greves de 1917 na Câmara. O acervo não traz uma definição geral da corrente nem textos de outras vertentes. O estudo de Mendes é uma das duas fontes, não a única.",
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
            "Estudo histórico (monografia de especialização do Cefor/Câmara, 2009) sobre a experiência anarquista no Brasil e a presença anarquista no movimento operário brasileiro; sustenta a repercussão na Câmara das greves operárias de 1917, a reação da Câmara a essas greves e o papel da Câmara na política de expulsão de estrangeiros da segunda década do século XX.",
        },
      ],
    },
    {
      slug: "libertarianismos",
      number: 2,
      title: "Libertarianismos: liberdade individual e Estado mínimo",
      objective: "Reconhecer como as fontes do acervo descrevem a concepção libertária de justiça, a ideia de Estado mínimo e os debates sobre elas.",
      minutes: 6,
      currentKeys: ["libertarianismos"],
      content: {
        intro:
          "Esta lição apresenta o libertarianismo a partir de três fontes do acervo: um artigo sobre a concepção libertária de justiça, um livro didático que define Estado mínimo e um livro sobre a tensão entre liberdade e igualdade. O plural “libertarianismos” indica que a corrente não é tratada como um bloco único, embora o acervo não documente suas variações internas. A lição descreve essas ideias, sem avaliá-las.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Libertarianismo",
            text: "Segundo Bruno Anunciação Rocha e Marcelo Campos Galuppo (2016), o libertarianismo defende uma concepção de justiça, isto é, um modo de entender o que é justo, segundo a qual o Estado só pode atuar corretivamente.",
            sources: ["ril-210-paternalismo-libertario"],
          },
          {
            type: "paragraph",
            text: "O artigo, publicado na Revista de Informação Legislativa, do Senado, apresenta a interpretação dos autores. Nessa descrição, a ênfase está no limite à ação do Estado: ele pode agir, mas só de forma corretiva. O trecho do acervo não detalha o que seria corrigido nem em quais situações.",
            sources: ["ril-210-paternalismo-libertario"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "paragraph",
            text: "O título desta lição usa a expressão “Estado mínimo”. No acervo, ela é definida no livro didático de Ricardo Corrêa Coelho (2014), que a emprega para descrever o Estado liberal clássico. O livro não trata do libertarianismo em seção própria. Segundo o autor:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "por Estado mínimo designa-se a organização política que interviria apenas naquilo que fosse estritamente necessário para garantir a liberdade e igualdade dos cidadãos, ficando todas as demais dimensões da vida social a cabo da regulação do mercado.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 75",
          },
          {
            type: "paragraph",
            text: "As duas descrições restringem o que cabe ao Estado, mas com termos diferentes: Coelho fala em intervir “apenas naquilo que fosse estritamente necessário” e deixar o restante à regulação do mercado; Rocha e Galuppo falam em atuar só “corretivamente”.",
            sources: ["pnap-estado-governo-mercado", "ril-210-paternalismo-libertario"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "Os trechos do acervo não distinguem vertentes do libertarianismo. O livro de José Alexandre da Silva Júnior (2014), sobre teoria democrática, apresenta uma posição que põe a liberdade em primeiro plano. Segundo o autor, Nozick acredita que “a sociedade ideal maximiza a liberdade de seus membros” e que, para isso, ela precisa condicionar a distribuição do que é produzido ao “valor que as pessoas atribuem às ações e aos serviços de cada um”. O livro trata esse debate dentro da teoria liberal contemporânea e não usa o rótulo “libertarianismo”; por isso, a lição não classifica Nozick como libertário.",
            sources: ["ufal-ciencia-politica-3"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "Rocha e Galuppo sustentam que há dificuldade em colocar a concepção libertária de justiça em prática. O artigo discute o chamado paternalismo libertário, isto é, induzir comportamentos preservando a liberdade de escolha, e a noção de homo economicus, que os autores apontam como importante para o libertarianismo; o acervo não traz a definição dessa noção. No livro de Silva Júnior, a posição de Nozick é contraposta à de Rawls, para quem “é preciso corrigir, ao menos em parte, a desigualdade decorrente da distribuição desigual de talentos e habilidades”.",
            sources: ["ril-210-paternalismo-libertario", "ufal-ciencia-politica-3"],
          },
          {
            type: "limit",
            title: "Respostas não documentadas",
            text: "O acervo não traz respostas de autores libertários a essas críticas. As avaliações citadas são interpretações dos autores dos estudos.",
          },
          {
            type: "example",
            title: "Situação hipotética: o estacionamento municipal",
            text: "Numa cidade fictícia, a Câmara Municipal discute se a prefeitura deve continuar administrando o estacionamento do centro. Com a definição de Estado mínimo do livro de Coelho, a pergunta seria se administrar o estacionamento é “estritamente necessário para garantir a liberdade e igualdade dos cidadãos”. Se não for, a atividade ficaria a cargo da regulação do mercado. O conceito organiza a discussão, mas não a encerra: vereadores podem avaliar de modos diferentes o que é estritamente necessário. O exemplo não indica qual decisão é a certa.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "comparison",
            title: "O lugar do Estado nas fontes das duas correntes",
            intro:
              "Nas fontes do acervo, as duas correntes restringem o lugar do Estado, de modos diferentes. Os quadros seguem o mesmo roteiro: o que a fonte diz, o conceito-chave e o limite do trecho.",
            orderNote: "Mesma ordem das lições do módulo.",
            items: [
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
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo não traz textos de autores libertários nem descreve vertentes da corrente. O livro de Silva Júnior não usa o rótulo “libertarianismo”, o de Coelho não trata da corrente em seção própria, e nenhuma fonte do acervo liga diretamente o libertarianismo à expressão “Estado mínimo”, usada no título. O anarcocapitalismo também não tem fonte no acervo e não é definido aqui.",
          },
        ],
        relatedConcepts: [
          {
            term: "Estado mínimo",
            explanation:
              "No livro de Coelho (2014), organização política que interviria apenas no estritamente necessário para garantir a liberdade e a igualdade dos cidadãos; o autor a associa ao Estado liberal clássico.",
          },
          {
            term: "Paternalismo libertário",
            explanation: "Ideia discutida por Rocha e Galuppo (2016): induzir comportamentos preservando a liberdade de escolha.",
          },
          {
            term: "Liberdade e igualdade",
            explanation: "Tensão que Silva Júnior (2014) apresenta na teoria liberal contemporânea ao contrapor as posições de Nozick e de Rawls.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Rocha e Galuppo (2016), qual concepção de justiça o libertarianismo defende?",
            options: [
              { id: "a", text: "Uma concepção segundo a qual o Estado só pode atuar corretivamente." },
              { id: "b", text: "Uma concepção segundo a qual não haverá necessidade de organização, nem de direção nem de legislação políticas." },
              { id: "c", text: "Uma concepção segundo a qual a atuação do Estado não tem limites." },
            ],
            correctOptionId: "a",
            explanation:
              "O artigo descreve o libertarianismo como uma concepção de justiça segundo a qual o Estado só pode atuar corretivamente: a ação do Estado é admitida, mas limitada. A alternativa b reproduz uma projeção de Bakunin, apresentada na lição sobre anarquismos; confundir as duas correntes é o equívoco mais provável. A alternativa c contraria a própria descrição, que restringe a atuação do Estado.",
          },
          {
            id: "q2",
            prompt: "No livro de Coelho (2014), o que a expressão “Estado mínimo” descreve?",
            options: [
              { id: "a", text: "O Estado liberal clássico." },
              { id: "b", text: "A concepção libertária de justiça descrita por Rocha e Galuppo." },
              { id: "c", text: "Uma vertente do anarquismo." },
            ],
            correctOptionId: "a",
            explanation:
              "Coelho usa a expressão para o Estado liberal clássico, que interviria apenas no estritamente necessário para garantir a liberdade e a igualdade dos cidadãos. O livro não trata do libertarianismo nem do anarquismo em seções próprias, e nenhuma fonte do acervo liga diretamente o libertarianismo a essa expressão. Por isso, a lição apresenta as duas descrições lado a lado, sem tratá-las como equivalentes.",
          },
          {
            id: "q3",
            prompt: "No debate apresentado por Silva Júnior (2014), qual posição é atribuída a Nozick?",
            options: [
              {
                id: "a",
                text: "A sociedade ideal maximiza a liberdade de seus membros e precisa condicionar a distribuição ao valor atribuído às ações e aos serviços de cada um.",
              },
              { id: "b", text: "É preciso corrigir, ao menos em parte, a desigualdade decorrente da distribuição desigual de talentos e habilidades." },
              { id: "c", text: "O Estado só pode atuar corretivamente." },
            ],
            correctOptionId: "a",
            explanation:
              "Segundo Silva Júnior, Nozick acredita que a sociedade ideal maximiza a liberdade de seus membros e que, para isso, precisa condicionar a distribuição do que é produzido ao valor que as pessoas atribuem às ações e aos serviços de cada um. A alternativa b é a posição atribuída a Rawls, com quem Nozick é contraposto. A alternativa c é a descrição do libertarianismo feita por Rocha e Galuppo; o livro de Silva Júnior não usa o rótulo “libertarianismo”.",
          },
        ],
      },
      sources: [
        {
          key: "ril-210-paternalismo-libertario",
          supports:
            "Artigo acadêmico da Revista de Informação Legislativa (Senado, 2016), com interpretação dos autores: libertarianismo como concepção de justiça segundo a qual o Estado só pode atuar corretivamente; dificuldade de colocar essa concepção em prática; discussão do paternalismo libertário (induzir comportamentos preservando a liberdade de escolha) e da noção de homo economicus, tida como cara ao libertarianismo.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Livro didático de Coelho (2014): definição de Estado mínimo (p. 75), que o autor associa ao Estado liberal clássico; pela nota de escopo, o livro não trata de libertarianismo nem de anarquismo em seções próprias.",
        },
        {
          key: "ufal-ciencia-politica-3",
          supports:
            "Livro de Silva Júnior (2014): posição de Nozick (a sociedade ideal maximiza a liberdade de seus membros; distribuição conforme o valor atribuído às ações e aos serviços de cada um) e de Rawls (corrigir, ao menos em parte, a desigualdade decorrente de talentos e habilidades), apresentadas como tensão entre liberdade e igualdade na teoria liberal contemporânea; pela nota de escopo, o livro não usa o rótulo “libertarianismo”.",
        },
        {
          key: "dominiopublico-bakunin-deus-e-o-estado",
          supports:
            "Usado no quadro comparativo e na verificação: projeção de Bakunin de que não haverá necessidade de organização, direção e legislação políticas (p. 23) e autoridade que ele considera legítima por ser racional e conforme à liberdade humana (p. 27).",
        },
      ],
    },
  ],
};
