import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloLiberalismos: SeedModule = {
  slug: "liberalismos",
  number: 5,
  title: "Liberalismos",
  summary:
    "Os liberalismos segundo as fontes do acervo: o indivíduo, os direitos e os limites ao poder, a aproximação com a democracia, o debate em torno de Keynes e o renascimento liberal chamado de neoliberalismo.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "individuo-direitos-e-limites-ao-poder",
      number: 1,
      title: "Liberalismos: indivíduo, direitos e limites ao poder",
      objective: "Identificar as ideias centrais atribuídas ao liberalismo, suas variações e os debates que as fontes registram.",
      minutes: 6,
      currentKeys: ["liberalismos"],
      reviewedOn: REVISED_ON,
      previous: { module: "liberalismos-e-conservadorismos", lesson: "liberalismos" },
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
            text: "Segundo Coelho (2014), o Estado de bem-estar social sucedeu o Estado liberal, intervindo no mercado com políticas públicas, isto é, ações do poder público, para assegurar um patamar mínimo de igualdade social e de bem-estar; isso levou o próprio pensamento liberal a rever seus modelos de referência. Moraes (2014) organiza a trajetória do Estado em três etapas: Estado Liberal, Estado Social e Estado Democrático de Direito. O renascimento das ideias liberais nos anos 1970 e 1980, que Coelho associa aos governos de Margaret Thatcher, no Reino Unido, e Ronald Reagan, nos Estados Unidos, recebeu o nome de neoliberalismo, tema da próxima lição. O acervo registra ainda O Federalista, de Hamilton, Madison e Jay, como texto da tradição liberal e federalista, isto é, favorável à federação.",
            sources: ["pnap-estado-governo-mercado", "ril-204-estado-liberal-estado-democratico", "camara-bd-federalista-1840"],
          },
          { type: "heading", text: "Críticas e debates" },
          {
            type: "paragraph",
            text: "Há debates dentro da própria tradição. Silva Júnior (2014) descreve, na teoria liberal contemporânea, uma tensão entre liberdade e igualdade. Na leitura de Rawls apresentada pelo autor, “é preciso corrigir, ao menos em parte, a desigualdade decorrente da distribuição desigual de talentos e habilidades”, por exemplo tributando heranças. Para Nozick, a sociedade ideal maximiza a liberdade de seus membros, e a distribuição do que é produzido segue o valor que as pessoas atribuem às ações e aos serviços de cada um; o debate volta no módulo Libertarianismos. Coelho (2014) registra que neoliberalismo e neoliberal foram empregados “sempre que a intenção fosse atacar e destratar o interlocutor”. Já Simão, Rodovalho e Teodoro (2023) atribuem a crise da democracia liberal, no Brasil e no mundo, a descontentamentos econômicos e culturais.",
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
            text: "Do curso do ILB, o acervo traz só a ementa; do artigo de Moraes (2014), só o sumário, sem detalhar as etapas. O acervo não reproduz trechos de O Federalista nem descreve medidas específicas dos governos de Thatcher e Reagan. As fontes não definem democracia liberal nem função social da propriedade. Esta lição não classifica a Constituição de 1988 como liberal ou de outra corrente: os trechos citados apenas listam direitos.",
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
              "Para os autores, o jusnaturalismo tem o indivíduo por ponto de partida. O Estado aparece depois, com a função de garantir a segurança, a liberdade e a propriedade dos indivíduos; por isso ele não é o ponto de partida. A continuidade entre o passado e o futuro é o centro da definição de conservadorismo vista no módulo Conservadorismos.",
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
      slug: "democracia-keynes-e-neoliberalismo",
      number: 2,
      title: "Liberalismos: democracia, Keynes e neoliberalismo",
      objective:
        "Relacionar o liberalismo à democracia, ao debate econômico em torno de Keynes e ao chamado neoliberalismo, separando as descrições dos livros didáticos dos usos polêmicos dos termos.",
      minutes: 7,
      currentKeys: ["liberalismos"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "O liberalismo mudou ao longo do tempo. Esta lição acompanha três momentos descritos em dois livros didáticos públicos do acervo, de Ricardo Corrêa Coelho e Helena da Motta Salles (2015) e de Coelho (2014): a aproximação entre liberalismo e democracia, o debate econômico em torno de John Maynard Keynes e o renascimento das ideias liberais chamado de neoliberalismo. São interpretações dos autores. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "Liberalismo e democracia" },
          {
            type: "paragraph",
            text: "Segundo Coelho e Salles (2015), “durante muito tempo, liberalismo e democracia foram vistos como princípios inconciliáveis”. Os autores registram, porém, que a teoria jusnaturalista, base do liberalismo vista na lição anterior, preparou o terreno para a democracia:",
            sources: ["pnap-ciencia-politica"],
          },
          {
            type: "quote",
            text: "Ao romper com o Direito divino e introduzir as noções de representação e soberania popular como bases de qualquer regime político legítimo, a teoria jusnaturalista abriu caminho para o surgimento da democracia dois séculos mais tarde.",
            sourceKey: "pnap-ciencia-politica",
            locator: "p. 51",
          },
          {
            type: "paragraph",
            text: "Direito divino é a ideia de que o poder do governante vem de Deus; soberania popular, a de que o poder emana do povo, princípio que a Constituição de 1988 adota no art. 1º. Para os autores, na virada do século XIX para o XX, os países que tinham o liberalismo como referência tornaram-se democracias, mas “um longo percurso teria de ser percorrido” até que a democracia fosse admitida pelos liberais. Coelho (2014) acrescenta que, no século XX, os liberais precisaram explicar duas mudanças que desafiavam a interpretação liberal do século anterior: a compatibilidade entre democracia e economia de mercado e a convivência entre esta e a crescente intervenção do Estado na economia.",
            sources: ["pnap-ciencia-politica", "cf88-art1", "pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Keynes e seus críticos" },
          {
            type: "paragraph",
            text: "No campo da economia, Coelho (2014) apresenta o pensamento do inglês John Maynard Keynes (1883–1946) como predominante no pós-guerra. Para Keynes, o capitalismo não funcionaria no máximo de sua eficiência regulado apenas pelas leis do mercado. Nas recessões, o Estado deveria agir como agente anticíclico, isto é, contra a fase de queda do ciclo econômico: reduzir os juros básicos e aumentar o investimento público em infraestrutura e obras, estimulando as empresas a investir e a criar empregos. Keynes admitia que, no longo prazo, o mercado ajustaria a economia, mas via nas recessões um problema de curto prazo, pois, na frase que o autor chama de célebre, “a longo prazo, todos estaremos mortos”. Segundo Coelho, essa posição não foi unânime entre os liberais:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Embora predominante, a posição de Keynes nunca foi consensual no meio liberal, encontrando a oposição de alguns importantes economistas, como o austríaco Friedrich von Hayek (1899-1992) e o americano Milton Friedman (1912–2006), que se mantiveram fiéis aos princípios do liberalismo econômico clássico e firmes na convicção de que ao Estado basta ter uma política monetária austera para que os mecanismos de mercado façam os ajustes necessários à economia.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 62",
          },
          {
            type: "paragraph",
            text: "Política monetária é o conjunto de decisões do governo sobre a moeda e os juros. Coelho (2014) liga a proposta de Keynes também à criação de instituições internacionais de coordenação econômica, adotada na conferência de Bretton Woods, em 1944, que deu origem ao Banco Mundial e ao Fundo Monetário Internacional (FMI).",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "O neoliberalismo" },
          {
            type: "paragraph",
            text: "Com a crise dos anos 1970, tratada no módulo Social-democracia, as ideias liberais ressurgiram com força. Segundo Coelho (2014), esse renascimento “convencionou-se chamar de neoliberalismo” e foi protagonizado pelos governos de Margaret Thatcher, no Reino Unido (1979–1990), e de Ronald Reagan, nos Estados Unidos (1981–1989). A agenda neoliberal, diz o autor, se apoiava em um tripé: desregulamentação, privatizações e abertura dos mercados. Seus defensores argumentavam que o excesso de regras estatais inibia o investimento privado, que as leis trabalhistas do Estado de bem-estar inibiam contratações, que as empresas estatais eram ineficientes e deficitárias e que a concorrência internacional modernizaria a economia. Para o autor, porém, não se tratou de simples volta ao passado:",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "quote",
            text: "Ao examinar essa agenda, percebemos que não se trata de um mero retorno aos “velhos e bons” princípios liberais, havendo algo de realmente novo – que justificaria o prefixo “neo” – diferenciando-a da agenda liberal que resultaria na formação do Estado liberal no século XIX.",
            sourceKey: "pnap-estado-governo-mercado",
            locator: "p. 100",
          },
          {
            type: "paragraph",
            text: "Segundo Coelho, os liberais do século XIX queriam que o Estado deixasse de intervir nas relações econômicas, para que o mercado funcionasse como mecanismo autorregulador, e recusavam até a assistência pública aos mais pobres; a exceção eram as workhouses inglesas, casas que acolhiam quem não conseguia se sustentar. Os neoliberais, ao contrário, admitiam que os mercados precisam de regulação e criticavam o excesso dela em esferas como o mercado de trabalho. E as políticas sociais “manteriam seu lugar na agenda do Estado como direitos de cidadania”: umas temporárias e focadas nos mais pobres, como a transferência de renda e o seguro-desemprego; outras universais, como educação e saúde públicas.",
            sources: ["pnap-estado-governo-mercado"],
          },
          { type: "heading", text: "Um termo em disputa" },
          {
            type: "paragraph",
            text: "O próprio nome é disputado. Coelho (2014) observa que, nos anos 1990, as palavras neoliberalismo e globalização foram repetidas em jornais e discursos “sem que, no entanto, se lhes conferisse um conteúdo preciso”, e que neoliberalismo e neoliberal foram empregados “sempre que a intenção fosse atacar e destratar o interlocutor”. O autor propõe despir essas palavras de suas conotações valorativas e fazer uma análise descritiva. Ele avalia, ainda, que onde as reformas ocorreram houve aumento das disparidades de renda entre ricos e pobres; é uma avaliação dele, que o trecho não detalha com dados.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "example",
            title: "Situação hipotética: a companhia de água de Vale Alto",
            text: "No país fictício de Vale Alto, o governo propõe vender a companhia estatal de água. Um grupo argumenta que a empresa é ineficiente e deficitária e que a venda liberaria recursos para educação e saúde; outro se coloca “na defesa do Estado e dos direitos dos menos favorecidos”, expressão com que Coelho (2014) descreve um dos lados do debate dos anos 1990. Os conceitos da lição ajudam a identificar os argumentos: o primeiro grupo repete os que o autor atribui aos defensores das privatizações. Chamar um dos lados de neoliberal, porém, não resolve a discussão, já que o termo, segundo o mesmo autor, foi muitas vezes usado para atacar o interlocutor. A situação não indica qual decisão é melhor nem prevê seus efeitos.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "A lição se apoia em dois livros didáticos que resumem autores como Keynes, Hayek e Friedman, cujas obras não estão no acervo. A agenda neoliberal aparece descrita de forma geral, sem medidas específicas de cada governo nem dados sobre seus resultados. O acervo não reúne textos de defensores ou de críticos do neoliberalismo além dessa descrição; por isso, a lição não os resume.",
          },
        ],
        relatedConcepts: [
          {
            term: "Soberania popular",
            explanation:
              "Princípio de que o poder emana do povo; segundo Coelho e Salles (2015), a teoria jusnaturalista o introduziu como base de qualquer regime político legítimo.",
          },
          {
            term: "Agente anticíclico",
            explanation:
              "Na leitura de Keynes apresentada por Coelho (2014), papel do Estado nas recessões: reduzir juros e ampliar o investimento público para estimular a economia.",
          },
          {
            term: "Neoliberalismo",
            explanation:
              "Segundo Coelho (2014), nome dado ao renascimento das ideias liberais nos anos 1970 e 1980, com agenda baseada em desregulamentação, privatizações e abertura dos mercados.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo Coelho e Salles (2015), como liberalismo e democracia foram vistos durante muito tempo?",
            options: [
              { id: "a", text: "Como princípios inconciliáveis; a democracia só foi admitida pelos liberais depois de um longo percurso." },
              { id: "b", text: "Como sinônimos, desde o século XVII." },
              { id: "c", text: "Como ideias que nunca se aproximaram." },
            ],
            correctOptionId: "a",
            explanation:
              "Os autores afirmam que os dois foram vistos por muito tempo como inconciliáveis, mas que a teoria jusnaturalista abriu caminho para a democracia e que, na virada do século XIX para o XX, os países liberais se tornaram democracias. Por isso, as alternativas b e c contrariam o texto.",
          },
          {
            id: "q2",
            prompt: "Para Keynes, segundo Coelho (2014), o que o Estado deveria fazer nas recessões?",
            options: [
              { id: "a", text: "Esperar, porque o mercado se ajustaria sozinho no curto prazo." },
              { id: "b", text: "Agir como agente anticíclico, reduzindo os juros e ampliando o investimento público." },
              { id: "c", text: "Controlar todo o processo produtivo." },
            ],
            correctOptionId: "b",
            explanation:
              "Para Keynes, o problema das recessões era de curto prazo, e o Estado deveria estimular os investimentos. A alternativa a contraria a frase célebre do economista: o ajuste do mercado viria no longo prazo, e a longo prazo todos estaremos mortos. A alternativa c corresponde ao Estado socialista descrito pelo mesmo autor, tema do módulo Socialismos.",
          },
          {
            id: "q3",
            prompt: "Segundo Coelho (2014), o que diferencia a agenda neoliberal da agenda liberal do século XIX?",
            options: [
              {
                id: "a",
                text: "Os neoliberais admitiam a regulação dos mercados, criticavam o seu excesso e mantinham as políticas sociais como direitos de cidadania.",
              },
              { id: "b", text: "Os neoliberais recusavam toda assistência pública aos mais pobres." },
              { id: "c", text: "Não há diferença: é um retorno puro aos princípios do século XIX." },
            ],
            correctOptionId: "a",
            explanation:
              "Para o autor, não se trata de mero retorno aos princípios liberais: os neoliberais criticavam o excesso de intervenção em certas esferas, e não a intervenção em geral. A recusa da assistência pública, da alternativa b, é atribuída pelo autor aos liberais do século XIX. A alternativa c contraria o próprio trecho citado na lição.",
          },
        ],
      },
      sources: [
        {
          key: "pnap-ciencia-politica",
          supports:
            "Sustenta, como interpretação dos autores, a visão de liberalismo e democracia como princípios inconciliáveis, o papel da teoria jusnaturalista na origem da democracia, citado literalmente, e o longo percurso até que os liberais admitissem a democracia (p. 51).",
        },
        {
          key: "cf88-art1",
          supports: "Sustenta que, pela Constituição de 1988, todo o poder emana do povo.",
        },
        {
          key: "pnap-estado-governo-mercado",
          supports:
            "Sustenta, como interpretação do autor: os desafios dos liberais no século XX e o pensamento de Keynes como predominante no pós-guerra (p. 61); a frase de Keynes sobre o longo prazo, Bretton Woods e a oposição de Hayek e Friedman, citada literalmente (p. 61–62); o neoliberalismo, Thatcher e Reagan, o uso polêmico dos termos, a defesa dos menos favorecidos e a proposta de análise descritiva (p. 98–99); o tripé e os argumentos da agenda (p. 99–100); a diferença em relação ao liberalismo do século XIX, citada literalmente, e as workhouses (p. 100); a regulação dos mercados, as políticas sociais e o aumento das disparidades de renda (p. 101).",
        },
      ],
    },
  ],
};
