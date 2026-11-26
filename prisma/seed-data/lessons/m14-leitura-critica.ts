import { licaoCorrelacaoCausalidade } from "./m14-l2-correlacao-causalidade";
import type { SeedModule } from "./types";

export const moduloLeituraCritica: SeedModule = {
  slug: "leitura-critica",
  number: 14,
  title: "Leitura crítica",
  summary: "Evidência, opinião, desinformação, leitura de dados e a diferença entre correlação e causalidade.",
  area: "LEITURA_CRITICA",
  stage: "CONTEXT",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "fato-opiniao-e-desinformacao",
      number: 1,
      title: "Fato, opinião e desinformação",
      objective: "Distinguir fatos verificáveis, opiniões e interpretações e aplicar passos simples de checagem.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "Uma mesma notícia pode misturar fatos, declarações e opiniões. Esta lição apresenta critérios para separá-los, a definição de desinformação adotada pelo Supremo Tribunal Federal (STF) e passos simples de checagem.",
        blocks: [
          { type: "heading", text: "Quatro tipos de afirmação" },
          {
            type: "paragraph",
            text: "A Polis organiza seus textos com quatro tipos de afirmação. Eles são um critério de trabalho da própria plataforma, e não uma definição oficial.",
            sources: [],
          },
          {
            type: "comparison",
            title: "Critério usado pela Polis: quatro tipos de afirmação",
            orderNote: "Ordem do critério da Polis: do que se confere em registros ao que trata do futuro.",
            items: [
              {
                label: "1",
                heading: "Fato verificável",
                text: "O que é: algo que pode ser conferido em um registro, como uma lei publicada ou a ata de uma reunião. Como conferir: localizar o registro e ler o trecho. O que não prova: sozinho, não diz se uma decisão foi boa ou ruim.",
                sources: [],
              },
              {
                label: "2",
                heading: "Declaração",
                text: "O que é: aquilo que uma pessoa ou instituição disse, com autoria, data e lugar. Como conferir: achar a gravação, a nota ou a publicação original. O que não prova: mostra que a fala aconteceu, não que o conteúdo dela seja verdadeiro.",
                sources: [],
              },
              {
                label: "3",
                heading: "Opinião ou interpretação",
                text: "O que é: uma avaliação que depende de valores ou de um raciocínio. Como conferir: identificar quem avalia, com quais argumentos e a partir de quais dados. O que não prova: concordar ou discordar de uma opinião não a transforma em fato.",
                sources: [],
              },
              {
                label: "4",
                heading: "Projeção",
                text: "O que é: uma afirmação sobre o futuro, como uma previsão ou estimativa. Como conferir: ver quem projeta e com quais dados e hipóteses. O que não prova: não é um resultado; só poderá ser comparada com o que acontecer depois.",
                sources: [],
              },
            ],
          },
          {
            type: "example",
            title: "Exemplo: a mesma notícia escrita de quatro jeitos",
            text: "Situação fictícia: uma cidade ampliou o horário da biblioteca municipal. Fato: “O diário oficial do município publicou, em 3 de março, o novo horário da biblioteca, que passa a fechar às 21h.” Pode ser conferido no diário oficial, onde a prefeitura publica seus atos. Declaração: “A secretária de Cultura afirmou que a biblioteca é a mais visitada da região.” Prova que ela disse isso; confirmar exige dados de visitação. Opinião: “A ampliação foi a melhor decisão do ano para a cultura da cidade.” Depende de valores. Projeção: “O número de leitores deve dobrar no próximo ano.” Só dados futuros poderão confirmar.",
            sources: [],
          },
          { type: "heading", text: "Desinformação, segundo o STF" },
          {
            type: "quote",
            text: "Desinformação é toda declaração pública nociva baseada em dados falsos, alterados ou imprecisos",
            sourceKey: "stf-programa-combate-desinformacao",
            locator: "Você sabe o que é desinformação?",
          },
          {
            type: "paragraph",
            text: "Nociva quer dizer que causa dano. Segundo o STF, essas declarações são usadas para atacar grupos vulneráveis, contaminar o debate público e minar a democracia. Pelo critério da Polis, uma declaração prova que algo foi dito, não que seja verdade. O Programa de Combate à Desinformação do STF foi criado pela Resolução STF nº 742, de 27 de agosto de 2021, um ato do próprio tribunal. Ele tem três eixos: compreender a desinformação, reduzir o impacto das notícias falsas (fake news) e restabelecer a confiança das pessoas. Sua página oferece um glossário e uma seção chamada Desinfoteca.",
            sources: ["stf-programa-combate-desinformacao"],
          },
          { type: "heading", text: "Passos simples de checagem" },
          {
            type: "paragraph",
            text: "Na página Comprove, a Câmara dos Deputados reúne dicas de checagem. Uma delas trata da fonte, isto é, de quem produziu a informação:",
            sources: ["camara-comprove-dicas-de-checagem"],
          },
          {
            type: "quote",
            text: "Procure identificar a fonte da informação e pesquise sobre ela. É confiável? Tem conhecimento ou experiência para falar sobre o assunto da mensagem?",
            sourceKey: "camara-comprove-dicas-de-checagem",
            locator: "Dica sobre a fonte",
          },
          {
            type: "paragraph",
            text: "Outras dicas: ver se outros veículos, como jornais e sites de notícias, publicaram a mesma informação; desconfiar de mensagens alarmistas, de conteúdos “exclusivos” e de textos com muitos adjetivos; procurar sinais de edição em imagens, vídeos e áudios; ler a notícia até o fim; e não encaminhar mensagens de autenticidade duvidosa, mesmo concordando com o conteúdo.",
            sources: ["camara-comprove-dicas-de-checagem"],
          },
          { type: "heading", text: "Gráficos e educação midiática" },
          {
            type: "paragraph",
            text: "Uma atividade do IBGE Educa para professores cita a habilidade EF09MA21 da Base Nacional Comum Curricular (BNCC), documento que define aprendizagens da educação básica. Ela trata de identificar, em gráficos divulgados pela mídia, elementos que podem induzir a erros de leitura, às vezes de propósito, como escalas inapropriadas e legendas mal explicadas. A escala é a régua do gráfico: se o eixo de um gráfico de barras começa num valor alto, e não no zero, uma diferença pequena pode parecer grande.",
            sources: ["ibge-educa-graficos-e-tabelas"],
          },
          {
            type: "paragraph",
            text: "Segundo a Secretaria de Comunicação Social da Presidência da República (Secom), a Estratégia Brasileira de Educação Midiática é uma política pública federal, isto é, um programa de ação do governo. Ela busca desenvolver habilidades críticas, éticas e cidadãs para compreender, analisar e fazer circular conteúdos. Educação midiática é o desenvolvimento dessas habilidades.",
            sources: ["secom-educacao-midiatica"],
          },
          {
            type: "limit",
            title: "Sobre o critério da Polis",
            text: "A Polis não encontrou, nas fontes oficiais consultadas, um texto didático que defina fato e opinião. Por isso, usa os quatro critérios desta lição, que fazem parte de sua política editorial, e os apresenta de forma transparente. Outros materiais podem usar nomes ou divisões diferentes.",
          },
        ],
        relatedConcepts: [
          { term: "Desinformação", explanation: "Para o STF, declaração pública nociva baseada em dados falsos, alterados ou imprecisos." },
          { term: "Checagem", explanation: "Conferência de uma informação na fonte e em outros registros antes de aceitá-la ou compartilhá-la." },
          {
            term: "Educação midiática",
            explanation: "Desenvolvimento de habilidades críticas, éticas e cidadãs para compreender, analisar e fazer circular conteúdos.",
          },
          {
            term: "Escala de um gráfico",
            explanation: "Régua que define como os valores aparecem no gráfico; quando é inapropriada, pode induzir a erros de leitura.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Pelo critério usado pela Polis, o que a frase “O diretor da escola afirmou que a reforma do prédio terminou” comprova?",
            options: [
              { id: "a", text: "Que a reforma do prédio terminou" },
              { id: "b", text: "Que o diretor fez essa afirmação" },
              { id: "c", text: "Que a reforma foi bem feita" },
            ],
            correctOptionId: "b",
            explanation:
              "Uma declaração atribuída comprova que a pessoa disse aquilo, não que o conteúdo seja verdadeiro. Para saber se a reforma terminou, é preciso conferir um registro, como um documento de entrega da obra. Dizer que ela foi bem feita já seria uma opinião.",
          },
          {
            id: "q2",
            prompt: "Qual destas frases é uma opinião ou interpretação, pelo critério usado pela Polis?",
            options: [
              { id: "a", text: "“O horário publicado no diário oficial vai até as 21h.”" },
              { id: "b", text: "“A nova praça é o lugar mais agradável da cidade.”" },
              { id: "c", text: "“A secretária disse que a praça recebeu mil visitantes.”" },
              { id: "d", text: "“O número de visitantes deve crescer no próximo ano.”" },
            ],
            correctOptionId: "b",
            explanation:
              "“Mais agradável” é uma avaliação que depende de valores e gostos; nenhum registro pode confirmá-la. A frase (a) pode ser conferida no diário oficial, a (c) é uma declaração atribuída e a (d) é uma projeção sobre o futuro.",
          },
          {
            id: "q3",
            prompt: "Qual destas atitudes está entre as dicas de checagem da Câmara (Comprove)?",
            options: [
              { id: "a", text: "Ver se outros veículos publicaram a mesma informação" },
              { id: "b", text: "Confiar mais em mensagens apresentadas como exclusivas" },
              { id: "c", text: "Ler só o título, para ganhar tempo" },
              { id: "d", text: "Encaminhar a mensagem quando se concorda com ela, mesmo sem saber se é autêntica" },
            ],
            correctOptionId: "a",
            explanation:
              "As dicas incluem verificar se outros veículos publicaram a informação. Elas também orientam a desconfiar de mensagens “exclusivas”, a ler a notícia até o fim e a não encaminhar mensagens de autenticidade duvidosa, mesmo quando se concorda com o conteúdo.",
          },
        ],
      },
      sources: [
        {
          key: "stf-programa-combate-desinformacao",
          supports:
            "Definição de desinformação adotada pelo STF (declaração pública nociva baseada em dados falsos, alterados ou imprecisos, usada para atacar grupos vulneráveis, contaminar o debate público e minar a democracia); criação do programa pela Resolução STF nº 742, de 27/8/2021; seus três eixos; glossário e Desinfoteca.",
        },
        {
          key: "camara-comprove-dicas-de-checagem",
          supports:
            "Dicas de checagem: identificar e pesquisar a fonte; ver se outros veículos publicaram; desconfiar de mensagens alarmistas, “exclusivas” ou com muitos adjetivos; procurar sinais de edição em imagens, vídeos e áudios; ler até o fim; não encaminhar mensagens de autenticidade duvidosa, mesmo concordando com elas.",
        },
        {
          key: "secom-educacao-midiatica",
          supports:
            "Estratégia Brasileira de Educação Midiática como política pública federal coordenada pela Secom, voltada a habilidades críticas, éticas e cidadãs para compreender, analisar e fazer circular conteúdos.",
        },
        {
          key: "ibge-educa-graficos-e-tabelas",
          supports:
            "Habilidade EF09MA21 da BNCC: identificar, em gráficos divulgados pela mídia, elementos que podem induzir a erros de leitura, como escalas inapropriadas e legendas não explicitadas corretamente.",
        },
      ],
    },
    licaoCorrelacaoCausalidade,
  ],
};
