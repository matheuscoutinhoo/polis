import type { SeedLesson } from "./types";

export const licaoCorrelacaoCausalidade: SeedLesson = {
  slug: "correlacao-e-causalidade",
  number: 2,
  title: "Correlação e causalidade",
  objective:
    "Explicar por que uma correlação, ou a melhora de um número depois de uma política pública, não basta para afirmar que a política causou o resultado.",
  minutes: 6,
  currentKeys: [],
  content: {
    intro:
      "Quando um número melhora depois de uma decisão pública, pode parecer que a decisão funcionou. Esta lição usa um guia oficial de avaliação de políticas públicas para mostrar por que essa conclusão exige mais do que o número: a diferença entre correlação e causalidade. Ela continua a lição anterior, sobre fatos, opiniões e checagem.",
    blocks: [
      { type: "heading", text: "Correlação não implica causalidade" },
      {
        type: "definition",
        term: "Correlação",
        text: "Relação estatística entre duas variáveis, isto é, duas características que podem ser medidas e mudar de valor, como o número de bibliotecas de uma cidade e as notas de seus alunos. Há correlação quando os valores de uma tendem a variar junto com os da outra.",
        sources: ["casacivil-guia-avaliacao-ex-post"],
      },
      {
        type: "quote",
        text: "A simples existência de uma relação estatística entre duas variáveis verificada através de correlação não implica uma relação causal entre as variáveis analisadas.",
        sourceKey: "casacivil-guia-avaliacao-ex-post",
        locator: "Boxe 2, p. 263",
      },
      {
        type: "paragraph",
        text: "Relação causal, ou causalidade, é aquela em que uma coisa provoca a outra. O trecho acima é de um guia da Casa Civil da Presidência da República, publicado em 2018. Segundo o guia, avaliar o impacto de uma política, isto é, o efeito que ela provoca, exige isolar esse efeito de outros fatores, como uma crise econômica, outras políticas ou tendências que já vinham ocorrendo.",
        sources: ["casacivil-guia-avaliacao-ex-post"],
      },
      { type: "heading", text: "O que teria acontecido sem a política" },
      {
        type: "quote",
        text: "Para se calcular o impacto de uma política sobre um beneficiário, é preciso observar, ao mesmo tempo, o que aconteceu com ele ao ser atendido pela política e o que teria acontecido se não tivesse participado.",
        sourceKey: "casacivil-guia-avaliacao-ex-post",
        locator: "Boxe 3, p. 264",
      },
      {
        type: "definition",
        term: "Contrafactual",
        text: "É a segunda parte dessa comparação: o que teria acontecido sem a política. Segundo o guia, o contrafactual não é observável e precisa ser estimado. Sem ele, não se atribui causalidade.",
        sources: ["casacivil-guia-avaliacao-ex-post"],
      },
      {
        type: "paragraph",
        text: "Por isso, o guia adverte que comparar só o antes e o depois do grupo atendido não fornece uma estimativa confiável do impacto. Comparar apenas atendidos e não atendidos também não basta. O problema é que “outros fatores além da política implementada podem estar ocasionando as diferenças observadas”. Estatísticas descritivas, números que descrevem a situação, como médias e percentuais, ajudam a compreender o contexto, mas não podem ser usadas para atribuir causalidade.",
        sources: ["casacivil-guia-avaliacao-ex-post"],
      },
      {
        type: "example",
        title: "Situação hipotética: o reforço escolar de Vale do Sabiá",
        text: "Os números são inventados. Em Vale do Sabiá, cidade fictícia, a prefeitura criou em 2025 um programa de aulas de reforço. Em 2026, a aprovação nas escolas municipais subiu de 80% para 86%, e um panfleto afirmou: “O programa fez a aprovação subir”. O aumento pode ser conferido nos registros das escolas; a causa exige outra verificação. Outros fatores podem ter influenciado o resultado: no mesmo ano, o governo do estado pode ter criado outro programa para os mesmos alunos, ou a aprovação pode vir subindo desde anos anteriores. Para medir o efeito do reforço, seria preciso estimar o contrafactual: qual teria sido a aprovação sem o programa. Sem isso, os dois números não mostram se o efeito foi grande, pequeno ou nulo.",
        sources: ["casacivil-guia-avaliacao-ex-post"],
      },
      { type: "heading", text: "Verificar antes de concluir" },
      {
        type: "paragraph",
        text: "O glossário do Programa de Combate à Desinformação do STF traz uma definição de conhecimento válido. É uma definição operacional, feita para o programa, e não um conceito acadêmico geral. No trecho a seguir, “reputa-se” quer dizer “considera-se”:",
        sources: ["stf-glossario-desinformacao"],
      },
      {
        type: "quote",
        text: "reputa-se válido o conhecimento baseado em informações confiáveis e passíveis de serem confirmadas a partir de verificações fáticas, conjunturais, documentais ou científicas",
        sourceKey: "stf-glossario-desinformacao",
        locator: "p. 9",
      },
      {
        type: "paragraph",
        text: "Uma afirmação de causa, como a do panfleto, também precisa ser confirmada. Para políticas públicas, segundo o guia da Casa Civil, isso exige uma avaliação de impacto, que estima o contrafactual.",
        sources: ["stf-glossario-desinformacao", "casacivil-guia-avaliacao-ex-post"],
      },
      {
        type: "paragraph",
        text: "A forma de apresentar os dados também pede atenção. Como visto na lição anterior, uma atividade do IBGE Educa, do Instituto Brasileiro de Geografia e Estatística, trata de identificar, em gráficos divulgados pela mídia, elementos que podem induzir a erros de leitura, como escalas inapropriadas e legendas não explicitadas corretamente. Esse material trata da leitura de gráficos, não de correlação e causalidade.",
        sources: ["ibge-educa-graficos-e-tabelas"],
      },
      {
        type: "limit",
        title: "Limites desta lição",
        text: "O acervo registra trechos da seção do guia da Casa Civil sobre causalidade em avaliação de impacto. A lição não apresenta os métodos usados para estimar o contrafactual nem ensina a calcular correlações. O exemplo é fictício e simplificado. A definição de conhecimento válido citada é a do programa do STF.",
      },
    ],
    relatedConcepts: [
      { term: "Variável", explanation: "Característica que pode ser medida e mudar de valor, como a taxa de aprovação das escolas de uma cidade." },
      { term: "Contrafactual", explanation: "O que teria acontecido sem a política; segundo o guia da Casa Civil, não é observável e precisa ser estimado." },
      {
        term: "Avaliação de impacto",
        explanation: "Avaliação que busca isolar o efeito de uma política de outros fatores, como crises econômicas, outras políticas e tendências.",
      },
      {
        term: "Estatísticas descritivas",
        explanation: "Números que descrevem uma situação; segundo o guia da Casa Civil, ajudam a compreender o contexto, mas não atribuem causalidade.",
      },
    ],
  },
  quiz: {
    questions: [
      {
        id: "q1",
        prompt:
          "Um levantamento mostra que, nas cidades com mais bibliotecas, as notas dos alunos são mais altas. Segundo o guia da Casa Civil, o que essa relação estatística permite concluir sozinha?",
        options: [
          { id: "a", text: "Que as bibliotecas aumentam as notas." },
          { id: "b", text: "Que há uma correlação, o que não implica, por si só, uma relação causal." },
          { id: "c", text: "Que as bibliotecas não influenciam as notas." },
        ],
        correctOptionId: "b",
        explanation:
          "Segundo o guia, uma relação estatística verificada por correlação não implica relação causal: outros fatores, além das bibliotecas, podem estar ocasionando a diferença nas notas. A correlação também não prova o contrário. Para saber se há efeito, seria preciso isolá-lo de outros fatores.",
      },
      {
        id: "q2",
        prompt: "Na avaliação de impacto, o que é o contrafactual?",
        options: [
          { id: "a", text: "O que aconteceu com as pessoas atendidas pela política." },
          { id: "b", text: "O que teria acontecido sem a política." },
          { id: "c", text: "A média dos resultados antes de a política começar." },
        ],
        correctOptionId: "b",
        explanation:
          "O contrafactual é o que teria acontecido sem a política; segundo o guia, ele não é observável e precisa ser estimado. O que aconteceu com os atendidos é o resultado observado. Usar a média de antes como comparação é justamente a comparação de antes e depois que, segundo o guia, não dá uma estimativa confiável.",
      },
      {
        id: "q3",
        prompt: "Depois de um programa municipal, a aprovação nas escolas subiu de 80% para 86%. Por que essa comparação, sozinha, não prova que o programa causou o aumento?",
        options: [
          { id: "a", text: "Porque dados de aprovação nunca são confiáveis." },
          { id: "b", text: "Porque outros fatores além do programa, como outras políticas ou tendências anteriores, podem ter provocado a diferença." },
          { id: "c", text: "Porque só programas federais podem ser avaliados." },
        ],
        correctOptionId: "b",
        explanation:
          "Segundo o guia da Casa Civil, a diferença de antes e depois não fornece uma estimativa confiável do impacto, porque outros fatores além da política podem estar ocasionando a diferença observada. O problema não está no dado em si: o aumento pode estar correto. O que falta é estimar o que teria acontecido sem o programa.",
      },
    ],
  },
  sources: [
    {
      key: "casacivil-guia-avaliacao-ex-post",
      supports:
        "Sustenta que correlação não implica relação causal; que avaliar impacto exige isolar o efeito da política de outros fatores (crise econômica, outras políticas, tendências); o contrafactual, que não é observável e precisa ser estimado; que comparar só antes e depois, ou atendidos e não atendidos, não dá estimativa confiável do impacto; e que estatísticas descritivas ajudam a compreender o contexto, mas não atribuem causalidade.",
    },
    {
      key: "stf-glossario-desinformacao",
      supports:
        "Sustenta a definição de conhecimento válido do programa do STF (informações confiáveis e passíveis de confirmação por verificações fáticas, conjunturais, documentais ou científicas) e, pela nota de escopo, que se trata de definição operacional do programa, não de conceito acadêmico geral.",
    },
    {
      key: "ibge-educa-graficos-e-tabelas",
      supports:
        "Sustenta a habilidade de identificar, em gráficos divulgados pela mídia, elementos que podem induzir a erros de leitura, como escalas inapropriadas e legendas não explicitadas corretamente; pela nota de escopo, que o material não trata de correlação e causalidade.",
    },
  ],
};

