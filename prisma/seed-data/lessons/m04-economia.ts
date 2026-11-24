import type { SeedModule } from "./types";

export const moduloEconomia: SeedModule = {
  slug: "economia-no-debate-publico",
  number: 4,
  title: "Economia no debate público",
  summary: "Inflação, juros, orçamento, tributos e dívida: conceitos usados nas discussões políticas.",
  area: "FUNDAMENTOS",
  stage: "FOUNDATIONS",
  status: "PUBLISHED",
  lessons: [
    {
      slug: "inflacao-juros-e-banco-central",
      number: 1,
      title: "Inflação, juros e Banco Central",
      objective: "Explicar o que é inflação, para que serve a taxa Selic e quem decide sobre ela.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "Inflação e juros são temas frequentes nas discussões sobre economia e política. A inflação afeta o preço das compras do mês, e os juros afetam o custo dos empréstimos. Nesta lição, você vê o que é inflação, como ela é medida, quem define a meta para ela e quem decide a taxa básica de juros.",
        blocks: [
          {
            type: "definition",
            term: "Inflação",
            text: "Segundo o Banco Central (BC), inflação é o aumento dos preços de bens e serviços. Ela diminui o poder de compra da moeda, isto é, a quantidade de coisas que se consegue comprar com o mesmo dinheiro. A inflação é medida por índices de preços. No sistema de metas, o índice usado é o IPCA (Índice Nacional de Preços ao Consumidor Amplo).",
            sources: ["bcb-o-que-e-inflacao"],
          },
          {
            type: "example",
            title: "Exemplo fictício: a mesma cesta, um ano depois",
            text: "Os valores são inventados. Em janeiro, uma família gasta R$ 400,00 com uma cesta de compras no supermercado. Em 12 meses, os preços desses itens sobem, em média, 5%. No janeiro seguinte, a mesma cesta custa R$ 420,00 (R$ 400,00 mais 5% de R$ 400,00). Se a família continuar com R$ 400,00 para essas compras, não consegue levar tudo: o mesmo dinheiro passou a comprar menos. Com alta de 3% no ano, a cesta custaria R$ 412,00. Um índice como o IPCA faz um acompanhamento parecido, mas com uma cesta de muitos produtos e serviços.",
            sources: ["bcb-o-que-e-inflacao"],
          },
          {
            type: "paragraph",
            text: "O BC agrupa as causas da inflação em quatro tipos: pressões de demanda (ligadas à procura por bens e serviços), pressões de custos (ligadas ao custo de produzir), inércia inflacionária (quando a inflação passada se transmite aos preços atuais) e expectativas de inflação (o que pessoas e empresas esperam que aconteça com os preços). Segundo o BC, a inflação alta gera incerteza, distorce os preços relativos, de modo que fica difícil saber se algo está caro ou barato, afeta especialmente a população mais pobre e encarece a dívida pública. O BC considera que a deflação, a queda dos preços, também é indesejável.",
            sources: ["bcb-o-que-e-inflacao"],
          },
          { type: "heading", text: "A meta para a inflação" },
          {
            type: "paragraph",
            text: "O Brasil adota o regime de metas para a inflação desde 1999. O Conselho Monetário Nacional (CMN) define a meta e o índice de preços usado, o IPCA, calculado pelo Instituto Brasileiro de Geografia e Estatística (IBGE). Cabe ao BC adotar as medidas necessárias para alcançar a meta. Desde janeiro de 2025, a meta é contínua: todo mês, a inflação acumulada em 12 meses é comparada com a meta. Segundo o Banco Central, em consulta de novembro de 2026, a meta é de 3,00%, com intervalo de tolerância de 1,5 ponto percentual para mais ou para menos, ou seja, de 1,50% a 4,50%. A meta é considerada descumprida se a inflação ficar fora desse intervalo por seis meses consecutivos.",
            sources: ["bcb-metas-para-a-inflacao"],
          },
          { type: "heading", text: "A taxa Selic e o Copom" },
          {
            type: "definition",
            term: "Taxa Selic",
            text: "Juros são o valor pago pelo uso de dinheiro emprestado. Segundo o BC, a Selic é a taxa básica de juros da economia e influencia outras taxas, como as de empréstimos, financiamentos e aplicações financeiras. Tecnicamente, é a taxa média das operações de um dia útil com títulos públicos federais, que são papéis de dívida do governo. Definir a Selic é o principal instrumento de política monetária que o BC usa para controlar a inflação. O nome vem da sigla do Sistema Especial de Liquidação e de Custódia.",
            sources: ["bcb-taxa-selic"],
          },
          {
            type: "paragraph",
            text: "A meta da Selic é definida pelo Comitê de Política Monetária (Copom), formado pelo presidente e pelos diretores do BC, a cada 45 dias. Os votos dos membros são divulgados, e a ata, o registro escrito da reunião, é publicada em até quatro dias úteis. Depois da decisão, o BC compra e vende títulos públicos federais para manter a taxa próxima do valor definido.",
            sources: ["bcb-copom", "bcb-taxa-selic"],
          },
          { type: "heading", text: "Os objetivos do Banco Central" },
          {
            type: "quote",
            text: "Art. 1º O Banco Central do Brasil tem por objetivo fundamental assegurar a estabilidade de preços.",
            sourceKey: "lcp-179-2021",
            locator: "art. 1º",
          },
          {
            type: "paragraph",
            text: "Esse é o primeiro artigo da Lei Complementar nº 179/2021, que trata da autonomia do Banco Central. Sem prejuízo desse objetivo, a lei também atribui ao BC zelar pela estabilidade e pela eficiência do sistema financeiro, formado por bancos e outras instituições financeiras, suavizar as flutuações do nível de atividade econômica, isto é, reduzir os altos e baixos da economia, e fomentar o pleno emprego. Na descrição do próprio BC, a estabilidade de preços é seu objetivo fundamental.",
            sources: ["lcp-179-2021", "bcb-autonomia"],
          },
          {
            type: "limit",
            title: "Debates que esta lição não cobre",
            text: "A lição apresenta o que a lei e o Banco Central afirmam. Os debates sobre o nível dos juros e sobre a autonomia do BC envolvem argumentos diferentes, que não são tratados aqui. A lição também não detalha como as decisões sobre a Selic chegam aos preços nem como atua cada causa da inflação.",
          },
        ],
        relatedConcepts: [
          { term: "Poder de compra", explanation: "Quantidade de bens e serviços que se consegue comprar com uma mesma quantia de dinheiro." },
          { term: "IPCA", explanation: "Índice de preços calculado pelo IBGE e usado como referência no regime de metas para a inflação." },
          { term: "Copom", explanation: "Comitê do Banco Central, formado por seu presidente e seus diretores, que define a meta da taxa Selic a cada 45 dias." },
          { term: "Deflação", explanation: "Queda dos preços de bens e serviços; segundo o Banco Central, também é indesejável." },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Segundo o Banco Central, o que a inflação provoca no poder de compra da moeda?",
            options: [
              { id: "a", text: "Aumenta: com o mesmo dinheiro, compra-se mais." },
              { id: "b", text: "Diminui: com o mesmo dinheiro, compra-se menos." },
              { id: "c", text: "Não muda, porque a inflação afeta apenas produtos importados." },
            ],
            correctOptionId: "b",
            explanation:
              "O BC define inflação como o aumento dos preços de bens e serviços, o que implica diminuição do poder de compra da moeda. No exemplo da cesta, R$ 400,00 deixam de bastar para comprar os mesmos itens. A inflação não se restringe a importados: o IPCA acompanha os preços de uma cesta com muitos produtos e serviços.",
          },
          {
            id: "q2",
            prompt: "Quem define a meta para a inflação e quem define a meta da taxa Selic?",
            options: [
              { id: "a", text: "O Copom define as duas." },
              { id: "b", text: "O IBGE define a meta para a inflação, e o Congresso define a Selic." },
              { id: "c", text: "O CMN define a meta para a inflação, e o Copom, do Banco Central, define a meta da Selic." },
            ],
            correctOptionId: "c",
            explanation:
              "Segundo o BC, a meta para a inflação e o índice de preços são definidos pelo Conselho Monetário Nacional (CMN), e cabe ao BC buscar essa meta. A meta da Selic é definida pelo Copom, formado pelo presidente e pelos diretores do BC. O IBGE calcula o IPCA, mas não define a meta.",
          },
          {
            id: "q3",
            prompt: "Pela regra em vigor desde janeiro de 2025, quando a meta para a inflação é considerada descumprida, segundo o Banco Central?",
            options: [
              { id: "a", text: "Quando a inflação acumulada em 12 meses fica fora do intervalo de tolerância por seis meses consecutivos." },
              { id: "b", text: "Quando a inflação de um único mês fica acima de 3,00%." },
              { id: "c", text: "Quando a taxa Selic fica acima de 4,50%." },
            ],
            correctOptionId: "a",
            explanation:
              "Desde janeiro de 2025, a meta é contínua: todo mês, a inflação acumulada em 12 meses é comparada com a meta. Ela só é considerada descumprida se ficar fora do intervalo de tolerância por seis meses seguidos; em consulta de novembro de 2026, esse intervalo ia de 1,50% a 4,50%. A meta se refere à inflação medida pelo IPCA, e não à taxa Selic.",
          },
        ],
      },
      sources: [
        {
          key: "bcb-o-que-e-inflacao",
          supports:
            "Sustenta a definição de inflação, sua medição por índices de preços, o papel do IPCA no sistema de metas, as quatro causas agrupadas pelo BC, as consequências da inflação alta e a avaliação de que a deflação também é indesejável.",
        },
        {
          key: "bcb-metas-para-a-inflacao",
          supports:
            "Sustenta o regime de metas desde 1999, os papéis do CMN e do BC, o IPCA calculado pelo IBGE, a meta contínua desde 2025 e os valores da meta e do intervalo de tolerância (consulta de novembro de 2026).",
        },
        {
          key: "bcb-taxa-selic",
          supports: "Sustenta a definição da Selic, sua influência sobre outras taxas, seu papel como principal instrumento de política monetária, a definição técnica e a origem do nome.",
        },
        {
          key: "bcb-copom",
          supports: "Sustenta a composição do Copom, a periodicidade de 45 dias, a divulgação dos votos e da ata e a compra e venda de títulos públicos para manter a taxa.",
        },
        { key: "bcb-autonomia", supports: "Sustenta a descrição, pelo próprio BC, da estabilidade de preços como seu objetivo fundamental." },
        { key: "lcp-179-2021", supports: "Sustenta o objetivo fundamental e os demais objetivos legais do Banco Central." },
      ],
    },
    {
      slug: "orcamento-tributos-e-divida",
      number: 2,
      title: "Orçamento, tributos e dívida pública",
      objective: "Entender de onde vem e para onde vai o dinheiro público e o que significa dívida pública.",
      minutes: 6,
      currentKeys: [],
      content: {
        intro:
          "Escolas, hospitais e iluminação pública são mantidos com dinheiro público. Nesta lição, você vê de onde vem esse dinheiro, como as leis do orçamento definem para onde ele vai e o que significa dívida pública.",
        blocks: [
          { type: "heading", text: "De onde vem o dinheiro" },
          {
            type: "definition",
            term: "Receita pública",
            text: "Segundo o Portal da Transparência, é o dinheiro de que o governo dispõe para manter sua estrutura e oferecer bens e serviços à sociedade, como hospitais, escolas, iluminação e saneamento. Ela vem de tributos, de aluguéis e venda de bens, de serviços, da venda de títulos do Tesouro e de indenizações. A receita prevista é uma estimativa: se a arrecadação cair, os gastos planejados precisam ser reduzidos.",
            sources: ["portal-transparencia-orcamento-da-receita"],
          },
          {
            type: "definition",
            term: "Tributo",
            text: "A Receita Federal descreve o tributo como uma porção de dinheiro que a sociedade decidiu, por lei aprovada por seus representantes, reservar de cada cidadão e de cada empresa para atender a necessidades coletivas. Nesse material, os eleitores escolhem os legisladores que criam as leis tributárias, a administração pública arrecada, e prefeitos, governadores e o Presidente da República aplicam os recursos.",
            sources: ["receita-federal-tributo-taxa-impostos"],
          },
          {
            type: "paragraph",
            text: "A Constituição permite que União, estados, Distrito Federal e municípios instituam impostos, taxas e contribuição de melhoria (art. 145). A taxa está ligada a um serviço público específico prestado ou posto à disposição do contribuinte, quem paga o tributo, ou ao exercício do poder de polícia, como atividades de fiscalização. A contribuição de melhoria decorre de obras públicas. Sempre que possível, os impostos devem variar conforme a capacidade econômica do contribuinte. O material da Receita lista cinco espécies de tributo: impostos (como o Imposto de Renda), taxas (como a taxa de lixo), contribuições especiais (como a contribuição previdenciária), contribuições de melhoria e empréstimos compulsórios.",
            sources: ["cf88-art145", "receita-federal-tributo-taxa-impostos"],
          },
          { type: "heading", text: "Para onde vai: as leis do orçamento" },
          {
            type: "comparison",
            title: "As três leis orçamentárias da União",
            intro: "A Constituição prevê três leis orçamentárias de iniciativa do Poder Executivo, ou seja, propostas pelo governo (art. 165). Segundo o Senado, o Congresso vota essas leis.",
            orderNote: "Ordem em que as leis aparecem no art. 165 da Constituição.",
            items: [
              {
                label: "PPA",
                heading: "Plano Plurianual",
                text: "Horizonte: quatro anos. Conteúdo: diretrizes, objetivos e metas dos programas de governo para o período. Atenção: o último ano do PPA se refere ao primeiro ano do governo seguinte.",
                sources: ["cf88-art165", "orcamento-facil-entenda-o-orcamento"],
              },
              {
                label: "LDO",
                heading: "Lei de Diretrizes Orçamentárias",
                text: "Horizonte: o ano seguinte. Conteúdo: metas e prioridades da administração pública federal. Atenção: orienta a elaboração do orçamento anual, feita numa etapa posterior.",
                sources: ["cf88-art165", "orcamento-facil-entenda-o-orcamento"],
              },
              {
                label: "LOA",
                heading: "Lei Orçamentária Anual",
                text: "Horizonte: o ano seguinte. Conteúdo: previsão das receitas e de todos os gastos da administração pública federal. Atenção: é o Orçamento da União propriamente dito.",
                sources: ["cf88-art165", "orcamento-facil-entenda-o-orcamento"],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Durante a execução, o governo usa o dinheiro conforme autorizado na LOA. Segundo o Senado, o Presidente da República pode pedir ao Congresso créditos adicionais: suplementares, quando o valor autorizado foi insuficiente; especiais, para novos programas; e extraordinários, para situações urgentes. O Congresso fiscaliza a execução ao longo do ano e julga a prestação de contas anual da Presidência da República.",
            sources: ["orcamento-facil-entenda-o-orcamento"],
          },
          {
            type: "example",
            title: "Exemplo fictício: um ano no orçamento de Vila Serena",
            text: "Vila Serena é um município inventado. O exemplo aplica a ele, de forma simplificada, as etapas que o Senado descreve para a União. 1) LDO: a prefeitura propõe e a Câmara Municipal aprova as metas e prioridades para o ano seguinte, como reformar duas escolas. 2) LOA: com base nessas prioridades, a Câmara Municipal aprova o orçamento, que estima receitas de R$ 50 milhões e autoriza despesas no mesmo valor. 3) Execução: no meio do ano, a arrecadação fica abaixo do estimado. Como a receita era uma estimativa, a prefeitura reduz gastos planejados e adia a reforma de uma das escolas. 4) Contas: depois do fim do ano, a prefeitura presta contas, e a Câmara Municipal as julga.",
            sources: ["orcamento-facil-entenda-o-orcamento", "portal-transparencia-orcamento-da-receita", "cf88-art165"],
          },
          { type: "heading", text: "Dívida pública" },
          {
            type: "quote",
            text: "A Dívida Pública Federal (DPF) é a dívida contraída pelo Tesouro Nacional para financiar o déficit orçamentário do Governo Federal, nele incluído o refinanciamento da própria dívida",
            sourceKey: "tesouro-divida-publica-federal",
            locator: "Conceito",
          },
          {
            type: "paragraph",
            text: "Déficit orçamentário é a situação em que as despesas superam as receitas. Refinanciar a dívida é contrair nova dívida para pagar a que está vencendo. Segundo o Tesouro, a dívida federal pode ser mobiliária, quando vem da emissão de títulos públicos, papéis que o governo vende e se compromete a pagar no futuro, ou contratual, quando vem de contratos. Ela também pode ser interna, em reais, ou externa. Ao vender títulos, o governo recebe dinheiro e assume uma dívida; por isso, a venda de títulos do Tesouro aparece entre as origens da receita pública.",
            sources: ["tesouro-divida-publica-federal", "portal-transparencia-orcamento-da-receita"],
          },
          {
            type: "limit",
            title: "Limites desta lição",
            text: "As fontes usadas descrevem o orçamento e a dívida da União. Regras, prazos e órgãos de controle de estados e municípios não são detalhados aqui. A lição também não traz valores atuais de arrecadação ou de dívida nem detalha cada espécie de tributo. Debates sobre o nível dos tributos, as prioridades de gasto e o tamanho da dívida envolvem argumentos diferentes, que não são tratados aqui.",
          },
        ],
        relatedConcepts: [
          { term: "Contribuinte", explanation: "Pessoa ou empresa que paga um tributo." },
          {
            term: "Créditos adicionais",
            explanation: "Autorizações de gasto pedidas durante a execução do orçamento; podem ser suplementares, especiais ou extraordinários.",
          },
          { term: "Título público", explanation: "Papel emitido pelo governo para obter recursos; forma a chamada dívida mobiliária." },
        ],
      },
      quiz: {
        questions: [
          {
            id: "q1",
            prompt: "Qual lei orçamentária da União prevê as receitas e todos os gastos da administração pública federal para o ano seguinte?",
            options: [
              { id: "a", text: "O Plano Plurianual (PPA)." },
              { id: "b", text: "A Lei de Diretrizes Orçamentárias (LDO)." },
              { id: "c", text: "A Lei Orçamentária Anual (LOA)." },
            ],
            correctOptionId: "c",
            explanation:
              "Segundo o Senado, a LOA é o Orçamento da União propriamente dito: prevê as receitas e todos os gastos da administração federal no ano seguinte. A LDO também trata do ano seguinte, mas estabelece metas e prioridades que orientam a LOA. O PPA tem horizonte de quatro anos.",
          },
          {
            id: "q2",
            prompt: "Segundo a Constituição (art. 145), qual tributo decorre de obras públicas?",
            options: [
              { id: "a", text: "A taxa." },
              { id: "b", text: "A contribuição de melhoria." },
              { id: "c", text: "O Imposto de Renda." },
            ],
            correctOptionId: "b",
            explanation:
              "O art. 145 prevê a contribuição de melhoria, “decorrente de obras públicas”. A taxa está ligada a um serviço público específico, como no exemplo da taxa de lixo citado pela Receita Federal, ou ao exercício do poder de polícia. O Imposto de Renda é um exemplo de imposto.",
          },
          {
            id: "q3",
            prompt: "Segundo o Tesouro Nacional, quando a dívida pública federal é chamada de mobiliária?",
            options: [
              { id: "a", text: "Quando decorre da emissão de títulos públicos." },
              { id: "b", text: "Quando é formada por dívidas de famílias com bancos." },
              { id: "c", text: "Quando é paga com a venda de imóveis do governo." },
            ],
            correctOptionId: "a",
            explanation:
              "A dívida federal é mobiliária quando decorre da emissão de títulos públicos e contratual quando decorre de contratos. Dívidas de famílias com bancos são dívidas privadas, e não dívida pública. A palavra “mobiliária” se refere à forma de contrair a dívida, por meio de títulos, e não a imóveis.",
          },
        ],
      },
      sources: [
        {
          key: "cf88-art145",
          supports: "Sustenta os tributos que União, estados, Distrito Federal e municípios podem instituir (impostos, taxas e contribuição de melhoria) e o critério da capacidade econômica.",
        },
        { key: "cf88-art165", supports: "Sustenta que o PPA, a LDO e a LOA são leis de iniciativa do Poder Executivo." },
        {
          key: "orcamento-facil-entenda-o-orcamento",
          supports:
            "Sustenta a descrição das três leis orçamentárias da União, a votação pelo Congresso, os créditos adicionais e a fiscalização e o julgamento das contas da Presidência pelo Congresso.",
        },
        {
          key: "receita-federal-tributo-taxa-impostos",
          supports: "Sustenta a definição de tributo, as cinco espécies com exemplos e a divisão de papéis entre eleitores, legisladores, administração e governantes.",
        },
        {
          key: "portal-transparencia-orcamento-da-receita",
          supports: "Sustenta a definição de receita pública, suas origens, o caráter de estimativa e a necessidade de reduzir gastos se a arrecadação cair.",
        },
        {
          key: "tesouro-divida-publica-federal",
          supports: "Sustenta a definição de Dívida Pública Federal e suas modalidades: mobiliária ou contratual, interna ou externa.",
        },
      ],
    },
  ],
};
