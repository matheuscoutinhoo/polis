import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloSocialDemocracia: SeedModule = {
  slug: "social-democracia",
  number: 7,
  title: "Social-democracia",
  summary:
    "A social-democracia segundo as fontes do acervo: o Estado de bem-estar social, os governos sociais-democratas do pós-guerra, a crise dos anos 1970 e o debate sobre a chamada Terceira Via.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "reformas-direitos-sociais-e-mercado",
      number: 1,
      title: "Social-democracia: reformas, direitos sociais e mercado",
      objective:
        "Identificar o que as fontes do acervo dizem sobre a social-democracia e o Estado de bem-estar social, separando afirmações das fontes, interpretações de autores e lacunas.",
      minutes: 6,
      currentKeys: ["social-democracia"],
      reviewedOn: REVISED_ON,
      previous: { module: "social-democracia-socialismos-e-comunismo", lesson: "social-democracia" },
      content: {
        intro:
          "Esta lição apresenta a social-democracia a partir das fontes do acervo da Polis: o que elas destacam, as ideias centrais e os limites do material. As fontes usam o nome no singular e não descrevem vertentes internas da corrente. A trajetória histórica e os debates, como a crise dos anos 1970 e a chamada Terceira Via, são tema da próxima lição. A lição descreve, sem avaliar.",
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
            text: "A ementa apenas indica esses temas; o conteúdo completo exige cadastro gratuito. Para tratar da relação entre Estado e mercado, tema do título, esta lição usa o conceito de Estado de bem-estar social, descrito no livro didático de Ricardo Corrêa Coelho (2014). Segundo o autor, depois da Segunda Guerra Mundial, os Estados da Europa Ocidental governados por partidos sociais-democratas, como nos países escandinavos e na Alemanha, estiveram entre os que intervieram fortemente na economia e criaram sistemas de proteção social abrangentes. O autor registra o mesmo movimento sob governos trabalhistas e de direita.",
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
            text: "Políticas públicas são programas de ação do governo, e “patamar mínimo” indica um piso. A intervenção ocorre no mercado, sem substituí-lo. Em artigo publicado pelo Senado, Ricardo Quartim de Moraes (2014) também organiza a história do Estado em etapas: Estado Liberal, Estado Social e Estado Democrático de Direito, expressão com que a Constituição de 1988 define a República (art. 1º). É uma interpretação do autor, e os trechos do acervo não detalham como o Estado Social do artigo se relaciona com o Estado de bem-estar social do livro de Coelho.",
            sources: ["pnap-estado-governo-mercado", "ril-204-estado-liberal-estado-democratico", "cf88-art1"],
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
            text: "O acervo não traz uma definição da social-democracia. Dos governos associados a ela, menciona apenas, de forma geral, os partidos sociais-democratas dos países escandinavos e da Alemanha no pós-guerra, sem detalhar programas nem reformas. O compromisso social-democrata e suas bases materiais aparecem apenas como temas de uma ementa. A lição não classifica a Constituição de 1988 como social-democrata, e as fontes do acervo também não o fazem.",
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
              "No livro de Coelho, o Estado de bem-estar social sucede o Estado liberal e intervém no mercado por meio de políticas públicas. A alternativa b descreve o Estado mínimo, que o mesmo livro associa ao Estado liberal clássico. A alternativa c corresponde à primeira característica que o livro atribui ao Estado socialista, tema do módulo Socialismos.",
          },
          {
            id: "q2",
            prompt: "O que o livro de Coelho (2014) diz sobre os governos sociais-democratas no pós-guerra?",
            options: [
              { id: "a", text: "Que foram os únicos a criar sistemas de proteção social." },
              { id: "b", text: "Que estiveram entre os governos que intervieram fortemente na economia e criaram proteção social, ao lado de governos trabalhistas e de direita." },
              { id: "c", text: "Que se opuseram a qualquer intervenção do Estado na economia." },
            ],
            correctOptionId: "b",
            explanation:
              "O autor cita os sociais-democratas dos países escandinavos e da Alemanha entre os governos europeus que intervieram fortemente na economia e desenvolveram sistemas de proteção social, e registra o mesmo movimento sob governos trabalhistas e de direita. Por isso, a alternativa a exagera e a c contraria o texto.",
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
            "Sustenta, como interpretação do autor, a correspondência entre Estado liberal clássico e Estado mínimo (p. 75), a definição de Estado de bem-estar social citada literalmente (p. 86) e a intervenção dos Estados da Europa Ocidental no pós-guerra, governados por sociais-democratas, trabalhistas ou partidos de direita (p. 89).",
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
      slug: "compromisso-crise-e-terceira-via",
      number: 2,
      title: "Social-democracia: seguros sociais, crise e Terceira Via",
      objective:
        "Relacionar a social-democracia aos seguros sociais, à expansão do Estado de bem-estar no pós-guerra, à crise dos anos 1970 e aos debates posteriores, separando o que as fontes afirmam das lacunas do acervo.",
      minutes: 7,
      currentKeys: ["social-democracia"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "Esta lição acompanha a trajetória que as fontes do acervo associam à social-democracia: a disputa política em torno dos seguros sociais, a expansão do Estado de bem-estar depois da Segunda Guerra Mundial, a crise dos anos 1970 e debates posteriores, como a chamada Terceira Via. Os trechos vêm sobretudo do livro didático de Ricardo Corrêa Coelho (2014) e de ementas do Instituto Legislativo Brasileiro (ILB). A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "Seguros sociais e disputa política" },
          {
            type: "paragraph",
            text: "Coelho (2014) mostra que a proteção social também foi objeto de disputa política. Ao comparar países, o autor descreve o caso da Alemanha de Bismarck, em que o governo criou seguros sociais para os trabalhadores:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Na Alemanha de Bismark – por exemplo – as organizações dos trabalhadores repudiariam os seguros criados pelo governo, não apenas por razões ideológicas, mas porque, além dos benefícios trazidos pelos seguros sociais à produtividade do trabalho, aquelas medidas tinham o claro intuito de enfraquecer tanto o partido social-democrata entre os operários, quanto a ação da burguesia liberal alemã.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 88",
          },
          {
            type: "paragraph",
            text: "Na leitura do autor, portanto, os seguros alemães foram também uma forma de disputar o apoio dos operários com o partido social-democrata. Coelho descreve ainda uma mudança de mentalidade como condição para o Estado de bem-estar: ele “só se firmou quando a cultura individualista” das sociedades liberais, que via no Estado um mal necessário, “cedeu lugar a uma outra cultura mais solidária”.",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "O pós-guerra" },
          {
            type: "paragraph",
            text: "Segundo Coelho (2014), depois da Segunda Guerra Mundial, todos os Estados da Europa Ocidental intervieram fortemente na economia, com regulação, estatização de empresas privadas e criação de empresas públicas, e desenvolveram sistemas de proteção social abrangentes. O autor cita governos de partidos de esquerda, como os sociais-democratas dos países escandinavos e da Alemanha e o trabalhista inglês, e também de partidos de direita, na França e na Itália. Na leitura do livro, o Estado de bem-estar não foi obra exclusiva da social-democracia, embora os sociais-democratas estivessem entre os governos que o construíram.",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "A crise dos anos 1970" },
          {
            type: "paragraph",
            text: "O mesmo livro situa o fim desse ciclo nos anos 1970. Depois de três décadas de expansão na Europa, os choques do petróleo de 1973 e 1979 trouxeram inflação e desemprego, e o mundo entrou no que os economistas chamaram de estagflação, isto é, estagnação econômica acompanhada de inflação. Para Coelho, foi nesse momento que as ideias liberais voltaram com força, no movimento chamado de neoliberalismo, tratado no módulo Liberalismos. O autor descreve assim o alvo das críticas:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Já as críticas dos neoliberais ao Estado de bem-estar social e suas propostas para tirar as sociedades capitalistas da crise em que se encontravam são dirigidas não à intervenção do Estado em geral, mas à sua intervenção específica em determinadas esferas das relações econômicas, como o mercado de trabalho, mercado de capitais e mercado de bens e serviços.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 100–101",
          },
          {
            type: "paragraph",
            text: "Coelho acrescenta que, nessa agenda, as políticas sociais “manteriam seu lugar” como direitos de cidadania, e que ela foi aplicada também sob governos socialistas, como o de Felipe González, na Espanha (1982–1996). Para o autor, em todos os lugares onde as reformas ocorreram houve aumento das disparidades de renda entre ricos e pobres; é uma avaliação dele, que os trechos do acervo não detalham com dados.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "paragraph",
            text: "A ementa do curso do ILB sobre a social-democracia, isto é, o resumo do seu programa, também dedica uma unidade às “Razões da Crise da Social-Democracia”. O trecho público não diz quais são essas razões nem se trata da mesma crise que Coelho descreve para o Estado de bem-estar social; por isso, a lição não liga as duas.",
            sources: ["ilb-doutrina-social-democracia"],
          },
          { type: "heading", text: "Terceira Via e novas esquerdas" },
          {
            type: "paragraph",
            text: "A série do ILB tem um curso sobre as chamadas novas esquerdas, com uma unidade intitulada “Esquerda e Direita Hoje” e outra que leva o nome de Anthony Giddens e da Terceira Via; a ementa não define a Terceira Via nem a apresenta como vertente social-democrata. Esquerda e direita são os polos de uma escala usada para classificar partidos, e há várias formas de fazer essa classificação. Em artigo publicado pelo Senado, Emmanuel Pedro Ribeiro (2023) descreve o momento em que, segundo ele, o pensamento político de esquerda no Brasil “se abriu aos valores democráticos e passou a falar a linguagem dos direitos humanos”. Os trechos do acervo não ligam essa mudança à social-democracia.",
            sources: ["ilb-doutrina-novas-esquerdas", "camara-bd-scheeffer-espectro-ideologico", "ril-238-cultura-politica-esquerda"],
          },
          {
            type: "example",
            title: "Situação hipotética: o seguro-desemprego de Vale Alto",
            text: "No país fictício de Vale Alto, a economia está parada e os preços sobem. No Parlamento, um grupo propõe reduzir regras trabalhistas para estimular contratações; outro propõe ampliar o seguro-desemprego. Os conceitos desta lição ajudam a organizar o debate: a primeira proposta segue a crítica que Coelho (2014) atribui aos neoliberais, dirigida à intervenção no mercado de trabalho; a segunda se apoia na proteção social do Estado de bem-estar. A situação não indica qual proposta é melhor nem quais efeitos cada uma teria.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo não define a social-democracia nem descreve o compromisso social-democrata além do título de uma unidade da ementa do ILB. Os governos sociais-democratas aparecem só em menção geral, sem programas, datas ou resultados. A avaliação de que as reformas neoliberais aumentaram as disparidades de renda é do autor do livro didático e não vem acompanhada de dados no trecho. A Terceira Via não é definida no acervo, que também não reúne críticas de outras correntes à social-democracia.",
          },
        ],
        relatedConcepts: [
          {
            term: "Estagflação",
            explanation: "Segundo Coelho (2014), estagnação econômica acompanhada de inflação, nome dado pelos economistas ao período aberto nos anos 1970.",
          },
          {
            term: "Seguros sociais",
            explanation:
              "Proteções criadas pelo Estado para trabalhadores; Coelho (2014) descreve os seguros da Alemanha de Bismarck como medida também voltada a enfraquecer o partido social-democrata.",
          },
          {
            term: "Terceira Via",
            explanation: "Tema de uma unidade do curso do ILB sobre as novas esquerdas, associado ao nome de Anthony Giddens; o acervo não a define.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho (2014), por que as organizações de trabalhadores alemãs repudiaram os seguros criados no governo de Bismarck?",
            options: [
              { id: "a", text: "Porque os seguros prejudicavam a produtividade do trabalho." },
              { id: "b", text: "Também porque as medidas buscavam enfraquecer o partido social-democrata entre os operários, além da burguesia liberal." },
              { id: "c", text: "Porque os seguros foram propostos pelo partido social-democrata." },
            ],
            correctOptionId: "b",
            explanation:
              "O autor afirma que os seguros traziam benefícios à produtividade, mas tinham o claro intuito de enfraquecer o partido social-democrata entre os operários e a ação da burguesia liberal alemã. Por isso, a alternativa a contraria o texto, e a c inverte quem propôs as medidas.",
          },
          {
            id: "q2",
            prompt: "No livro de Coelho (2014), a que se dirigiam as críticas neoliberais ao Estado de bem-estar social?",
            options: [
              { id: "a", text: "À existência de qualquer intervenção do Estado." },
              { id: "b", text: "À intervenção do Estado em esferas específicas, como os mercados de trabalho, de capitais e de bens e serviços." },
              { id: "c", text: "Às políticas públicas de educação e saúde." },
            ],
            correctOptionId: "b",
            explanation:
              "O autor escreve que as críticas não se dirigiam à intervenção do Estado em geral, mas à intervenção em determinadas esferas. Ele acrescenta que, nessa agenda, as políticas sociais manteriam seu lugar como direitos de cidadania; por isso, a alternativa c também contraria o texto.",
          },
          {
            id: "q3",
            prompt: "Na situação hipotética de Vale Alto, o que os conceitos da lição permitem fazer?",
            options: [
              { id: "a", text: "Prever qual proposta vai reduzir o desemprego." },
              { id: "b", text: "Organizar o debate, identificando a crítica à intervenção no mercado de trabalho e a proteção social do Estado de bem-estar." },
              { id: "c", text: "Provar que toda crise econômica leva ao fim do Estado de bem-estar." },
            ],
            correctOptionId: "b",
            explanation:
              "Os conceitos ajudam a identificar de onde vêm as propostas, não a prever seus efeitos. O acervo não traz dados que permitam prever resultados em Vale Alto nem afirmar uma regra geral sobre crises.",
          },
        ],
      },
      sources: [
        {
          key: "ilb-doutrina-social-democracia",
          supports:
            "Sustenta que a ementa pública do curso do ILB sobre a social-democracia tem uma unidade sobre as razões da crise da corrente, sem que o trecho público diga quais são.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor: a mudança para uma cultura mais solidária (p. 87); os seguros sociais da Alemanha de Bismarck, citados literalmente (p. 88); a intervenção dos Estados europeus no pós-guerra sob governos sociais-democratas, trabalhistas e de direita (p. 89); os choques do petróleo, a estagflação e o retorno das ideias liberais (p. 97); a agenda neoliberal, inclusive sob o governo de Felipe González (p. 99); o alvo das críticas neoliberais, citado literalmente, o lugar das políticas sociais e o aumento das disparidades de renda (p. 100–101).",
        },
        {
          key: "ilb-doutrina-novas-esquerdas",
          supports:
            "Sustenta que a série do ILB tem curso sobre as chamadas novas esquerdas, com as unidades “Esquerda e Direita Hoje” e “Anthony Giddens e a Terceira Via”, sem que a ementa pública defina a Terceira Via.",
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
      ],
    },
  ],
};