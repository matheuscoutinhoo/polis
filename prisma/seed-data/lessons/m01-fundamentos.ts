import type { SeedModule } from "./types";

export const moduloFundamentos: SeedModule = {
  slug: "fundamentos-da-politica",
  number: 1,
  title: "Fundamentos da política",
  summary: "Política, Estado, governo, democracia, cidadania, Constituição e direitos.",
  area: "FUNDAMENTOS",
  stage: "FOUNDATIONS",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "politica-estado-e-governo",
      number: 1,
      title: "Política, Estado e governo",
      objective: "Diferenciar política, Estado e governo e reconhecer como a Constituição organiza o Estado brasileiro.",
      minutes: 5,
      currentKeys: [],
      content: {
        intro:
          "Política, Estado e governo são palavras próximas, mas designam coisas diferentes. Esta lição apresenta cada uma delas e mostra o papel da Constituição, o conjunto de normas que organiza o Estado brasileiro.",
        blocks: [
          { type: "heading", text: "Política: decisões coletivas" },
          {
            type: "definition",
            term: "Política",
            text: "Definição de trabalho desta lição: política é o modo como uma comunidade toma decisões coletivas, isto é, decisões que valem para todos os seus integrantes. Uma assembleia de condomínio que aprova uma regra para o prédio é um exemplo em pequena escala; as decisões de uma cidade ou de um país são exemplos em escala maior. Essa definição serve para organizar a explicação e não vem das fontes citadas.",
            sources: [],
          },
          { type: "heading", text: "Estado: a organização permanente" },
          {
            type: "definition",
            term: "Estado",
            text: "A organização política permanente de um país, que continua existindo quando mudam as pessoas que governam. A Constituição descreve a República brasileira como formada pela “união indissolúvel” dos estados, dos municípios e do Distrito Federal, ou seja, uma união que não pode ser desfeita.",
            sources: ["cf88-art1"],
          },
          {
            type: "quote",
            text: "Art. 18. A organização político-administrativa da República Federativa do Brasil compreende a União, os Estados, o Distrito Federal e os Municípios, todos autônomos, nos termos desta Constituição.",
            sourceKey: "cf88-art18",
            locator: "art. 18, caput",
          },
          {
            type: "paragraph",
            text: "A União corresponde à esfera federal. “Autônomos” indica que cada parte tem atribuições próprias, dentro do que a Constituição define. Atenção à grafia: nesta lição, “Estado”, com maiúscula, é a organização política do país; “estados”, com minúscula, são unidades como aquela em que você talvez more. No texto constitucional, as duas palavras aparecem com maiúscula.",
            sources: ["cf88-art18", "senado-verifica-poder-executivo"],
          },
          { type: "heading", text: "Governo: quem exerce o poder por um período" },
          {
            type: "definition",
            term: "Governo",
            text: "No sentido usado nesta lição, governo é quem exerce o poder do Estado durante um período. É o caso de quem chefia o Poder Executivo: o presidente da República, os governadores e os prefeitos. Os governos mudam; o Estado permanece.",
            sources: ["senado-verifica-poder-executivo"],
          },
          {
            type: "paragraph",
            text: "Segundo o Senado, o Executivo federal é responsável por “administrar o país, executar as leis aprovadas pelo Legislativo e conduzir a política externa”, isto é, cuidar das relações com outros países.",
            sources: ["senado-verifica-poder-executivo"],
          },
          {
            type: "example",
            title: "Muda o prefeito, o município continua",
            text: "Imagine que, depois de uma eleição, uma cidade passa a ter outra pessoa na prefeitura. Mudou o governo: quem chefia o Executivo municipal e administra a cidade a partir daquele momento. O município não mudou. Ele continua sendo uma das partes da organização político-administrativa do país, autônomo nos termos da Constituição. A troca de prefeito também não altera o texto constitucional.",
            sources: ["cf88-art18", "senado-verifica-poder-executivo"],
          },
          { type: "heading", text: "A Constituição organiza o conjunto" },
          {
            type: "definition",
            term: "Constituição",
            text: "Conjunto de normas que organiza o Estado. Ela diz quais partes formam a organização do país (art. 18) e quais são os Poderes da União: o Legislativo, o Executivo e o Judiciário, “independentes e harmônicos entre si” (art. 2º). O papel de cada Poder é tema do módulo “Como o Brasil se organiza”. Os artigos citados nesta lição são da Constituição de 1988.",
            sources: ["cf88-art18", "cf88-art2"],
          },
          {
            type: "paragraph",
            text: "O art. 1º define o Brasil como um Estado Democrático de Direito e afirma que todo o poder “emana do povo”, que o exerce por representantes eleitos ou diretamente, “nos termos desta Constituição”. Em outras palavras: o poder vem do povo e é exercido segundo regras escritas. O mesmo artigo lista cinco fundamentos, isto é, as bases da República: a soberania, a cidadania, a dignidade da pessoa humana, os valores sociais do trabalho e da livre iniciativa e o pluralismo político.",
            sources: ["cf88-art1"],
          },
          {
            type: "paragraph",
            text: "Já o art. 3º lista os objetivos fundamentais da República, ou seja, aonde ela deve chegar: construir uma sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar (eliminar) a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; e promover o bem de todos, sem preconceitos nem discriminação. Esses objetivos orientam as decisões públicas, mas não indicam, por si só, quais medidas os alcançam. Escolher essas medidas é uma decisão coletiva, ou seja, faz parte da política no sentido desta lição.",
            sources: ["cf88-art3"],
          },
          {
            type: "limit",
            title: "Limites desta lição",
            text: "A definição de política usada aqui é uma ferramenta de explicação, não uma citação das fontes. Os arts. 1º e 3º apenas enumeram fundamentos e objetivos: os trechos citados não definem termos como soberania, livre iniciativa ou pluralismo político, nem descrevem como cada fundamento se aplica a decisões concretas.",
          },
        ],
        relatedConcepts: [
          {
            term: "Poderes da União",
            explanation: "Legislativo, Executivo e Judiciário, que o art. 2º da Constituição declara independentes e harmônicos entre si.",
          },
          {
            term: "Autonomia",
            explanation: "Condição que o art. 18 reconhece à União, aos estados, ao Distrito Federal e aos municípios, sempre nos termos da Constituição.",
          },
          {
            term: "Cidadania",
            explanation: "Um dos fundamentos da República listados no art. 1º; a próxima lição mostra como a Constituição organiza a participação e os direitos.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Depois de uma eleição, uma cidade passa a ter outro prefeito. O que mudou?",
            options: [
              { id: "a", text: "O Estado: o município deixou de existir e foi substituído por outro." },
              { id: "b", text: "O governo: mudou quem chefia o Executivo municipal." },
              { id: "c", text: "A Constituição: cada novo governo passa a seguir outro texto constitucional." },
            ],
            correctOptionId: "b",
            explanation:
              "Mudou o governo, isto é, quem exerce o poder por um período. O município continua sendo parte da organização político-administrativa prevista no art. 18, e uma eleição municipal não altera o texto da Constituição. Vale separar as duas ideias: o Estado permanece; os governos mudam.",
          },
          {
            id: "q2",
            prompt: "Segundo o art. 18 da Constituição, o que compõe a organização político-administrativa do Brasil?",
            options: [
              { id: "a", text: "A União, os estados, o Distrito Federal e os municípios, todos autônomos." },
              { id: "b", text: "Os três Poderes: Legislativo, Executivo e Judiciário." },
              { id: "c", text: "O presidente da República, os governadores e os prefeitos." },
            ],
            correctOptionId: "a",
            explanation:
              "O art. 18 lista a União, os estados, o Distrito Federal e os municípios, todos autônomos nos termos da Constituição. Os três Poderes aparecem em outro artigo, o 2º. Presidente, governadores e prefeitos chefiam o Executivo: fazem parte do governo, e não dessa lista.",
          },
          {
            id: "q3",
            prompt: "No sentido usado nesta lição, qual destas alternativas é um exemplo de política?",
            options: [
              { id: "a", text: "Moradores de um prédio decidem, em assembleia, uma regra que vale para todos." },
              { id: "b", text: "Uma pessoa escolhe sozinha o caminho que fará até o trabalho." },
              { id: "c", text: "A organização permanente formada pela União, pelos estados, pelo Distrito Federal e pelos municípios." },
            ],
            correctOptionId: "a",
            explanation:
              "Nesta lição, política é o modo como uma comunidade toma decisões coletivas, que valem para todos. A escolha de um caminho é uma decisão individual. A organização permanente descrita no art. 18 é o Estado, e não a política.",
          },
        ],
      },
      sources: [
        {
          key: "cf88-art1",
          supports:
            "Sustenta a “união indissolúvel” de estados, municípios e Distrito Federal, a definição do Brasil como Estado Democrático de Direito, a origem popular do poder e a lista dos cinco fundamentos da República.",
        },
        {
          key: "cf88-art2",
          supports: "Sustenta que Legislativo, Executivo e Judiciário são os Poderes da União, independentes e harmônicos entre si.",
        },
        {
          key: "cf88-art3",
          supports:
            "Sustenta a lista dos objetivos fundamentais da República e, pela nota de escopo, que esses objetivos orientam decisões sem indicar, por si só, as medidas que os alcançam.",
        },
        {
          key: "cf88-art18",
          supports:
            "Sustenta que a organização político-administrativa do Brasil compreende a União, os estados, o Distrito Federal e os municípios, todos autônomos nos termos da Constituição.",
        },
        {
          key: "senado-verifica-poder-executivo",
          supports:
            "Sustenta as funções do Poder Executivo federal (administrar o país, executar as leis e conduzir a política externa) e a organização do Executivo nas esferas federal, estadual e municipal, com presidente, governadores e prefeitos.",
        },
      ],
    },
    {
      slug: "democracia-cidadania-e-direitos",
      number: 2,
      title: "Democracia, cidadania e direitos",
      objective: "Entender a soberania popular, as formas de participação e a diferença entre direitos individuais e sociais.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "A Constituição de 1988 afirma que todo o poder emana, isto é, vem, do povo. Esta lição mostra como esse poder é exercido, quem deve votar e como a Constituição organiza direitos individuais e sociais.",
        blocks: [
          { type: "heading", text: "De onde vem o poder" },
          {
            type: "quote",
            text: "Parágrafo único. Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituição.",
            sourceKey: "cf88-art1",
            locator: "art. 1º, parágrafo único",
          },
          {
            type: "definition",
            term: "Soberania popular",
            text: "Princípio de que o poder vem do povo, como afirma o art. 1º. Pelo art. 14, ela é exercida pelo voto direto e secreto, com valor igual para todos, e, nos termos da lei, por plebiscito, referendo e iniciativa popular. Como o art. 1º chama o Brasil de Estado Democrático de Direito, esta lição entende democracia a partir dessa regra.",
            sources: ["cf88-art1", "cf88-art14"],
          },
          { type: "heading", text: "Representação e participação direta" },
          {
            type: "paragraph",
            text: "O art. 1º prevê duas formas de exercer o poder. Na representação, o povo elege pessoas que decidem em seu nome. Na participação direta, o próprio eleitorado, isto é, o conjunto das pessoas aptas a votar, decide ou propõe algo. A Lei nº 9.709/1998 define os três instrumentos dessa participação:",
            sources: ["cf88-art1", "cf88-art14", "lei-9709-1998"],
          },
          {
            type: "definition",
            term: "Plebiscito",
            text: "Consulta convocada antes de um ato legislativo ou administrativo, como uma lei ou uma decisão de governo. Pelo voto, o povo aprova ou rejeita o que lhe foi submetido.",
            sources: ["lei-9709-1998"],
          },
          {
            type: "definition",
            term: "Referendo",
            text: "Consulta convocada depois de um ato legislativo ou administrativo. O povo ratifica, isto é, confirma, ou rejeita o que já foi decidido.",
            sources: ["lei-9709-1998"],
          },
          {
            type: "definition",
            term: "Iniciativa popular",
            text: "Apresentação à Câmara dos Deputados de um projeto de lei, isto é, uma proposta de nova lei, assinado por pelo menos 1% do eleitorado nacional, distribuído por no mínimo cinco estados, com pelo menos 0,3% dos eleitores de cada um deles.",
            sources: ["lei-9709-1998"],
          },
          {
            type: "example",
            title: "Plebiscito ou referendo: a ordem dos passos",
            text: "Imagine uma proposta de mudar uma regra nacional. Num plebiscito, a consulta vem primeiro: o eleitorado aprova ou rejeita a proposta, e o ato legislativo ou administrativo, se houver, vem depois. Num referendo, a ordem se inverte: primeiro a lei ou a decisão é aprovada; depois, o eleitorado vota para confirmá-la ou rejeitá-la. O que separa os dois instrumentos é o momento da consulta.",
            sources: ["lei-9709-1998"],
          },
          { type: "heading", text: "Quem vota" },
          {
            type: "paragraph",
            text: "O art. 14, § 1º, trata do alistamento eleitoral, o registro da pessoa como eleitora, e do voto. Os dois são obrigatórios para os maiores de 18 anos. São facultativos, isto é, opcionais, para os analfabetos, para os maiores de 70 anos e para os maiores de 16 e menores de 18 anos.",
            sources: ["cf88-art14"],
          },
          { type: "heading", text: "Direitos individuais e sociais" },
          {
            type: "paragraph",
            text: "A cidadania é um dos fundamentos da República (art. 1º). Nesta lição, ela é tratada pelo que a Constituição prevê: participar das decisões e ter direitos reconhecidos. Muitos desses direitos estão nos arts. 5º e 6º.",
            sources: ["cf88-art1", "cf88-art5", "cf88-art6"],
          },
          {
            type: "comparison",
            title: "Direitos individuais e direitos sociais",
            intro:
              "Os direitos individuais se referem a cada pessoa; os sociais, a áreas como educação, saúde e trabalho. Os dois quadros seguem o mesmo roteiro.",
            orderNote: "Ordem dos artigos na Constituição: art. 5º, depois art. 6º.",
            items: [
              {
                label: "Direitos individuais",
                heading: "Art. 5º: igualdade perante a lei e liberdades",
                text: "O que diz: todos são iguais perante a lei, com direito à vida, à liberdade, à igualdade, à segurança e à propriedade. Vários itens do artigo tratam de liberdades, como manifestar o pensamento, ter consciência e crença livres e reunir-se pacificamente, sem armas. Condições no texto: o anonimato é proibido, e a reunião exige aviso prévio à autoridade. Limite do trecho: os itens citados não esgotam o artigo, que tem dezenas deles.",
                sources: ["cf88-art5"],
              },
              {
                label: "Direitos sociais",
                heading: "Art. 6º: educação, saúde, trabalho e outras áreas",
                text: "O que diz: são direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a proteção à maternidade e à infância e a assistência aos desamparados, entre outros. Eles aparecem como uma lista, em um único artigo. Condições no texto: valem “na forma desta Constituição”. Limite do trecho: o artigo não define como cada direito deve ser financiado ou prestado.",
                sources: ["cf88-art6"],
              },
            ],
          },
          { type: "heading", text: "O que nem uma emenda pode abolir" },
          {
            type: "definition",
            term: "Cláusulas pétreas",
            text: "Limites a emendas, que são mudanças no texto da Constituição. Pelo art. 60, § 4º, não pode nem ser votada a proposta de emenda que tenda a abolir: a forma federativa de Estado, ou seja, a união de estados, municípios e Distrito Federal citada no art. 1º; o voto direto, secreto, universal e periódico; a separação dos Poderes, vistos na lição anterior; e os direitos e garantias individuais.",
            sources: ["cf88-art60", "cf88-art1"],
          },
          {
            type: "limit",
            title: "Limites desta lição",
            text: "Os trechos usados não dizem quem convoca plebiscitos e referendos nem como o resultado é aplicado, e não definem cidadania. O art. 60, § 4º, menciona expressamente os direitos e garantias individuais; esta lição não trata de como esse limite é interpretado em relação a outros direitos.",
          },
        ],
        relatedConcepts: [
          {
            term: "Eleitorado",
            explanation: "Conjunto das pessoas aptas a votar; é a base de cálculo das assinaturas exigidas na iniciativa popular.",
          },
          {
            term: "Emenda constitucional",
            explanation: "Mudança no texto da Constituição; o art. 60, § 4º, impede a votação de propostas que tendam a abolir as cláusulas pétreas.",
          },
          {
            term: "Estado Democrático de Direito",
            explanation: "Expressão com que o art. 1º define a República; o mesmo artigo afirma que todo o poder emana do povo.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Uma lei já foi aprovada e, depois, o eleitorado é chamado a votar para confirmá-la ou rejeitá-la. Que instrumento é esse?",
            options: [
              { id: "a", text: "Plebiscito" },
              { id: "b", text: "Referendo" },
              { id: "c", text: "Iniciativa popular" },
            ],
            correctOptionId: "b",
            explanation:
              "Pela Lei nº 9.709/1998, o referendo é convocado depois do ato legislativo ou administrativo, para que o povo o ratifique ou rejeite. O plebiscito é convocado antes do ato. A iniciativa popular é outro instrumento: a apresentação de um projeto de lei à Câmara dos Deputados, com assinaturas de eleitores.",
          },
          {
            id: "q2",
            prompt: "Pelo art. 14, § 1º, da Constituição, para quem o voto é facultativo?",
            options: [
              { id: "a", text: "Para todos os maiores de 18 anos." },
              { id: "b", text: "Para os analfabetos, os maiores de 70 anos e os maiores de 16 e menores de 18 anos." },
              { id: "c", text: "Para ninguém: o voto é obrigatório em todos os casos." },
            ],
            correctOptionId: "b",
            explanation:
              "O § 1º torna o alistamento e o voto obrigatórios para os maiores de 18 anos e facultativos para três grupos: analfabetos, maiores de 70 anos e maiores de 16 e menores de 18 anos. A regra geral é a obrigatoriedade, e as exceções estão listadas no próprio texto.",
          },
          {
            id: "q3",
            prompt: "Qual destes direitos aparece no art. 6º da Constituição, entre os direitos sociais?",
            options: [
              { id: "a", text: "A liberdade de consciência e de crença." },
              { id: "b", text: "A moradia." },
              { id: "c", text: "O direito de reunir-se pacificamente, sem armas." },
            ],
            correctOptionId: "b",
            explanation:
              "A moradia está na lista de direitos sociais do art. 6º, ao lado de educação, saúde, trabalho e outros. A liberdade de consciência e de crença e o direito de reunião também estão na Constituição, mas no art. 5º, entre os direitos e garantias individuais.",
          },
        ],
      },
      sources: [
        {
          key: "cf88-art1",
          supports:
            "Sustenta que todo o poder emana do povo e é exercido por representantes eleitos ou diretamente, a cidadania como fundamento da República e a união de estados, municípios e Distrito Federal usada para explicar a forma federativa.",
        },
        {
          key: "cf88-art14",
          supports:
            "Sustenta que a soberania popular é exercida pelo voto direto, secreto e de valor igual e por plebiscito, referendo e iniciativa popular, além das regras de voto obrigatório e facultativo do § 1º.",
        },
        {
          key: "cf88-art5",
          supports:
            "Sustenta a igualdade perante a lei, os direitos à vida, à liberdade, à igualdade, à segurança e à propriedade e os incisos citados sobre manifestação do pensamento, consciência e crença e reunião.",
        },
        {
          key: "cf88-art6",
          supports:
            "Sustenta a lista de direitos sociais e a ressalva “na forma desta Constituição”; pela nota de escopo, o artigo não define como cada direito é financiado ou prestado.",
        },
        {
          key: "cf88-art60",
          supports: "Sustenta os limites a emendas constitucionais (cláusulas pétreas) listados no § 4º.",
        },
        {
          key: "lei-9709-1998",
          supports:
            "Sustenta as definições de plebiscito (antes do ato), referendo (depois do ato) e iniciativa popular, incluindo o número mínimo e a distribuição das assinaturas.",
        },
      ],
    },
  ],
};
