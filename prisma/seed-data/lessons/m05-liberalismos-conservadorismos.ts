import type { SeedModule } from "./types";

export const moduloLiberalismosConservadorismos: SeedModule = {
  slug: "liberalismos-e-conservadorismos",
  number: 5,
  title: "Liberalismos e conservadorismos",
  summary: "O módulo apresenta ideias centrais, variações e debates de liberalismos e conservadorismos registrados nas fontes do acervo.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "liberalismos",
      number: 1,
      title: "Liberalismos: indivíduo, direitos e limites ao poder",
      objective: "Identificar as ideias centrais atribuídas ao liberalismo, suas variações e os debates que as fontes registram.",
      minutes: 6,
      currentKeys: ["liberalismos"],
      content: {
        intro:
          "Esta lição apresenta ideias do liberalismo tal como aparecem em livros didáticos, artigos e textos oficiais do acervo da Polis. O plural do título, liberalismos, indica que as fontes registram variações dentro da própria corrente. A lição descreve essas ideias; não avalia se são certas ou erradas.",
        blocks: [
          { type: "heading", text: "O que a corrente enfatiza" },
          {
            type: "definition",
            term: "Liberalismo",
            text: "Corrente de pensamento político que, segundo Coelho e Salles (2015), se funda no jusnaturalismo, que tem o indivíduo por ponto de partida, e defende a liberdade e a propriedade individuais. Jusnaturalismo é uma corrente filosófica que trata o indivíduo como origem do direito; segundo Coelho (2014), ela predominou na Europa nos séculos XVII e XVIII.",
            sources: ["pnap-ciencia-politica", "pnap-estado-governo-mercado"],
          },
          {
            type: "paragraph",
            text: "Coelho (2014) inclui os pensadores Hobbes, Locke, Montesquieu e Rousseau na base desse pensamento, mas considera apenas Locke propriamente liberal. Para Coelho e Salles (2015), liberalismo e marxismo, este ligado aos socialismos e ao comunismo, são fundamentos teóricos que orientam a ação da maior parte dos grupos políticos em disputa nas sociedades ocidentais.",
            sources: ["pnap-estado-governo-mercado", "pnap-ciencia-politica"],
          },
          { type: "heading", text: "Ideias centrais" },
          {
            type: "quote",
            text: "a função do Estado é a de garantir a segurança, a liberdade e a propriedade dos indivíduos",
            sourceKey: "pnap-ciencia-politica",
            locator: "p. 53 (síntese)",
          },
          {
            type: "paragraph",
            text: "A síntese é de Coelho e Salles (2015). Coelho (2014) associa o Estado liberal clássico ao chamado Estado mínimo: a organização política que interviria apenas no “estritamente necessário para garantir a liberdade e igualdade dos cidadãos”, deixando as demais dimensões da vida social a cargo da regulação do mercado, isto é, das relações de compra e venda. O título da lição resume essa ideia como limites ao poder.",
            sources: ["pnap-ciencia-politica", "pnap-estado-governo-mercado"],
          },
          {
            type: "paragraph",
            text: "Os direitos individuais, isto é, os de cada pessoa, são tema do curso sobre liberalismo do Instituto Legislativo Brasileiro (ILB), do Senado, ao lado de liberalismo e democracia e do argumento neoliberal. A Constituição de 1988 também trata desses direitos: o art. 5º garante a brasileiros e a estrangeiros residentes no país o direito à vida, à liberdade, à igualdade, à segurança e à propriedade e acrescenta que a propriedade atenderá a sua função social, expressão que o trecho não define.",
            sources: ["ilb-doutrina-liberalismo", "cf88-art5"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "Segundo Coelho (2014), o Estado de bem-estar social sucedeu o Estado liberal, intervindo no mercado com políticas públicas, isto é, ações do poder público, para assegurar um patamar mínimo de igualdade social e de bem-estar; isso levou o próprio pensamento liberal a rever seus modelos de referência. Moraes (2014) organiza a trajetória do Estado em três etapas: Estado Liberal, Estado Social e Estado Democrático de Direito. O renascimento das ideias liberais nos anos 1970 e 1980, que Coelho associa aos governos de Margaret Thatcher, no Reino Unido, e Ronald Reagan, nos Estados Unidos, recebeu o nome de neoliberalismo. O acervo registra ainda O Federalista, de Hamilton, Madison e Jay, como texto da tradição liberal e federalista, isto é, favorável à federação.",
            sources: ["pnap-estado-governo-mercado", "ril-204-estado-liberal-estado-democratico", "camara-bd-federalista-1840"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "Há debates dentro da própria tradição. Silva Júnior (2014) descreve, na teoria liberal contemporânea, uma tensão entre liberdade e igualdade. Na leitura de Rawls apresentada pelo autor, “é preciso corrigir, ao menos em parte, a desigualdade decorrente da distribuição desigual de talentos e habilidades”, por exemplo tributando heranças. Para Nozick, a sociedade ideal maximiza a liberdade de seus membros, e a distribuição do que é produzido segue o valor que as pessoas atribuem às ações e aos serviços de cada um. Coelho (2014) registra que neoliberalismo e neoliberal foram empregados “sempre que a intenção fosse atacar e destratar o interlocutor”. Já Simão, Rodovalho e Teodoro (2023) atribuem a crise da democracia liberal, no Brasil e no mundo, a descontentamentos econômicos e culturais.",
            sources: ["ufal-ciencia-politica-3", "pnap-estado-governo-mercado", "ril-240-democracia-liberal-encruzilhada"],
          },
          {
            type: "limit",
            title: "Críticas de outras correntes",
            text: "O acervo desta lição não reúne críticas ao liberalismo feitas por autores de outras correntes; os debates acima vêm de livros didáticos e de um artigo que tratam da corrente.",
          },
          {
            type: "example",
            title: "Situação hipotética: dois pedidos à prefeitura de Serra Clara",
            text: "Na cidade fictícia de Serra Clara, moradores pedem à prefeitura duas coisas: mais iluminação e vigilância numa feira de rua e um restaurante municipal com refeições a preço baixo. Com o conceito de Estado mínimo descrito por Coelho (2014), a pergunta é: cada medida é estritamente necessária para garantir a liberdade e a igualdade dos cidadãos, ou pode ficar a cargo do mercado? Com o Estado de bem-estar social, descrito pelo mesmo autor, a pergunta muda: a medida ajuda a assegurar um padrão mínimo de bem-estar? O exemplo mostra como cada conceito organiza a pergunta; não indica qual resposta é a certa.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "Do curso do ILB, o acervo traz só a ementa; do artigo de Moraes (2014), só o sumário, sem detalhar as etapas. O acervo não reproduz trechos de O Federalista nem descreve medidas dos governos de Thatcher e Reagan. As fontes não definem democracia liberal nem função social da propriedade. Esta lição não classifica a Constituição de 1988 como liberal ou de outra corrente: os trechos citados apenas listam direitos.",
          },
        ],
        relatedConcepts: [
          {
            term: "Jusnaturalismo",
            explanation:
              "Corrente filosófica que, segundo Coelho (2014), predominou na Europa nos séculos XVII e XVIII e tem o indivíduo por ponto de partida; para Coelho e Salles (2015), é o fundamento do liberalismo.",
          },
          {
            term: "Estado de bem-estar social",
            explanation:
              "Segundo Coelho (2014), o modelo que sucede o Estado liberal e intervém no mercado por meio de políticas públicas para assegurar um patamar mínimo de igualdade social e de bem-estar.",
          },
          {
            term: "Neoliberalismo",
            explanation:
              "Nome dado ao renascimento das ideias liberais nos anos 1970 e 1980, segundo Coelho (2014), que também registra o uso do termo para atacar interlocutores.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho e Salles (2015), qual é o ponto de partida do jusnaturalismo, corrente em que o liberalismo se funda?",
            options: [
              { id: "a", text: "O indivíduo." },
              { id: "b", text: "O Estado." },
              { id: "c", text: "A continuidade entre o passado e o futuro." },
            ],
            correctOptionId: "a",
            explanation:
              "Para os autores, o jusnaturalismo tem o indivíduo por ponto de partida. O Estado aparece depois, com a função de garantir a segurança, a liberdade e a propriedade dos indivíduos; por isso ele não é o ponto de partida. A continuidade entre o passado e o futuro é o centro da definição de conservadorismo vista na próxima lição.",
          },
          {
            id: "q2",
            prompt: "No livro de Coelho (2014), o que a expressão Estado mínimo designa?",
            options: [
              {
                id: "a",
                text: "Uma organização política que interviria apenas no estritamente necessário para garantir a liberdade e a igualdade dos cidadãos, deixando o restante à regulação do mercado.",
              },
              { id: "b", text: "Um Estado que intervém no mercado por meio de políticas públicas para assegurar um patamar mínimo de igualdade social e de bem-estar." },
              { id: "c", text: "A ausência de Estado: não haveria leis, governo nem qualquer função pública." },
            ],
            correctOptionId: "a",
            explanation:
              "Coelho (2014) associa o Estado mínimo ao Estado liberal clássico, que intervém só no estritamente necessário. A alternativa b descreve o Estado de bem-estar social, que, segundo o autor, sucedeu o Estado liberal. A alternativa c confunde mínimo com inexistente: na síntese de Coelho e Salles (2015), o Estado tem funções, como garantir segurança, liberdade e propriedade.",
          },
          {
            id: "q3",
            prompt: "Na apresentação de Silva Júnior (2014), como Rawls e Nozick se posicionam na tensão entre liberdade e igualdade?",
            options: [
              {
                id: "a",
                text: "Rawls admite corrigir, ao menos em parte, desigualdades de talentos e habilidades; Nozick considera ideal a sociedade que maximiza a liberdade.",
              },
              { id: "b", text: "Rawls considera ideal a sociedade que maximiza a liberdade; Nozick propõe tributar heranças." },
              { id: "c", text: "Os dois pensam igual, porque pertencem à mesma tradição." },
            ],
            correctOptionId: "a",
            explanation:
              "Silva Júnior apresenta os dois autores como respostas diferentes dentro da teoria liberal contemporânea. A alternativa b inverte as posições: é na leitura de Rawls que aparece a correção de parte das desigualdades, por exemplo tributando heranças. A alternativa c ignora as variações internas, que são a razão do plural liberalismos no título.",
          },
        ],
      },
      sources: [
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta que o liberalismo se funda no jusnaturalismo, que tem o indivíduo por ponto de partida, e defende a liberdade e a propriedade individuais; a citação sobre a função do Estado (p. 53); e a leitura dos autores de que liberalismo e marxismo orientam a ação da maior parte dos grupos políticos em disputa nas sociedades ocidentais (p. 43), com o marxismo ligado ao socialismo e ao comunismo.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta o predomínio do jusnaturalismo na Europa nos séculos XVII e XVIII (p. 29) e o indivíduo como origem do direito; Hobbes, Locke, Montesquieu e Rousseau na base do pensamento liberal, com só Locke propriamente liberal; o Estado liberal clássico como Estado mínimo (p. 75); o Estado de bem-estar social e a revisão de paradigmas no pensamento liberal (p. 86); o neoliberalismo, Thatcher e Reagan e o uso dos termos para atacar o interlocutor (p. 98).",
        },
        {
          key: "ilb-doutrina-liberalismo",
          supports:
            "Sustenta que o Instituto Legislativo Brasileiro, do Senado, oferece curso sobre a doutrina liberal cuja ementa trata de liberalismo e democracia, do argumento neoliberal e dos direitos individuais.",
        },
        {
          key: "cf88-art5",
          supports:
            "Sustenta que o art. 5º garante a brasileiros e a estrangeiros residentes no país o direito à vida, à liberdade, à igualdade, à segurança e à propriedade e que a propriedade atenderá a sua função social.",
        },
        {
          key: "ril-204-estado-liberal-estado-democratico",
          supports: "Sustenta, pelo sumário do artigo, a organização da trajetória do Estado em Estado Liberal, Estado Social e Estado Democrático de Direito, como interpretação do autor.",
        },
        {
          key: "camara-bd-federalista-1840",
          supports:
            "Sustenta que O Federalista reúne artigos de Alexander Hamilton, James Madison e John Jay e, pela nota de escopo, que é texto primário da tradição liberal e federalista, sem trechos reproduzidos no acervo.",
        },
        {
          key: "ufal-ciencia-politica-3",
          supports:
            "Sustenta a tensão entre liberdade e igualdade na teoria liberal contemporânea: na leitura de Rawls, corrigir ao menos em parte a desigualdade de talentos e habilidades, por exemplo tributando heranças; para Nozick, a sociedade ideal maximiza a liberdade, com distribuição conforme o valor atribuído às ações e aos serviços.",
        },
        {
          key: "ril-240-democracia-liberal-encruzilhada",
          supports:
            "Sustenta a interpretação dos autores de que a crise da democracia liberal, no Brasil e no mundo, se deve a questões estruturais, como descontentamentos econômicos e culturais.",
        },
      ],
    },
    {
      slug: "conservadorismos",
      number: 2,
      title: "Conservadorismos: tradição, instituições e mudança gradual",
      objective: "Identificar as ideias centrais atribuídas ao conservadorismo, suas variações e os debates que as fontes registram.",
      minutes: 6,
      currentKeys: ["conservadorismos"],
      content: {
        intro:
          "Esta lição apresenta ideias do conservadorismo tal como aparecem em uma obra sobre o Império, um artigo acadêmico e um livro didático do acervo da Polis. O plural do título, conservadorismos, indica que as fontes registram variações dentro da própria corrente. A lição descreve essas ideias; não avalia se são certas ou erradas.",
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
            text: "Em artigo publicado no portal de periódicos da Universidade Federal de Minas Gerais (UFMG), Defina (2023) aponta Edmund Burke como fundador das bases do pensamento conservador clássico. Segundo o autor, essas bases estão na manutenção de determinadas instituições e tradições do passado. As duas fontes destacam, assim, as comunidades e aquilo que elas trazem do passado.",
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
            text: "A frase não rejeita toda mudança: estabelece uma condição para que ela seja justa e válida. O centro da ideia é a continuidade, a ligação entre o que uma comunidade foi e o que será; o título da lição resume essa condição como mudança gradual. A leitura de Defina (2023) sobre Burke acrescenta a manutenção de determinadas instituições e tradições.",
            sources: ["camara-bd-torres-construtores-imperio", "ufmg-temporalidades-pensamento-conservador"],
          },
          { type: "heading", text: "Variações" },
          {
            type: "paragraph",
            text: "Defina (2023) sustenta que o pensamento conservador no Brasil tem especificidades em relação ao conservadorismo clássico europeu. Segundo o autor, o conservadorismo brasileiro inicial, de que José da Silva Lisboa é um exemplo, conciliou o liberalismo econômico, ou seja, ideias liberais sobre a economia, com a manutenção do sistema escravocrata, diferindo nesse ponto do modelo europeu. Já a obra de Torres estuda os ideais e as lutas do Partido Conservador brasileiro no Império (1822–1889).",
            sources: ["ufmg-temporalidades-pensamento-conservador", "camara-bd-torres-construtores-imperio"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "As fontes registram leituras sobre a relação entre conservadorismo e liberalismo. Coelho e Salles (2015) sustentam que, ao longo do século XIX, o liberalismo se impôs completamente ao pensamento conservador, varrendo-o do cenário político e reorganizando as sociedades europeias conforme os seus princípios. Já para Defina (2023), como visto acima, o conservadorismo brasileiro inicial se combinou com o liberalismo econômico. São interpretações dos autores sobre lugares diferentes: a Europa e o Brasil.",
            sources: ["pnap-ciencia-politica", "ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "limit",
            title: "Críticas de outras correntes",
            text: "O acervo desta lição não reúne críticas ao conservadorismo feitas por autores de outras correntes; os debates acima vêm de um livro didático e de um artigo que tratam da corrente.",
          },
          {
            type: "example",
            title: "Situação hipotética: a reforma do mercado municipal de Serra Clara",
            text: "Na cidade fictícia de Serra Clara, o prédio centenário do mercado municipal precisa de reforma. Uma proposta demole o prédio e constrói outro, com novo uso; outra reforma por etapas e mantém as bancas e a feira de sábado. Com a definição adotada por Torres, a pergunta é: a mudança mantém ou quebra a continuidade entre o passado e o futuro da cidade? Com a leitura de Defina (2023) sobre Burke, surge outra: quais instituições e tradições locais estão em jogo? Nenhuma das perguntas rejeita a reforma. O exemplo mostra como o conceito organiza a pergunta; não indica qual proposta é a certa.",
            sources: ["camara-bd-torres-construtores-imperio", "ufmg-temporalidades-pensamento-conservador"],
          },
          {
            type: "comparison",
            title: "Liberalismos e conservadorismos: ponto de partida",
            intro:
              "Os dois quadros seguem o mesmo roteiro: de onde a corrente parte, o que procura proteger, que variação as fontes registram e qual é o limite da descrição.",
            orderNote: "Mesma ordem das lições do módulo.",
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
            type: "limit",
            title: "Limites deste recorte",
            text: "Para o conservadorismo, o acervo reúne a descrição de uma obra, um artigo de revista universitária e uma menção histórica em livro didático; os livros de Coelho (2014) e de Coelho e Salles (2015) não tratam a corrente em seção própria. Não há trechos de Burke nem de autores conservadores brasileiros, nem descrição de outras vertentes ou de experiências de governo. A comparação usa um único critério e não esgota as diferenças entre as correntes.",
          },
        ],
        relatedConcepts: [
          {
            term: "Conservadorismo clássico",
            explanation: "Pensamento cujas bases, segundo Defina (2023), Edmund Burke fundou na manutenção de determinadas instituições e tradições do passado.",
          },
          {
            term: "Partido Conservador",
            explanation:
              "Partido brasileiro do período do Império (1822–1889) cujos ideais e lutas são tema da obra de João Camilo de Oliveira Torres republicada pela Câmara dos Deputados.",
          },
          {
            term: "Continuidade",
            explanation: "Na definição adotada por Torres, a ligação entre o passado e o futuro que as mudanças sociais não podem quebrar para serem justas e válidas.",
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
            prompt: "Segundo a tese de Defina (2023), o que diferenciou o conservadorismo brasileiro inicial do modelo europeu?",
            options: [
              { id: "a", text: "Ter conciliado o liberalismo econômico com a manutenção do sistema escravocrata." },
              { id: "b", text: "Ter sido fundado por Edmund Burke." },
              { id: "c", text: "Não ter nenhuma relação com ideias liberais." },
            ],
            correctOptionId: "a",
            explanation:
              "Para Defina, o conservadorismo brasileiro inicial, de que José da Silva Lisboa é um exemplo, conciliou o liberalismo econômico com a manutenção do sistema escravocrata; por isso a alternativa c não corresponde à tese. Burke é apontado pelo autor como fundador das bases do conservadorismo clássico, o modelo europeu com o qual ele compara o caso brasileiro. Trata-se de uma interpretação do autor.",
          },
          {
            id: "q3",
            prompt: "No quadro comparativo do fim da lição, qual ponto de partida é atribuído a cada corrente?",
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
          key: "camara-bd-torres-construtores-imperio",
          supports:
            "Sustenta a definição de conservadorismo adotada por Torres (a existência das comunidades está sujeita a certas condições; mudanças justas e válidas não quebram a continuidade entre passado e futuro), a citação da descrição e o tema da obra republicada pela Câmara: ideais e lutas do Partido Conservador brasileiro no Império (1822–1889).",
        },
        {
          key: "ufmg-temporalidades-pensamento-conservador",
          supports:
            "Sustenta a interpretação de Defina (2023): Burke como fundador das bases do pensamento conservador clássico na manutenção de instituições e tradições; e a tese de que o conservadorismo brasileiro inicial, como o de José da Silva Lisboa, conciliou liberalismo econômico com a manutenção do sistema escravocrata, diferindo do modelo europeu.",
        },
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta a leitura dos autores de que, ao longo do século XIX, o liberalismo se impôs ao pensamento conservador na Europa (p. 42) e, no quadro comparativo, que o liberalismo se funda no jusnaturalismo, com o indivíduo por ponto de partida, e atribui ao Estado garantir segurança, liberdade e propriedade; pela nota de escopo, o conservadorismo aparece no livro só em menção histórica.",
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
