import { REVISED_ON } from "../publishers";
import type { SeedModule } from "./types";

export const moduloLibertarianismos: SeedModule = {
  slug: "libertarianismos",
  number: 11,
  title: "Libertarianismos",
  summary:
    "Os libertarianismos segundo as fontes do acervo: a concepção de justiça em que o Estado só atua corretivamente, a ideia de Estado mínimo e os debates sobre liberdade, igualdade, tributação e paternalismo libertário.",
  area: "IDEIAS",
  stage: "PERSPECTIVES",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "liberdade-individual-e-justica",
      number: 1,
      title: "Libertarianismos: liberdade individual e Estado mínimo",
      objective: "Reconhecer como as fontes do acervo descrevem a concepção libertária de justiça, a ideia de Estado mínimo e os debates sobre elas.",
      minutes: 6,
      currentKeys: ["libertarianismos"],
      reviewedOn: REVISED_ON,
      previous: { module: "anarquismos-e-libertarianismos", lesson: "libertarianismos" },
      content: {
        intro:
          "Esta lição apresenta o libertarianismo a partir de duas fontes do acervo: um artigo sobre a concepção libertária de justiça e um livro didático que define Estado mínimo. O plural “libertarianismos” indica que a corrente não é tratada como um bloco único, embora o acervo não documente suas variações internas. Os debates sobre liberdade, igualdade e tributação são tema da próxima lição. A lição descreve essas ideias, sem avaliá-las.",
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
            text: "Os trechos do acervo não distinguem vertentes do libertarianismo. Um livro sobre teoria democrática, de José Alexandre da Silva Júnior (2014), apresenta uma posição que põe a liberdade em primeiro plano, a de Robert Nozick, mas não usa o rótulo “libertarianismo”; essa posição e o debate em que ela aparece são tema da próxima lição.",
            sources: ["ufal-ciencia-politica-3"],
          },
          {
            type: "example",
            title: "Situação hipotética: o estacionamento municipal",
            text: "Numa cidade fictícia, a Câmara Municipal discute se a prefeitura deve continuar administrando o estacionamento do centro. Com a definição de Estado mínimo do livro de Coelho, a pergunta seria se administrar o estacionamento é “estritamente necessário para garantir a liberdade e igualdade dos cidadãos”. Se não for, a atividade ficaria a cargo da regulação do mercado. O conceito organiza a discussão, mas não a encerra: vereadores podem avaliar de modos diferentes o que é estritamente necessário. O exemplo não indica qual decisão é a certa.",
            sources: ["pnap-estado-governo-mercado"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo não traz textos de autores que se apresentem como libertários nem descreve vertentes da corrente. O livro de Coelho não trata da corrente em seção própria, e nenhuma fonte do acervo liga diretamente o libertarianismo à expressão “Estado mínimo”, usada no título. O artigo de Rocha e Galuppo aparece só pelo resumo, e o acervo não traz respostas de autores libertários às críticas registradas. O anarcocapitalismo também não tem fonte no acervo e não é definido aqui.",
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
            term: "Concepção de justiça",
            explanation: "Modo de entender o que é justo; segundo Rocha e Galuppo (2016), a do libertarianismo admite que o Estado atue apenas corretivamente.",
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
              "O artigo descreve o libertarianismo como uma concepção de justiça segundo a qual o Estado só pode atuar corretivamente: a ação do Estado é admitida, mas limitada. A alternativa b reproduz uma projeção de Bakunin, apresentada no módulo Anarquismos; confundir as duas correntes é o equívoco mais provável. A alternativa c contraria a própria descrição, que restringe a atuação do Estado.",
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
            prompt: "No exemplo do estacionamento municipal, por que o conceito de Estado mínimo não encerra a discussão?",
            options: [
              { id: "a", text: "Porque vereadores podem avaliar de modos diferentes o que é estritamente necessário." },
              { id: "b", text: "Porque o conceito proíbe a prefeitura de prestar qualquer serviço." },
              { id: "c", text: "Porque o conceito obriga a prefeitura a manter o estacionamento." },
            ],
            correctOptionId: "a",
            explanation:
              "O conceito organiza a pergunta, se a atividade é estritamente necessária para garantir a liberdade e a igualdade dos cidadãos, mas a resposta depende de avaliação. A alternativa b confunde mínimo com inexistente, e a c tira do conceito uma decisão que ele não oferece.",
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
            "Livro de Silva Júnior (2014): apresenta a posição de Nozick, que põe a liberdade em primeiro plano; pela nota de escopo, o livro não usa o rótulo “libertarianismo”.",
        },
        {
          key: "dominiopublico-bakunin-deus-e-o-estado",
          supports: "Usado na verificação: projeção de Bakunin de que não haverá necessidade de organização, direção e legislação políticas (p. 23).",
        },
      ],
    },
    {
      slug: "tributacao-e-paternalismo-libertario",
      number: 2,
      title: "Libertarianismos: Nozick, tributação e paternalismo libertário",
      objective:
        "Reconhecer como o acervo apresenta a posição de Nozick sobre distribuição e tributação, o impasse entre liberdade e igualdade e o debate sobre paternalismo libertário, separando a leitura dos autores das lacunas do acervo.",
      minutes: 7,
      currentKeys: ["libertarianismos"],
      reviewedOn: REVISED_ON,
      content: {
        intro:
          "Esta lição aprofunda dois debates ligados ao libertarianismo no acervo: a posição de Robert Nozick sobre distribuição e tributação, apresentada por José Alexandre da Silva Júnior (2014), e a dificuldade de pôr em prática a concepção libertária de justiça, discutida por Bruno Anunciação Rocha e Marcelo Campos Galuppo (2016). O livro de Silva Júnior não usa o rótulo libertarianismo; por isso, a lição não classifica Nozick como libertário. A lição descreve, sem avaliar.",
        blocks: [
          { type: "heading", text: "Nozick: liberdade e distribuição" },
          {
            type: "paragraph",
            text: "Silva Júnior apresenta Nozick entre os chamados revisionistas liberais, ao lado de John Rawls e Ronald Dworkin, autores que discutem o difícil equilíbrio entre liberdade e igualdade. Segundo o livro, Nozick acredita que “a sociedade ideal maximiza a liberdade de seus membros” e que, para isso, a distribuição do que é produzido deve seguir o “valor que as pessoas atribuem às ações e aos serviços de cada um”. Para ele, ainda segundo Silva Júnior, “qualquer princípio padronizado de distribuição tende a ser subvertido por atos voluntários de indivíduos isolados”. Princípio padronizado, aqui, é uma regra que fixa um padrão para dividir os bens; o trecho não dá exemplos. Daí a posição sobre impostos, nas palavras do livro:",
            sources: ["ufal-ciencia-politica-3"],
          },
          {
            type: "quote",
            text: "Na prática, a tributação, o confisco ou coisa que o valha para fim de um princípio distributivo significa obrigar pessoas a trabalhar certo tempo sem remuneração.",
            sourceKey: "ufal-ciencia-politica-3",
            locator: "p. 16",
          },
          {
            type: "paragraph",
            text: "Segundo o autor, para Nozick não há razão para a sociedade beneficiar quem prefere o lazer a trabalhar além do necessário. A posição contrasta com a de Rawls, que, na leitura do mesmo livro, considera preciso corrigir, ao menos em parte, a desigualdade decorrente de talentos e habilidades e recomenda taxar generosamente as heranças.",
            sources: ["ufal-ciencia-politica-3"],
          },
          {
            type: "comparison",
            title: "Rawls e Nozick na leitura de Silva Júnior (2014)",
            intro: "Os dois quadros seguem o mesmo roteiro: o valor posto em primeiro plano, o que isso implica para a distribuição e o limite do trecho.",
            orderNote: "Ordem em que o livro apresenta os autores.",
            items: [
              {
                label: "Rawls",
                heading: "Em primeiro plano: corrigir desigualdades",
                text: "O que defende: é preciso corrigir, ao menos em parte, a desigualdade decorrente da distribuição desigual de talentos e habilidades e neutralizar o impacto das heranças. Implicação: taxar generosamente as heranças. Limite: é um resumo de Silva Júnior, e a obra de Rawls não está no acervo.",
                sources: ["ufal-ciencia-politica-3"],
              },
              {
                label: "Nozick",
                heading: "Em primeiro plano: maximizar a liberdade",
                text: "O que defende: a sociedade ideal maximiza a liberdade de seus membros, e a distribuição segue o valor atribuído às ações e aos serviços de cada um. Implicação: tributar para fins distributivos equivale a obrigar pessoas a trabalhar certo tempo sem remuneração. Limite: é um resumo de Silva Júnior, que não usa o rótulo libertarianismo, e a obra de Nozick não está no acervo.",
                sources: ["ufal-ciencia-politica-3"],
              },
            ],
          },
          { type: "heading", text: "O impasse entre liberdade e igualdade" },
          {
            type: "paragraph",
            text: "Para Silva Júnior, os revisionistas deixam claro um impasse e não há consenso sobre qual dos dois valores deve ser maximizado: “a tentativa de minimizar as desigualdades não pode prescindir da supressão de parte da liberdade”, e “dificilmente consegue-se privilegiar a liberdade sem aumentar a tolerância com a desigualdade”. É a leitura do autor sobre o debate, não uma conclusão sobre qual valor deve prevalecer.",
            sources: ["ufal-ciencia-politica-3"],
          },
          { type: "heading", text: "Paternalismo libertário" },
          {
            type: "paragraph",
            text: "O artigo de Rocha e Galuppo (2016), publicado na Revista de Informação Legislativa, do Senado, parte de uma dificuldade apontada no resumo:",
            sources: ["ril-210-paternalismo-libertario"],
          },
          {
            type: "quote",
            text: "Apesar de o libertarianismo defender uma concepção de justiça segundo a qual o Estado só pode atuar corretivamente, há dificuldade em colocar essa concepção em prática",
            sourceKey: "ril-210-paternalismo-libertario",
            locator: "Resumo",
          },
          {
            type: "paragraph",
            text: "Os autores discutem o chamado paternalismo libertário, isto é, induzir comportamentos preservando a liberdade de escolha, e a noção de homo economicus, que apontam como importante para o libertarianismo; o acervo não traz a definição dessa noção. São interpretações dos autores, conhecidas aqui só pelo resumo do artigo.",
            sources: ["ril-210-paternalismo-libertario"],
          },
          {
            type: "example",
            title: "Situação hipotética: o imposto sobre heranças de Vale Alto",
            text: "No país fictício de Vale Alto, o Parlamento discute aumentar o imposto sobre heranças para financiar escolas. Os conceitos da lição ajudam a identificar os argumentos: na leitura de Silva Júnior, Rawls recomenda taxar generosamente as heranças, e Nozick vê a tributação para fins distributivos como obrigar pessoas a trabalhar certo tempo sem remuneração. O impasse descrito pelo autor aparece aqui: reduzir desigualdades suprime parte da liberdade, e privilegiar a liberdade aumenta a tolerância com a desigualdade. A situação não indica qual decisão é melhor nem quais efeitos o imposto teria.",
            sources: ["ufal-ciencia-politica-3"],
          },
          {
            type: "limit",
            title: "Limites deste recorte",
            text: "O acervo não traz textos de Nozick nem de autores que se apresentem como libertários: a posição dele chega por um resumo de Silva Júnior, em livro que não usa o rótulo libertarianismo, e o artigo de Rocha e Galuppo aparece só pelo resumo. O acervo também não traz respostas de autores libertários às críticas nem dados sobre os efeitos de impostos.",
          },
        ],
        relatedConcepts: [
          {
            term: "Revisionistas liberais",
            explanation: "Nome que Silva Júnior (2014) dá a Rawls, Dworkin e Nozick, autores que discutem o difícil equilíbrio entre liberdade e igualdade.",
          },
          {
            term: "Princípio padronizado de distribuição",
            explanation:
              "Regra que fixa um padrão para dividir os bens; segundo Silva Júnior (2014), Nozick considera que qualquer princípio desse tipo tende a ser subvertido por atos voluntários.",
          },
          {
            term: "Paternalismo libertário",
            explanation: "Ideia discutida por Rocha e Galuppo (2016): induzir comportamentos preservando a liberdade de escolha.",
          },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
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
              "Segundo Silva Júnior, Nozick acredita que a sociedade ideal maximiza a liberdade de seus membros. A alternativa b é a posição atribuída a Rawls, com quem Nozick é contraposto. A alternativa c é a descrição do libertarianismo feita por Rocha e Galuppo; o livro de Silva Júnior não usa o rótulo libertarianismo.",
          },
          {
            id: "q2",
            prompt: "Na leitura de Silva Júnior (2014), como Nozick vê a tributação para fins distributivos?",
            options: [
              { id: "a", text: "Como obrigar pessoas a trabalhar certo tempo sem remuneração." },
              { id: "b", text: "Como a melhor forma de maximizar a liberdade." },
              { id: "c", text: "Como forma de neutralizar o impacto das heranças." },
            ],
            correctOptionId: "a",
            explanation:
              "O livro resume assim a posição de Nozick: tributar para um princípio distributivo significa obrigar pessoas a trabalhar sem remuneração. A alternativa c corresponde à recomendação atribuída a Rawls, e a b contraria a própria posição de Nozick.",
          },
          {
            id: "q3",
            prompt: "Que impasse Silva Júnior (2014) identifica no debate entre os revisionistas liberais?",
            options: [
              { id: "a", text: "Liberdade e igualdade nunca entram em conflito." },
              { id: "b", text: "Reduzir desigualdades exige suprimir parte da liberdade, e privilegiar a liberdade aumenta a tolerância com a desigualdade." },
              { id: "c", text: "Todos os autores concordam sobre qual valor deve ser maximizado." },
            ],
            correctOptionId: "b",
            explanation:
              "Para o autor, não há consenso sobre qual dos dois valores deve ser maximizado, e cada escolha tem um custo para o outro valor. As alternativas a e c contrariam essa leitura. O livro descreve o impasse sem dizer qual valor deve prevalecer.",
          },
        ],
      },
      sources: [
        {
          key: "ufal-ciencia-politica-3",
          supports:
            "Livro de Silva Júnior (2014), com trechos curtos: os revisionistas liberais e o equilíbrio entre liberdade e igualdade (p. 15); a posição de Nozick sobre liberdade, distribuição, princípios padronizados e tributação, citada literalmente, e a de Rawls sobre talentos e heranças (p. 16); e o impasse entre liberdade e igualdade (p. 17). Pela nota de escopo, o livro não usa o rótulo “libertarianismo”.",
        },
        {
          key: "ril-210-paternalismo-libertario",
          supports:
            "Artigo acadêmico da Revista de Informação Legislativa (Senado, 2016), com interpretação dos autores: dificuldade de colocar em prática a concepção libertária de justiça, citada literalmente; discussão do paternalismo libertário (induzir comportamentos preservando a liberdade de escolha) e da noção de homo economicus, tida como cara ao libertarianismo.",
        },
      ],
    },
  ],
};
