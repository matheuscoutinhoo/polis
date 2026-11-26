import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloConservadorismos: SeedModule = {
  slug: "conservadorismos",
  number: 6,
  title: "Conservadorismos",
  summary:
    "Os conservadorismos segundo as fontes do acervo: a continuidade entre passado e futuro, a tradição clássica associada a Burke, o conservadorismo brasileiro do século XIX e a relação com o liberalismo.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "tradicao-e-continuidade",
      number: 1,
      title: "Conservadorismos: tradição, instituições e mudança gradual",
      objective:
        "Identificar as ideias centrais atribuídas ao conservadorismo nas fontes do acervo: a continuidade entre passado e futuro e a manutenção de instituições e tradições.",
      minutes: 5,
      currentKeys: ["conservadorismos"],
      reviewedOn: REVISED_ON,
      previous: { module: "liberalismos-e-conservadorismos", lesson: "conservadorismos" },
      content: {
        intro:
          "Esta lição apresenta as ideias centrais do conservadorismo tal como aparecem em uma obra sobre o Império e em um artigo acadêmico do acervo da Polis. O plural do título, conservadorismos, indica que as fontes registram variações dentro da própria corrente, tema da próxima lição. A lição descreve essas ideias; não avalia se são certas ou erradas.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Conservadorismo",
            text: "Posição política que, na definição adotada por João Camilo de Oliveira Torres, reconhece que a existência das comunidades está sujeita a certas condições e que as mudanças sociais justas não devem romper a continuidade entre o passado e o futuro. A definição consta da descrição de sua obra sobre o Partido Conservador no Império, republicada pela Câmara dos Deputados.",
            sources: ["camara-bd-torres-construtores-imperio"],
          },
          {
            type: "paragraph",
            text: "Em artigo publicado no portal de periódicos da Universidade Federal de Minas Gerais (UFMG), Defina (2023) aponta Edmund Burke como fundador das bases do pensamento conservador clássico. Segundo o autor, essas bases estão na manutenção de determinadas instituições e tradições do passado. As duas fontes destacam, assim, as comunidades e aquilo que elas trazem do passado. São fontes de tipos diferentes: a primeira é a descrição de uma obra republicada por uma instituição pública; a segunda, o resumo de um artigo de revista universitária, escrito por um autor em formação de graduação.",
            sources: ["ufmg-temporalidades-pensamento-conservador", "camara-bd-torres-construtores-imperio"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "quote",
            text: "as mudanças sociais, para serem justas e válidas, não podem quebrar a continuidade entre o passado e o futuro",
            sourceKey: "camara-bd-torres-construtores-imperio",
            locator: "Descrição",
          },
          {
            type: "paragraph",
            text: "A frase não rejeita toda mudança: estabelece uma condição para que ela seja justa e válida. O centro da ideia é a continuidade, a ligação entre o que uma comunidade foi e o que será; o título da lição resume essa condição como mudança gradual. A leitura de Defina (2023) sobre Burke acrescenta a manutenção de determinadas instituições e tradições. Instituições, aqui, são formas estáveis de organizar a vida em comum, como as leis e os órgãos públicos; as fontes não listam quais seriam as instituições a manter.",
            sources: ["camara-bd-torres-construtores-imperio", "ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "example",
            title: "Situação hipotética: a reforma do mercado municipal de Serra Clara",
            text: "Na cidade fictícia de Serra Clara, o prédio centenário do mercado municipal precisa de reforma. Uma proposta demole o prédio e constrói outro, com novo uso; outra reforma por etapas e mantém as bancas e a feira de sábado. Com a definição adotada por Torres, a pergunta é: a mudança mantém ou quebra a continuidade entre o passado e o futuro da cidade? Com a leitura de Defina (2023) sobre Burke, surge outra: quais instituições e tradições locais estão em jogo? Nenhuma das perguntas rejeita a reforma. O exemplo mostra como o conceito organiza a pergunta; não indica qual proposta é a certa.",
            sources: ["camara-bd-torres-construtores-imperio", "ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "Para as ideias centrais do conservadorismo, o acervo reúne a descrição de uma obra e o resumo de um artigo. Não há trechos de Burke nem de autores conservadores brasileiros, e o acervo não traz uma definição única da corrente: a de Torres e a leitura de Defina sobre Burke são interpretações dos autores. O acervo também não reúne críticas ao conservadorismo feitas por autores de outras correntes; por isso, a lição não as resume.",
          },
        ],
        relatedConcepts: [
          {
            term: "Conservadorismo clássico",
            explanation: "Pensamento cujas bases, segundo Defina (2023), Edmund Burke fundou na manutenção de determinadas instituições e tradições do passado.",
          },
          {
            term: "Continuidade",
            explanation: "Na definição adotada por Torres, a ligação entre o passado e o futuro que as mudanças sociais não podem quebrar para serem justas e válidas.",
          },
          {
            term: "Instituições",
            explanation: "Formas estáveis de organizar a vida em comum, como as leis e os órgãos públicos; as fontes da lição não listam quais seriam as instituições a manter.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Na definição adotada por Torres, que condição as mudanças sociais precisam cumprir para serem justas e válidas?",
            options: [
              { id: "a", text: "Não quebrar a continuidade entre o passado e o futuro." },
              { id: "b", text: "Romper com todas as instituições anteriores." },
              { id: "c", text: "Nenhuma, porque toda mudança social é rejeitada." },
            ],
            correctOptionId: "a",
            explanation:
              "A definição estabelece uma condição: para serem justas e válidas, as mudanças não podem quebrar a continuidade entre o passado e o futuro. Ela não rejeita toda mudança, como sugere a alternativa c. Romper com todas as instituições anteriores, como na alternativa b, seria justamente quebrar essa continuidade.",
          },
          {
            id: "q2",
            prompt: "Segundo Defina (2023), em que Edmund Burke fundou as bases do pensamento conservador clássico?",
            options: [
              { id: "a", text: "Na manutenção de determinadas instituições e tradições do passado." },
              { id: "b", text: "Na ruptura com todas as tradições." },
              { id: "c", text: "No controle estatal de todo o processo produtivo." },
            ],
            correctOptionId: "a",
            explanation:
              "Para Defina, Burke fundou o conservadorismo clássico na manutenção de determinadas instituições e tradições pretéritas, isto é, do passado. A alternativa b inverte essa ideia, e a c descreve o Estado socialista, tema do módulo Socialismos. Trata-se de uma interpretação do autor do artigo.",
          },
          {
            id: "q3",
            prompt: "No exemplo do mercado municipal, o que a definição adotada por Torres permite fazer?",
            options: [
              { id: "a", text: "Decidir que o prédio nunca pode ser reformado." },
              { id: "b", text: "Formular a pergunta sobre a continuidade entre o passado e o futuro da cidade, sem rejeitar a reforma." },
              { id: "c", text: "Concluir que a demolição é sempre a melhor opção." },
            ],
            correctOptionId: "b",
            explanation:
              "A definição ajuda a perguntar se a mudança mantém ou quebra a continuidade, mas não rejeita a reforma nem escolhe uma proposta. As alternativas a e c tiram do conceito uma decisão que ele não oferece.",
          },
        ],
      },
      sources: [
        {
          key: "camara-bd-torres-construtores-imperio",
          supports:
            "Sustenta a definição de conservadorismo adotada por Torres (a existência das comunidades está sujeita a certas condições; mudanças justas e válidas não quebram a continuidade entre passado e futuro), a citação da descrição e o tema da obra republicada pela Câmara.",
        },
        {
          key: "ufmg-temporalidades-pensamento-conservador",
          supports:
            "Sustenta a interpretação de Defina (2023) de que Burke fundou as bases do pensamento conservador clássico na manutenção de instituições e tradições do passado e, pela nota de escopo, que se trata de artigo de periódico universitário escrito por autor em formação de graduação.",
        },
      ],
    },
    {
      slug: "conservadorismo-no-brasil-e-debates",
      number: 2,
      title: "Conservadorismos: o caso brasileiro e a relação com o liberalismo",
      objective:
        "Comparar as leituras do acervo sobre o conservadorismo brasileiro do século XIX e sobre a relação entre conservadorismo e liberalismo, distinguindo interpretações de autores e contextos.",
      minutes: 6,
      currentKeys: ["conservadorismos"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "Esta lição trata das variações e dos debates que o acervo registra sobre o conservadorismo: a tese de que o conservadorismo brasileiro inicial teve especificidades em relação ao europeu, o estudo do Partido Conservador no Império e a relação entre conservadorismo e liberalismo. As fontes são uma obra republicada pela Câmara dos Deputados, um artigo acadêmico e um livro didático. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "O conservadorismo brasileiro inicial" },
          {
            type: "paragraph",
            text: "Defina (2023) sustenta que o pensamento conservador no Brasil tem especificidades em relação ao conservadorismo clássico europeu. Na lição anterior, viu-se que, para o autor, Burke fundou o conservadorismo clássico na manutenção de instituições e tradições do passado. Sobre o Brasil, o resumo do artigo afirma:",
            sources: ["ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "quote",
            text: "o incipiente pensamento conservador brasileiro – que teve como seus principais expoentes, por exemplo, José da Silva Lisboa (1756-1835) – se baseou essencialmente na negação do passado colonial pautado na tentativa de conciliação entre o advento do liberalismo econômico internacional e a manutenção interna do sistema escravocrata",
            sourceKey: "ufmg-temporalidades-pensamento-conservador",
            locator: "Resumo",
          },
          {
            type: "paragraph",
            text: "Incipiente quer dizer inicial. Na leitura do autor, esse conservadorismo negava o passado colonial e tentava conciliar o liberalismo econômico, isto é, ideias liberais sobre a economia, com a manutenção da escravidão, como forma de prevenir uma possível revolução. O resumo não diz que revolução seria essa. Há um contraste com a leitura sobre Burke: em vez de manter o passado, o conservadorismo brasileiro inicial se basearia na negação do passado colonial. É a tese do autor; o acervo não traz os textos de José da Silva Lisboa.",
            sources: ["ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "paragraph",
            text: "Já a obra de João Camilo de Oliveira Torres, republicada pela Câmara dos Deputados, estuda os ideais e as lutas do Partido Conservador brasileiro no Império (1822–1889). A definição de conservadorismo adotada por Torres, vista na lição anterior, consta da descrição dessa obra.",
            sources: ["camara-bd-torres-construtores-imperio"],
          },
          { type: "heading", text: "Conservadorismo e liberalismo" },
          {
            type: "paragraph",
            text: "As fontes registram leituras diferentes sobre a relação entre as duas correntes. Coelho e Salles (2015) sustentam que, ao longo do século XIX, o liberalismo “se impôs completamente ao pensamento conservador, varrendo-o do cenário político” e reorganizando as sociedades europeias conforme os seus princípios. Para Defina (2023), como visto acima, o conservadorismo brasileiro inicial se combinou com o liberalismo econômico. São interpretações dos autores sobre lugares diferentes: a Europa e o Brasil.",
            sources: ["pnap-ciencia-politica", "ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "comparison",
            title: "Liberalismos e conservadorismos: ponto de partida",
            intro:
              "Os dois quadros seguem o mesmo roteiro: de onde a corrente parte, o que procura proteger, que variação as fontes registram e qual é o limite da descrição.",
            orderNote: "Mesma ordem dos módulos da trilha.",
            items: [
              {
                label: "Liberalismos",
                heading: "Ponto de partida: o indivíduo",
                text: "De onde parte: segundo Coelho e Salles (2015), do jusnaturalismo, que tem o indivíduo por ponto de partida. O que procura proteger: a liberdade e a propriedade individuais; ao Estado cabe garantir segurança, liberdade e propriedade. Variação registrada: para Coelho (2014), o Estado de bem-estar social levou o pensamento liberal a rever seus modelos de referência. Limite: os livros didáticos citados trazem interpretações dos autores.",
                sources: ["pnap-ciencia-politica", "pnap-estado-governo-mercado"],
              },
              {
                label: "Conservadorismos",
                heading: "Ponto de partida: a continuidade das comunidades",
                text: "De onde parte: na definição adotada por Torres, das condições a que está sujeita a existência das comunidades. O que procura proteger: a continuidade entre o passado e o futuro; para Defina (2023), Burke fundou o conservadorismo clássico na manutenção de instituições e tradições. Variação registrada: Defina descreve um conservadorismo brasileiro inicial diferente do europeu. Limite: a obra e o artigo citados trazem interpretações dos autores.",
                sources: ["camara-bd-torres-construtores-imperio", "ufmg-temporalidades-pensamento-conservador"],
              },
            ],
          },
          {
            type: "example",
            title: "Situação hipotética: o trabalho escolar sobre o Império",
            text: "Uma estudante prepara um trabalho sobre o Partido Conservador no Império e encontra duas leituras no acervo: para Coelho e Salles (2015), o liberalismo varreu o pensamento conservador do cenário político europeu no século XIX; para Defina (2023), o conservadorismo brasileiro inicial se combinou com o liberalismo econômico. Ela se pergunta se uma leitura desmente a outra. Os conceitos da lição ajudam a organizar a resposta: as leituras tratam de lugares diferentes e são interpretações dos autores, apoiadas em fontes que o acervo não reproduz. Para ir além, ela precisaria consultar as obras citadas, como a de Torres. A situação não indica qual leitura é a correta.",
            sources: ["pnap-ciencia-politica", "ufmg-temporalidades-pensamento-conservador", "camara-bd-torres-construtores-imperio"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo traz o resumo do artigo de Defina e a descrição da obra de Torres, sem os textos completos. Não há trechos de autores conservadores brasileiros, como José da Silva Lisboa, nem descrição de outras vertentes ou de experiências de governo. Os livros de Coelho (2014) e de Coelho e Salles (2015) não tratam a corrente em seção própria, e o acervo não reúne críticas ao conservadorismo feitas por autores de outras correntes. A comparação usa um único critério e não esgota as diferenças entre as correntes.",
          },
        ],
        relatedConcepts: [
          {
            term: "Partido Conservador",
            explanation:
              "Partido brasileiro do período do Império (1822–1889) cujos ideais e lutas são tema da obra de João Camilo de Oliveira Torres republicada pela Câmara dos Deputados.",
          },
          {
            term: "Liberalismo econômico",
            explanation: "Ideias liberais sobre a economia; segundo Defina (2023), o conservadorismo brasileiro inicial tentou conciliá-lo com a manutenção do sistema escravocrata.",
          },
          {
            term: "Interpretação de autor",
            explanation: "Leitura própria de um autor sobre um tema; as fontes desta lição apresentam interpretações, que podem variar conforme o lugar e o período estudados.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo a tese de Defina (2023), o que diferenciou o conservadorismo brasileiro inicial do modelo europeu?",
            options: [
              { id: "a", text: "Ter conciliado o liberalismo econômico com a manutenção do sistema escravocrata, negando o passado colonial." },
              { id: "b", text: "Ter sido fundado por Edmund Burke." },
              { id: "c", text: "Não ter nenhuma relação com ideias liberais." },
            ],
            correctOptionId: "a",
            explanation:
              "Para Defina, o conservadorismo brasileiro inicial, de que José da Silva Lisboa é um exemplo, se baseou na negação do passado colonial e tentou conciliar o liberalismo econômico com a manutenção do sistema escravocrata; por isso a alternativa c não corresponde à tese. Burke é apontado pelo autor como fundador do conservadorismo clássico, o modelo europeu com o qual ele compara o caso brasileiro. Trata-se de uma interpretação do autor.",
          },
          {
            id: "q2",
            prompt: "Segundo Coelho e Salles (2015), o que aconteceu com o pensamento conservador na Europa ao longo do século XIX?",
            options: [
              { id: "a", text: "Tornou-se a única corrente das sociedades europeias." },
              { id: "b", text: "O liberalismo se impôs completamente a ele, varrendo-o do cenário político." },
              { id: "c", text: "Fundiu-se com o marxismo." },
            ],
            correctOptionId: "b",
            explanation:
              "Os autores sustentam que o liberalismo se impôs ao pensamento conservador e reorganizou as sociedades europeias conforme os seus princípios. É uma leitura sobre a Europa; para o Brasil, Defina (2023) descreve uma combinação entre conservadorismo e liberalismo econômico. As alternativas a e c não aparecem nas fontes.",
          },
          {
            id: "q3",
            prompt: "No quadro comparativo da lição, qual ponto de partida é atribuído a cada corrente?",
            options: [
              { id: "a", text: "Liberalismos: o indivíduo. Conservadorismos: as condições de existência e a continuidade das comunidades." },
              { id: "b", text: "Liberalismos: a continuidade das comunidades. Conservadorismos: o indivíduo." },
              { id: "c", text: "As duas correntes partem do controle estatal da produção." },
            ],
            correctOptionId: "a",
            explanation:
              "Segundo Coelho e Salles (2015), o liberalismo se funda no jusnaturalismo, que tem o indivíduo por ponto de partida. Na definição adotada por Torres, o conservadorismo parte das condições a que está sujeita a existência das comunidades e da continuidade entre passado e futuro. A alternativa b inverte os pontos de partida, e a c não corresponde a nenhuma das duas descrições.",
          },
        ],
      },
      sources: [
        {
          key: "ufmg-temporalidades-pensamento-conservador",
          supports:
            "Sustenta a interpretação de Defina (2023): especificidades do pensamento conservador brasileiro em relação ao clássico europeu; Burke e a manutenção de instituições e tradições; e a tese, citada literalmente, de que o conservadorismo brasileiro inicial, como o de José da Silva Lisboa, se baseou na negação do passado colonial e tentou conciliar liberalismo econômico e manutenção do sistema escravocrata, como forma de prevenção a uma possível revolução.",
        },
        {
          key: "camara-bd-torres-construtores-imperio",
          supports:
            "Sustenta o tema da obra republicada pela Câmara (ideais e lutas do Partido Conservador brasileiro no Império, 1822–1889) e, no quadro comparativo, a definição de conservadorismo adotada por Torres.",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta a leitura dos autores de que, ao longo do século XIX, o liberalismo se impôs ao pensamento conservador na Europa (p. 42) e, no quadro comparativo, que o liberalismo se funda no jusnaturalismo, com o indivíduo por ponto de partida, e atribui ao Estado garantir segurança, liberdade e propriedade (p. 53); pela nota de escopo, o conservadorismo aparece no livro só em menção histórica.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, no quadro comparativo, a revisão de paradigmas no pensamento liberal com o Estado de bem-estar social; pela nota de escopo, o livro não trata o conservadorismo em seção própria.",
        },
      ],
    },
  ],
};