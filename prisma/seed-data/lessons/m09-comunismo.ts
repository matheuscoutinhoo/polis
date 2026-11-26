import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloComunismo: SeedModule = {
  slug: "comunismo",
  number: 9,
  title: "Comunismo",
  summary:
    "O comunismo segundo as fontes do acervo: o programa do Manifesto de 1848, a sociedade sem classes e sem Estado descrita por Marx e os partidos e regimes comunistas do século XX, com suas divergências.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "luta-de-classes-e-sociedade-sem-estado",
      number: 1,
      title: "Comunismo: luta de classes e a sociedade sem Estado",
      objective:
        "Identificar o que o Manifesto Comunista propunha e como o acervo descreve o comunismo no pensamento de Marx, separando a proposta dos autores das interpretações de livros didáticos.",
      minutes: 7,
      currentKeys: ["comunismo"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "Esta lição apresenta o comunismo a partir do Manifesto do Partido Comunista, escrito por Karl Marx e Friedrich Engels em 1848, e do livro didático de Ricardo Corrêa Coelho e Helena da Motta Salles (2015), que resume o pensamento de Marx. O Manifesto é um texto programático: registra o que os autores defendiam, sem comprovar suas teses nem os resultados históricos. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Comunismo, no pensamento de Marx",
            text: "Segundo Coelho e Salles (2015), o estágio que viria depois do socialismo: uma sociedade sem classes sociais e sem Estado, na qual, para Marx, as pessoas seriam “iguais na abundância” e poderiam desenvolver plenamente o seu potencial.",
            sources: ["pnap-ciencia-politica"],
          },
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
            text: "Para Marx e Engels, essas lutas opõem opressores e oprimidos. Coelho e Salles (2015) explicam a ideia no vocabulário de Marx: a luta de classes seria o “motor” da história, e o Estado teria surgido para garantir a dominação de uma classe sobre outra. Antes das primeiras civilizações, segundo Marx, teria existido um “comunismo primitivo”, sem Estado, sem classes e sem propriedade, mas marcado pela escassez. No capitalismo, as classes fundamentais seriam a burguesia, “proprietária de todos os meios de produção”, e o proletariado, “destituído de toda propriedade, exceto a da sua força de trabalho”.",
            sources: ["dominiopublico-manifesto-comunista", "pnap-ciencia-politica"],
          },
          { type: "heading", text: "Ideias centrais: propriedade e Estado" },
          {
            type: "paragraph",
            text: "O Manifesto afirma que o que caracteriza o comunismo “não é a abolição da propriedade em geral, mas a abolição da propriedade burguesa”. Os autores propõem que, na “revolução operária”, o proletariado, a classe dos operários, se torne “classe dominante” e use sua supremacia política para “arrancar pouco a pouco todo capital à burguesia” e “centralizar todos os instrumentos de produção nas mãos do Estado”.",
            sources: ["dominiopublico-manifesto-comunista"],
          },
          {
            type: "paragraph",
            text: "Na leitura de Coelho e Salles (2015), o uso da força do Estado pertenceria a uma fase transitória, o socialismo, tema do módulo anterior. Quando as classes fossem finalmente abolidas, “o próprio Estado deixaria de existir”, porque teria perdido sua função. O comunismo seria, assim, o “estágio superior da condição humana”, numa sociedade “civilizada e sem Estado”. Os autores reproduzem um trecho de A ideologia alemã, de Marx e Engels, sobre a vida imaginada nessa sociedade:",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "quote",
            text: "Na sociedade comunista, porém, onde cada indivíduo pode aperfeiçoar-se no campo que lhe aprouver, não tendo por isso uma esfera de atividade exclusiva, é a sociedade que regula a produção geral e me possibilita fazer hoje uma coisa, amanhã outra, caçar de manhã, pescar à tarde, pastorear à noite, fazer crítica depois da refeição, e tudo isto a meu bel-prazer, sem por isso me tornar exclusivamente caçador, pescador ou crítico.",
            sourceKey: "pnap-ciencia-politica",
            locator: "p. 65–66 (trecho de A ideologia alemã, de Marx e Engels)",
          },
          { type: "heading", text: "Debates" },
          {
            type: "paragraph",
            text: "O Manifesto é de 1848. Os regimes comunistas que o acervo descreve vieram no século XX, a começar pelo da União Soviética, em 1917; como os comunistas desse século interpretaram e aplicaram essas ideias, e as divergências entre eles, é tema da próxima lição. Nos livros didáticos do acervo, o marxismo é estudado ao lado do liberalismo: para Coelho e Salles (2015), as duas correntes “pretendem-se libertárias”, isto é, têm a liberdade e a igualdade como valores máximos, e divergem quanto aos meios de promovê-las e ao método de análise. É uma interpretação dos autores.",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "example",
            title: "Situação hipotética: a família dona da fábrica de calçados",
            text: "Em uma cidade fictícia, uma família é dona de uma fábrica de calçados e da casa onde mora. A distinção do Manifesto entre abolir “a propriedade em geral” e abolir “a propriedade burguesa” leva a uma pergunta: o que estaria em jogo, a casa da família ou as máquinas e o prédio da fábrica? Coelho e Salles (2015) descrevem a proposta de Marx como o fim da “propriedade privada dos meios de produção”, como as máquinas e os equipamentos; os trechos do acervo não detalham como a proposta trataria cada tipo de bem. A situação organiza a discussão, mas não indica se a proposta é desejável nem como ela funcionou em experiências reais.",
            sources: ["dominiopublico-manifesto-comunista", "pnap-ciencia-politica"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo traz poucos trechos do Manifesto, em tradução sem autoria indicada, e nenhum de outras obras de Marx e Engels além do trecho de A ideologia alemã reproduzido no livro didático. A sociedade comunista descrita aqui é uma proposta dos autores, apresentada em textos programáticos e num resumo didático; o acervo não traz estudos sobre tentativas de realizá-la além dos regimes tratados na próxima lição. O acervo também não reúne críticas de outras correntes ao comunismo; por isso, a lição não as resume.",
          },
        ],
        relatedConcepts: [
          {
            term: "Luta de classes",
            explanation: "Segundo Marx e Engels no Manifesto, conflito entre opressores e oprimidos que, para os autores, marca a história das sociedades.",
          },
          {
            term: "Comunismo primitivo",
            explanation: "Segundo a leitura de Marx apresentada por Coelho e Salles (2015), modo de vida anterior às civilizações, sem Estado, classes nem propriedade, e marcado pela escassez.",
          },
          {
            term: "Propriedade burguesa",
            explanation: "Expressão do Manifesto para a propriedade cuja abolição, segundo os autores, caracteriza o comunismo, distinta da propriedade em geral.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Marx e Engels no Manifesto, o que caracteriza o comunismo?",
            options: [
              { id: "a", text: "A abolição de toda forma de propriedade." },
              { id: "b", text: "A abolição da propriedade burguesa, e não da propriedade em geral." },
              { id: "c", text: "A manutenção do capital nas mãos da burguesia." },
            ],
            correctOptionId: "b",
            explanation:
              "Os autores escrevem que o que caracteriza o comunismo não é a abolição da propriedade em geral, mas a da propriedade burguesa; a alternativa a ignora essa distinção. A alternativa c contraria a proposta de arrancar pouco a pouco todo capital à burguesia. O Manifesto registra o que os autores defendiam, sem comprovar suas teses.",
          },
          {
            id: "q2",
            prompt: "Segundo Coelho e Salles (2015), o que aconteceria com o Estado no comunismo descrito por Marx?",
            options: [
              { id: "a", text: "Deixaria de existir, porque teria perdido sua função de garantir a dominação de uma classe." },
              { id: "b", text: "Controlaria toda a produção de forma permanente." },
              { id: "c", text: "Passaria a ser governado por representantes eleitos." },
            ],
            correctOptionId: "a",
            explanation:
              "Na leitura dos autores, quando as classes fossem abolidas, o próprio Estado deixaria de existir. A alternativa b contraria essa leitura: no Manifesto, centralizar os instrumentos de produção nas mãos do Estado aparece ligado à primeira fase da revolução operária, e não como situação permanente. A alternativa c não aparece nas fontes.",
          },
          {
            id: "q3",
            prompt: "Na leitura apresentada pelos autores, qual é a diferença entre o comunismo primitivo e a sociedade comunista imaginada por Marx?",
            options: [
              { id: "a", text: "Nenhuma: são a mesma sociedade." },
              { id: "b", text: "No comunismo primitivo, todos eram iguais na pobreza e na escassez; na sociedade comunista, seriam iguais na abundância." },
              { id: "c", text: "O comunismo primitivo tinha Estado; a sociedade comunista teria classes." },
            ],
            correctOptionId: "b",
            explanation:
              "Segundo Coelho e Salles (2015), as duas não teriam Estado nem classes, mas diferem na escassez: iguais na pobreza, antes; iguais na abundância, depois. Por isso, as alternativas a e c contrariam o texto.",
          },
        ],
      },
      sources: [
        {
          key: "dominiopublico-manifesto-comunista",
          supports:
            "Sustenta o que Marx e Engels afirmavam e propunham em 1848: a apresentação do texto como manifesto programático, a história como história das lutas de classes (citação literal), a oposição entre opressores e oprimidos, a abolição da propriedade burguesa e a proposta de centralizar os instrumentos de produção nas mãos do Estado. Pela nota de escopo, o texto não comprova as teses nem os resultados históricos.",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, como interpretação dos autores sobre Marx: a luta de classes como motor da história e os meios de produção (p. 55); o comunismo primitivo e a origem do Estado (p. 56); burguesia e proletariado como classes fundamentais do capitalismo (p. 58); o fim da propriedade privada dos meios de produção (p. 64); o socialismo como fase transitória e a igualdade na abundância na sociedade comunista (p. 65); o trecho de A ideologia alemã, citado literalmente (p. 65–66); o fim do Estado e o comunismo como estágio superior, numa sociedade sem Estado (p. 66); e a leitura de que liberalismo e marxismo se pretendem libertários e divergem nos meios (p. 68).",
        },
      ],
    },
    {
      slug: "partidos-e-regimes-comunistas",
      number: 2,
      title: "Comunismo no século XX: partidos, regimes e divergências",
      objective:
        "Identificar como o acervo descreve os partidos e regimes comunistas do século XX e as divergências entre o leninismo e o eurocomunismo, separando a descrição dos autores das lacunas do acervo.",
      minutes: 7,
      currentKeys: ["comunismo"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "No século XX, partidos que se apresentavam como comunistas chegaram ao governo em vários países. Esta lição mostra como dois livros didáticos públicos do acervo, de Coelho (2014) e de Coelho e Salles (2015), descrevem esses partidos e regimes e as divergências entre eles. São interpretações dos autores, que usam conceitos de outros estudiosos, como Raymond Aron. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "Lênin e a ditadura do proletariado" },
          {
            type: "paragraph",
            text: "Segundo Coelho (2014), Lênin pretendeu atualizar a teoria do capitalismo de Marx, influenciado também pela situação da Rússia, país de industrialização incipiente e posição periférica no capitalismo internacional. Ao contrário de Marx, que imaginava a revolução começando nos países mais desenvolvidos, Lênin acreditava que ela teria lugar justamente nos menos desenvolvidos, e propôs a aliança entre operários e camponeses, que para Marx pareceria absurda. Depois da revolução de outubro de 1917, com os bolcheviques no poder, Lênin comandou o Estado soviético. O autor registra uma mudança no sentido de uma expressão central:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Assim, a ditadura do proletariado assumiria na União Soviética e no pensamento de Lênin um significado bem mais forte do que no de Marx, pois no tempo deste inexistia democracia no mundo, ao passo que no de Lênin essa já era a forma de governo dos países capitalistas mais desenvolvidos da Europa e dos Estados Unidos.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 56",
          },
          {
            type: "paragraph",
            text: "Para Coelho, a rejeição da democracia e a defesa intransigente da ditadura separaram as correntes marxistas de orientação leninista, ligadas à III Internacional, das correntes marxistas dos países capitalistas centrais. No módulo Socialismos, viu-se que, segundo Coelho e Salles (2015), Marx usava a palavra para indicar um governo de classe, e não um governo mais duro que os de seu tempo.",
            sources: ["pnap-estado-governo-mercado", "pnap-ciencia-politica"],
          },
          { type: "heading", text: "Os regimes comunistas" },
          {
            type: "paragraph",
            text: "Coelho e Salles (2015) incluem os regimes comunistas da União Soviética (1917–1991), da China, da Coreia do Norte e de Cuba entre os regimes de partido único, ao lado de regimes “em muitos sentidos diferentes, e até opostos”, como o fascismo italiano e o nazismo alemão. Os autores partem de Hannah Arendt, que estudou a Alemanha hitlerista e a União Soviética stalinista, e adotam os critérios, mais abrangentes, do sociólogo francês Raymond Aron:",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "quote",
            text: "Regimes totalitários são aqueles em que o grupo governante não só detém o monopólio do acesso ao exercício do governo como também pretende exercer o controle total sobre a sociedade.",
            sourceKey: "pnap-ciencia-politica",
            locator: "p. 79",
          },
          {
            type: "paragraph",
            text: "Os autores destacam diferenças. Os regimes comunistas “pretendiam-se, e ainda se pretendem, governos da classe operária sob a forma da ditadura do proletariado”. Diferentemente da nazista, a ideologia comunista não teve viés racista ou genocida: segundo os autores, o objetivo primeiro era acabar com a propriedade privada e, por meio disso, com as classes exploradoras; no início da revolução russa, a burguesia foi atingida pela expropriação dos seus bens. Ao mesmo tempo, os autores registram o objetivo de criar uma nova sociedade e um novo homem, a intolerância à divergência e o terror de Estado exercido por polícias políticas, como a KGB soviética. Para eles, as diferenças entre regimes nazifascistas e comunistas são enormes, mas os dois compartilham “a pretensão do Estado em controlar totalmente a sociedade”.",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "paragraph",
            text: "Os regimes também mudaram com o tempo. Para Coelho e Salles (2015), o regime chinês é “um bom exemplo de regime totalitário que foi progressivamente se transformando em autoritário”: depois de Mao Tsé-tung, a China adotou reformas de mercado, com propriedade privada garantida, mantendo o controle do sistema político pelo partido.",
            sources: ["pnap-ciencia-politica"],
          },
          { type: "heading", text: "Divergências: o eurocomunismo" },
          {
            type: "paragraph",
            text: "Nem todos os partidos comunistas seguiram o mesmo caminho. Coelho (2014) descreve o eurocomunismo, que teve como base a liderança intelectual de Palmiro Togliatti no Partido Comunista Italiano, depois da morte do teórico Antonio Gramsci. Segundo o autor, nos anos 1970 e 1980 essa passou a ser a orientação dominante na maior parte dos partidos comunistas da Europa Ocidental:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "O Eurocomunismo iria se afastar ideologicamente do Partido Comunista da União Soviética ao declarar fidelidade às instituições democráticas, renunciar à revolução social como forma de construção do socialismo e procurar representar outras forças sociais além do operariado industrial, como os funcionários do setor público, as classes médias e os novos movimentos sociais.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 57–58",
          },
          {
            type: "example",
            title: "Situação hipotética: o congresso do partido de Vale Alto",
            text: "No país fictício de Vale Alto, com eleições livres, um partido comunista discute sua estratégia. Uma ala propõe disputar eleições, aceitar a alternância no governo e buscar apoio entre servidores públicos e a classe média; outra sustenta que só uma ruptura revolucionária permitiria construir o socialismo. Os conceitos desta lição ajudam a identificar a discussão: a primeira posição se aproxima do que Coelho (2014) descreve como eurocomunismo; a segunda, da defesa da ditadura que o autor associa à tradição leninista. A situação não indica qual estratégia é melhor nem prevê seus resultados.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "A lição se apoia em dois livros didáticos que apresentam interpretações dos autores e usam conceitos de Hannah Arendt e Raymond Aron, cujas obras não estão no acervo. O acervo não traz documentos dos partidos comunistas, dados sobre os regimes nem estudos sobre partidos comunistas no Brasil. Também não reúne textos de defensores ou de adversários desses regimes; por isso, a lição não os resume.",
          },
        ],
        relatedConcepts: [
          {
            term: "Leninismo",
            explanation: "Segundo Coelho (2014), orientação marxista ligada à III Internacional, marcada pela rejeição da democracia e pela defesa da ditadura como garantia da revolução.",
          },
          {
            term: "Totalitarismo",
            explanation:
              "Nos critérios de Aron adotados por Coelho e Salles (2015), regime em que o grupo governante monopoliza o acesso ao governo e pretende controlar totalmente a sociedade.",
          },
          {
            term: "Eurocomunismo",
            explanation: "Segundo Coelho (2014), orientação de partidos comunistas da Europa Ocidental que declarou fidelidade às instituições democráticas e renunciou à revolução social.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho (2014), o que mudou no sentido da ditadura do proletariado com Lênin?",
            options: [
              { id: "a", text: "Ganhou um significado bem mais forte do que em Marx, com a rejeição da democracia e a defesa intransigente da ditadura." },
              { id: "b", text: "Deixou de ser usada na União Soviética." },
              { id: "c", text: "Passou a significar fidelidade às instituições democráticas." },
            ],
            correctOptionId: "a",
            explanation:
              "O autor afirma que a expressão ganhou com Lênin um significado mais forte, porque no tempo dele a democracia já era a forma de governo dos países capitalistas mais desenvolvidos. A alternativa c descreve o eurocomunismo, que se afastou dessa orientação.",
          },
          {
            id: "q2",
            prompt: "Por que Coelho e Salles (2015) classificam regimes comunistas e nazifascistas como totalitários, apesar das diferenças?",
            options: [
              { id: "a", text: "Porque tinham a mesma ideologia." },
              { id: "b", text: "Porque, nos dois casos, o grupo governante monopolizava o acesso ao governo e pretendia controlar totalmente a sociedade." },
              { id: "c", text: "Porque ambos tinham viés racista." },
            ],
            correctOptionId: "b",
            explanation:
              "Os autores aplicam os critérios de Aron: monopólio do acesso ao governo e pretensão de controle total da sociedade. Eles registram que as ideologias eram diferentes e que a comunista não teve viés racista ou genocida; por isso, as alternativas a e c contrariam o texto.",
          },
          {
            id: "q3",
            prompt: "O que caracterizou o eurocomunismo, segundo Coelho (2014)?",
            options: [
              { id: "a", text: "A defesa da revolução social como único caminho para o socialismo." },
              { id: "b", text: "A fidelidade às instituições democráticas e a busca de outras bases sociais além do operariado industrial." },
              { id: "c", text: "A aliança exclusiva com os camponeses." },
            ],
            correctOptionId: "b",
            explanation:
              "Segundo o autor, o eurocomunismo declarou fidelidade às instituições democráticas, renunciou à revolução social e procurou representar servidores públicos, classes médias e novos movimentos sociais. A aliança entre operários e camponeses foi proposta por Lênin.",
          },
        ],
      },
      sources: [
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor: a atualização da teoria de Marx por Lênin, a aliança entre operários e camponeses e a tomada do poder em 1917 (p. 56); o significado mais forte da ditadura do proletariado, citado literalmente (p. 56); a separação entre correntes leninistas e marxistas dos países centrais (p. 56–57); e o eurocomunismo, com Gramsci e Togliatti, citado literalmente (p. 57–58).",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, como interpretação dos autores: o sentido da palavra ditadura em Marx (p. 64); Arendt e a definição de regimes totalitários segundo Aron, citada literalmente (p. 79); os regimes de partido único, incluídos os comunistas (p. 80); a diferença entre as ideologias comunista e nazista, o objetivo de acabar com a propriedade privada, a expropriação da burguesia e o objetivo de criar um novo homem (p. 81); a intolerância à divergência (p. 82); o terror de Estado e a KGB (p. 83); a pretensão de governo da classe operária (p. 84); as diferenças enormes e o traço comum de controle total da sociedade (p. 85); e a transformação do regime chinês (p. 86).",
        },
      ],
    },
  ],
};