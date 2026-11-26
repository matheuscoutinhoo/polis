import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloSocialismos: SeedModule = {
  slug: "socialismos",
  number: 8,
  title: "Socialismos",
  summary:
    "Os socialismos segundo as fontes do acervo: a proposta de superar a propriedade privada dos meios de produção, a fase de transição descrita por Marx e o Estado socialista do século XX.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "propriedade-classes-e-transicao",
      number: 1,
      title: "Socialismos: propriedade, classes e transição",
      objective:
        "Identificar o que as fontes do acervo dizem sobre a proposta socialista no pensamento de Marx, distinguindo socialismo de comunismo e o socialismo científico do utópico.",
      minutes: 6,
      currentKeys: ["socialismos"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "Esta lição apresenta a proposta socialista tal como aparece no acervo da Polis, sobretudo no livro didático de Ricardo Corrêa Coelho e Helena da Motta Salles (2015), que resume o pensamento de Karl Marx, e na ementa de um curso do Instituto Legislativo Brasileiro (ILB), do Senado. O plural do título, socialismos, indica que o nome reúne formulações diferentes; o acervo detalha sobretudo a de Marx. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Socialismo, no pensamento de Marx",
            text: "Segundo Coelho e Salles (2015), a fase de transição entre o capitalismo e o comunismo. Nela, a classe operária, depois de tomar o poder do Estado, acabaria com a propriedade privada dos meios de produção, isto é, da terra, das máquinas, dos equipamentos e das tecnologias usados para produzir.",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "paragraph",
            text: "O ponto de partida é diferente do liberal. Segundo os autores, “contrariamente ao liberalismo, que parte do indivíduo”, o marxismo “toma por ponto de partida o grupo social”: as classes sociais, definidas pelo lugar que cada grupo ocupa na produção. No capitalismo, na leitura de Marx apresentada no livro, as classes fundamentais seriam a burguesia, proprietária dos meios de produção, e o proletariado, que só teria a própria força de trabalho para vender em troca de salário.",
            sources: ["pnap-ciencia-politica"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "paragraph",
            text: "Coelho e Salles (2015) resumem as etapas que, para Marx, levariam do capitalismo ao socialismo e depois ao comunismo. A classe operária deveria se organizar em um partido político para tomar o poder. Depois, ao tomar o poder do Estado, o proletariado deveria, primeiro:",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "quote",
            text: "acabar com a propriedade privada dos meios de produção, que é a base material – a infraestrutura sobre a qual a burguesia exerce o seu poder sobre o proletariado",
            sourceKey: "pnap-ciencia-politica",
            locator: "p. 64",
          },
          {
            type: "paragraph",
            text: "Em seguida, deveria instituir a chamada ditadura do proletariado, pondo fim à ordem liberal. Os autores explicam que, com a palavra “ditadura”, Marx “não estava propondo uma forma de governo mais dura ou autoritária” que as de seu tempo: indicava “um governo de classe, e não um governo de todos”. Nessa fase, o proletariado usaria “toda a força do Estado para acabar com a sociedade de classes”.",
            sources: ["pnap-ciencia-politica"],
          },
          { type: "heading", text: "Socialismo não é sinônimo de comunismo" },
          {
            type: "paragraph",
            text: "Na sequência descrita pelos autores, o socialismo é a passagem e o comunismo, o ponto de chegada: quando as classes fossem abolidas, o próprio Estado deixaria de existir, porque teria perdido sua função. O comunismo, o Manifesto Comunista e os partidos comunistas do século XX são tema de outro módulo da Polis.",
            sources: ["pnap-ciencia-politica"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "Segundo Coelho e Salles (2015), Marx chamava sua proposta de socialismo científico, por considerá-la fundada no método do materialismo dialético, e a diferenciava do socialismo utópico, “proposto por outros filósofos do seu tempo”. O acervo não descreve esses outros socialismos. A ementa do curso do ILB sobre socialismo, isto é, o resumo do seu programa, também separa “A utopia Socialista”, a proposta, de “O Socialismo real”, as experiências históricas, tema da próxima lição.",
            sources: ["pnap-ciencia-politica", "ilb-doutrina-socialismo"],
          },
          {
            type: "example",
            title: "Situação hipotética: a tecelagem de Serra Clara",
            text: "Na cidade fictícia de Serra Clara, uma tecelagem pertence a uma família, e os trezentos trabalhadores recebem salário. Os conceitos desta lição ajudam a formular perguntas: quem é dono dos meios de produção, como o prédio e os teares? Quem decide o que produzir e como dividir o que a venda rende? Na leitura de Marx apresentada por Coelho e Salles (2015), a fábrica seria um exemplo da divisão entre quem possui os meios de produção e quem tem apenas a força de trabalho, e o socialismo proporia acabar com essa propriedade privada. A situação não indica se a proposta é desejável nem como ela funcionaria na prática; experiências reais são tema da próxima lição.",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo detalha o socialismo tal como resumido por Coelho e Salles (2015) a partir de Marx. Outros socialismos, como os chamados utópicos, são apenas mencionados, e o acervo não descreve socialismos que se apresentam como democráticos. Do curso do ILB, o acervo traz só a ementa. Termos como capital, mais-valia e materialismo dialético aparecem resumidos pelos autores, e a lição não os aprofunda.",
          },
        ],
        relatedConcepts: [
          {
            term: "Meios de produção",
            explanation: "Na leitura de Marx apresentada por Coelho e Salles (2015), recursos usados para produzir, como a terra, as máquinas, os equipamentos e as tecnologias.",
          },
          {
            term: "Ditadura do proletariado",
            explanation:
              "Segundo Coelho e Salles (2015), expressão com que Marx indicava um governo da classe operária, e não um governo mais duro ou autoritário que os de seu tempo.",
          },
          {
            term: "Socialismo científico e utópico",
            explanation: "Distinção feita por Marx, segundo Coelho e Salles (2015), entre a sua proposta, que considerava cientificamente fundada, e a de outros filósofos de seu tempo.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho e Salles (2015), qual é o lugar do socialismo no pensamento de Marx?",
            options: [
              { id: "a", text: "Uma fase de transição do capitalismo ao comunismo." },
              { id: "b", text: "A etapa final, na qual o Estado controla tudo de forma permanente." },
              { id: "c", text: "Outro nome para o Estado de bem-estar social." },
            ],
            correctOptionId: "a",
            explanation:
              "Para Marx, segundo os autores, o socialismo seria uma fase transitória, durante a qual o proletariado usaria a força do Estado para acabar com a sociedade de classes; no comunismo, o Estado deixaria de existir. Por isso, a alternativa b inverte a ideia. O Estado de bem-estar social é outro modelo, tratado no módulo Social-democracia.",
          },
          {
            id: "q2",
            prompt: "Como Coelho e Salles (2015) explicam o uso da palavra “ditadura” na expressão “ditadura do proletariado”?",
            options: [
              { id: "a", text: "Marx propunha um governo mais duro que as monarquias de seu tempo." },
              { id: "b", text: "A palavra indicava um governo de classe, e não um governo de todos." },
              { id: "c", text: "A palavra indicava uma sociedade sem nenhuma classe social." },
            ],
            correctOptionId: "b",
            explanation:
              "Os autores escrevem que Marx não estava propondo um governo mais duro ou autoritário, mas deixando claro que seria um governo de classe. A sociedade sem classes, da alternativa c, é o comunismo, posterior a essa fase. O módulo Comunismo mostra que, segundo Coelho (2014), a expressão ganhou um significado mais forte com Lênin.",
          },
          {
            id: "q3",
            prompt: "Segundo os autores, o que diferencia o socialismo científico do socialismo utópico?",
            options: [
              { id: "a", text: "Marx considerava sua proposta fundada em método científico e a diferenciava das propostas de outros filósofos de seu tempo." },
              { id: "b", text: "O socialismo utópico foi o modelo aplicado na União Soviética." },
              { id: "c", text: "Os dois nomes são sinônimos." },
            ],
            correctOptionId: "a",
            explanation:
              "Para Coelho e Salles (2015), Marx chamava seu socialismo de científico, por se apoiar no materialismo dialético, e o diferenciava do socialismo utópico de outros filósofos. Os nomes não são sinônimos, e o acervo não liga o socialismo utópico à União Soviética.",
          },
        ],
      },
      sources: [
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, como interpretação dos autores sobre Marx: o grupo social como ponto de partida do marxismo (p. 53); os meios de produção e as classes fundamentais do capitalismo (p. 55–58); a organização da classe operária em partido para tomar o poder (p. 63); as etapas rumo ao comunismo, com o fim da propriedade privada dos meios de produção, citado literalmente, e a ditadura do proletariado (p. 64); o sentido da palavra ditadura em Marx (p. 64); a fase transitória (p. 65); o fim do Estado no comunismo e a distinção entre socialismo científico e utópico (p. 66).",
        },
        {
          key: "ilb-doutrina-socialismo",
          supports:
            "Sustenta que o ILB, do Senado, oferece curso sobre socialismo na série Doutrina Política e que a ementa distingue a utopia socialista do socialismo real; o conteúdo completo exige cadastro gratuito.",
        },
      ],
    },
    {
      slug: "estado-socialista-no-seculo-xx",
      number: 2,
      title: "O Estado socialista no século XX: planejamento, resultados e crise",
      objective:
        "Identificar as características que o acervo atribui ao Estado socialista do século XX, os resultados registrados e as reformas e crises que o autor descreve, separando a descrição do autor das lacunas do acervo.",
      minutes: 7,
      currentKeys: ["socialismos"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "A ementa do curso do ILB sobre socialismo chama de socialismo real as experiências históricas. Esta lição apresenta como o livro didático de Ricardo Corrêa Coelho (2014) descreve o Estado socialista do século XX: suas características, o planejamento central, os resultados que o autor registra e as reformas que antecederam o fim da União Soviética. São interpretações do autor; a lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "Como surgiu" },
          {
            type: "paragraph",
            text: "Segundo Coelho (2014), o primeiro Estado socialista surgiu na Rússia, depois da revolução de outubro de 1917, inspirada na doutrina marxista-leninista. Para o autor, ele ocupava o extremo oposto do Estado liberal: neste, o mercado teria o maior papel na regulação da vida social; naquele, o Estado. Coelho e Salles (2015) acrescentam que Marx esperava o socialismo nas sociedades capitalistas industrializadas, e não em países como Rússia, China e Cuba, onde regimes socialistas de fato surgiram.",
            sources: ["pnap-estado-governo-mercado", "pnap-ciencia-politica"],
          },
          { type: "heading", text: "Características descritas pelo autor" },
          {
            type: "quote",
            text: "A primeira característica fundamental do Estado socialista é o controle estatal de todo o processo produtivo.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 81",
          },
          {
            type: "paragraph",
            text: "Coelho explica que a propriedade podia ser estatal, como a de fábricas e bancos, ou coletiva, como a de algumas terras, a exemplo dos kolkhozes soviéticos; em qualquer caso, a produção e a distribuição ficavam sob rígido controle do Estado, e o mercado praticamente desaparecia. O Estado socialista dizia representar a maioria trabalhadora por meio do Partido Comunista, “único legítimo representante” de seus interesses. Segundo o autor, toda discordância em relação ao partido era considerada desvio e traição e, como tal, punida; Hannah Arendt e Raymond Aron formularam o conceito de totalitarismo para definir esse regime.",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Planejamento e resultados" },
          {
            type: "paragraph",
            text: "Com os recursos reunidos sob o controle do Estado e do Partido Comunista, a União Soviética adotou os planos quinquenais, que Coelho considera “a primeira e provavelmente mais bem-sucedida experiência de planejamento central de Estado”. Em cerca de duas décadas, segundo o autor, o país deixou de ser basicamente agrário e se tornou uma potência industrial. Depois da Segunda Guerra Mundial, outros Estados se tornaram socialistas, por ocupação militar soviética ou por processos internos, como a China, o Vietnã, Cuba, Angola e Moçambique.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Orientados mais pelo princípio da igualdade social do que pelo da liberdade individual, os estados socialistas conseguiram efetivamente produzir sociedades bem mais igualitárias, do ponto de vista do acesso dos seus cidadãos a bens e serviços, do que os estados nas sociedades capitalistas.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 83",
          },
          {
            type: "paragraph",
            text: "O autor cita como exemplos a educação e a saúde em Cuba e os avanços tecnológicos soviéticos. Registra também que “em nenhum país socialista – nem mesmo nos mais ricos – a escassez de produtos básicos de alimentação e de higiene pessoal seria superada” e que, com o tempo, o padrão de vida no Leste europeu ficou estagnado em relação ao do Oeste.",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Reformas e crise" },
          {
            type: "paragraph",
            text: "Nos anos 1980, o último presidente da União Soviética, Mikhail Gorbatchov, propôs a glasnost, de abertura política, e a perestroika, que introduzia alguns mecanismos de mercado. Para Coelho, a primeira avançou e a segunda “veio a ser um rotundo fracasso”. No fim da década, os regimes socialistas do Leste europeu começaram a cair, e a União Soviética se desfez no início dos anos 1990. Na China e no Vietnã, reformas de mercado avançaram sem abertura política; se isso poderá continuar sem questionar o controle do poder pelos partidos comunistas é, segundo o autor, “uma questão que segue em aberto”.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "example",
            title: "Situação hipotética: o plano quinquenal de Vale Alto",
            text: "No país fictício de Vale Alto, o governo central define, em um plano de cinco anos, quantas geladeiras, pares de sapatos e toneladas de trigo cada fábrica e cada fazenda devem produzir e a que preço os produtos serão vendidos. Os conceitos desta lição ajudam a formular perguntas: quem decide o que produzir? Que espaço resta para a iniciativa privada e para a concorrência? Como ficam o acesso da população aos bens e a oferta de produtos nas lojas? Coelho (2014) descreve esse tipo de controle estatal e registra resultados diferentes nas experiências reais. A situação não indica se o modelo é desejável nem prevê os resultados de Vale Alto.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "A lição se apoia sobretudo na descrição de um livro didático, que apresenta interpretações do autor. O acervo não traz dados econômicos, documentos oficiais nem estudos específicos sobre cada país socialista e não descreve socialismos que não chegaram ao governo. A classificação desses regimes como totalitários é feita pelo autor com base em Arendt e Aron, cujas obras não estão no acervo.",
          },
        ],
        relatedConcepts: [
          {
            term: "Planejamento central",
            explanation: "Segundo Coelho (2014), a organização da economia pelo Estado em planos, como os planos quinquenais soviéticos de investimento e desenvolvimento industrial.",
          },
          {
            term: "Kolkhozes",
            explanation: "Exemplo dado por Coelho (2014) de propriedade coletiva de terras na União Soviética, também submetida ao controle do Estado.",
          },
          {
            term: "Glasnost e perestroika",
            explanation: "Reformas propostas por Gorbatchov, segundo Coelho (2014): abertura política e introdução de alguns mecanismos de mercado.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho (2014), qual é a primeira característica fundamental do Estado socialista?",
            options: [
              { id: "a", text: "O controle estatal de todo o processo produtivo." },
              { id: "b", text: "A intervenção no mercado por meio de políticas públicas, mantendo a iniciativa privada." },
              { id: "c", text: "A ausência de Estado." },
            ],
            correctOptionId: "a",
            explanation:
              "O autor aponta o controle estatal de todo o processo produtivo. A alternativa b descreve o Estado de bem-estar social, tratado no módulo Social-democracia. A alternativa c corresponde ao horizonte do comunismo em Marx, tratado no módulo Comunismo.",
          },
          {
            id: "q2",
            prompt: "Que resultados dos Estados socialistas Coelho (2014) registra?",
            options: [
              { id: "a", text: "Apenas resultados positivos." },
              { id: "b", text: "Sociedades mais igualitárias no acesso a bens e serviços, mas sem superar a escassez de produtos básicos." },
              { id: "c", text: "Abundância de produtos e consumo sempre crescente." },
            ],
            correctOptionId: "b",
            explanation:
              "O autor registra as duas coisas: mais igualdade no acesso a bens e serviços e a escassez de produtos básicos, nunca superada, além da estagnação do padrão de vida em relação ao Oeste. Por isso, as alternativas a e c ficam incompletas ou contrariam o texto.",
          },
          {
            id: "q3",
            prompt: "Segundo o autor, o que aconteceu com as reformas propostas por Gorbatchov?",
            options: [
              { id: "a", text: "A glasnost avançou, a perestroika fracassou, e a União Soviética se desfez no início dos anos 1990." },
              { id: "b", text: "As duas reformas fortaleceram o regime soviético." },
              { id: "c", text: "As reformas foram aplicadas apenas na China." },
            ],
            correctOptionId: "a",
            explanation:
              "Coelho descreve o avanço da glasnost, o fracasso da perestroika e a queda dos regimes do Leste europeu e da União Soviética. Na China e no Vietnã houve reformas de mercado, mas sem abertura política, e o autor não as atribui a Gorbatchov.",
          },
        ],
      },
      sources: [
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor: a revolução russa de 1917 (p. 56); o surgimento e as características do Estado socialista, com o controle estatal de todo o processo produtivo citado literalmente (p. 81); a representação pelo Partido Comunista, a punição de discordâncias e o conceito de totalitarismo (p. 82); os planos quinquenais e a industrialização (p. 82–83); os países que se tornaram socialistas, a igualdade no acesso a bens e serviços, citada literalmente, os exemplos de Cuba e da União Soviética e a escassez de produtos básicos (p. 83); a estagnação, a glasnost e a perestroika, a queda dos regimes e as reformas na China e no Vietnã (p. 84–85).",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, como interpretação dos autores, que os regimes socialistas do século XX têm fundamentos no marxismo, embora Marx esperasse o socialismo em sociedades capitalistas industrializadas, e não em países como Rússia, China e Cuba (p. 73).",
        },
        {
          key: "ilb-doutrina-socialismo",
          supports: "Sustenta que a ementa do curso do ILB sobre socialismo chama de socialismo real as experiências históricas, distintas da proposta.",
        },
      ],
    },
  ],
};