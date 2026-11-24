import type { DimensionKey } from "./dimensions";

// Banco fixo e versionado de 50 situações (10 por dimensão, em cinco blocos).
// direction = +1: concordar aproxima do polo positivo da dimensão;
// direction = −1: concordar aproxima do polo negativo. Em cada dimensão há
// 5 itens em cada direção, para reduzir respostas automáticas de concordância.
// Qualquer alteração de texto, direção ou peso exige uma nova versão.

export const QUESTION_BANK_VERSION = "2026.11-v1";

export type Question = {
  id: string;
  dimension: DimensionKey;
  title: string;
  situation: string;
  statement: string;
  direction: 1 | -1;
  weight: number;
};

export const QUESTIONS: Question[] = [
  // Bloco 1 — Economia, mercado e redistribuição
  {
    id: "eco-01",
    dimension: "economia",
    title: "Imposto sobre imóveis de maior valor para creches",
    situation:
      "Uma cidade precisa de recursos para abrir mais vagas em creches públicas. Uma proposta aumenta o imposto apenas sobre imóveis de maior valor; os demais continuariam pagando o mesmo.",
    statement: "Eu apoiaria aumentar o imposto só sobre os imóveis de maior valor para financiar as creches.",
    direction: 1,
    weight: 1,
  },
  {
    id: "eco-02",
    dimension: "economia",
    title: "Transporte por aplicativo com regras mínimas",
    situation:
      "Uma cidade limita o número de táxis por meio de licenças. Um aplicativo de transporte quer operar ali. A prefeitura pode liberar o serviço com regras mínimas de segurança ou limitar a quantidade de motoristas.",
    statement: "A prefeitura deveria liberar o serviço com regras mínimas de segurança e deixar a concorrência definir preços e número de motoristas.",
    direction: -1,
    weight: 1,
  },
  {
    id: "eco-03",
    dimension: "economia",
    title: "Renda mensal para famílias de baixa renda",
    situation:
      "Um governo estadual avalia criar um programa que paga uma quantia mensal a famílias de baixa renda. Para isso, teria de reduzir outros gastos ou aumentar tributos.",
    statement: "Eu apoiaria criar o programa, mesmo com a necessidade de reduzir outros gastos ou aumentar tributos.",
    direction: 1,
    weight: 1,
  },
  {
    id: "eco-04",
    dimension: "economia",
    title: "Concessão do serviço de água a empresa privada",
    situation:
      "A empresa pública de água de uma cidade tem dívidas e atende mal alguns bairros. Uma proposta concede o serviço a uma empresa privada por 30 anos, com metas de cobertura fiscalizadas por uma agência pública.",
    statement: "Eu apoiaria conceder o serviço à empresa privada com essas metas e essa fiscalização.",
    direction: -1,
    weight: 1,
  },
  {
    id: "eco-05",
    dimension: "economia",
    title: "Aumento do salário mínimo acima da inflação",
    situation:
      "O governo federal discute o valor do salário mínimo do próximo ano. Uma proposta prevê aumento acima da inflação. Parte dos pequenos negócios afirma que teria mais dificuldade para contratar.",
    statement: "Eu apoiaria o aumento acima da inflação, mesmo com essa dificuldade para alguns pequenos negócios.",
    direction: 1,
    weight: 1,
  },
  {
    id: "eco-06",
    dimension: "economia",
    title: "Menos exigências para abrir pequenos negócios",
    situation:
      "Para abrir uma padaria, uma pessoa precisa de várias licenças e cadastros, e o processo leva meses. Uma proposta elimina parte dessas exigências e deixa a fiscalização para depois da abertura.",
    statement: "Eu apoiaria eliminar parte das exigências, mesmo com menos fiscalização antes da abertura dos negócios.",
    direction: -1,
    weight: 1,
  },
  {
    id: "eco-07",
    dimension: "economia",
    title: "Mais profissionais nos postos de saúde públicos",
    situation:
      "Para reduzir a espera por consultas, um município pode contratar mais profissionais para os postos de saúde públicos ou distribuir vales para consultas em clínicas privadas. O custo das duas opções é parecido.",
    statement: "O município deveria priorizar a contratação de profissionais para os postos de saúde públicos.",
    direction: 1,
    weight: 1,
  },
  {
    id: "eco-08",
    dimension: "economia",
    title: "Tarifas baixas para produtos importados",
    situation:
      "Uma indústria nacional pede que o governo aumente os impostos sobre produtos importados para proteger empregos no país. A medida tende a encarecer alguns produtos para os consumidores.",
    statement: "O governo deveria manter os impostos de importação baixos e deixar os produtos importados concorrerem livremente.",
    direction: -1,
    weight: 1,
  },
  {
    id: "eco-09",
    dimension: "economia",
    title: "Previdência para entregadores de aplicativo",
    situation:
      "Entregadores que trabalham por aplicativo não têm os mesmos direitos de quem tem carteira assinada. Uma proposta obriga as empresas de aplicativo a contribuir para a previdência desses trabalhadores.",
    statement: "Eu apoiaria a contribuição obrigatória das empresas, mesmo que o preço das entregas aumente.",
    direction: 1,
    weight: 1,
  },
  {
    id: "eco-10",
    dimension: "economia",
    title: "Cortar despesas em vez de aumentar tributos",
    situation:
      "Um governo gasta mais do que arrecada e precisa equilibrar as contas. As alternativas principais são cortar despesas ou aumentar tributos.",
    statement: "O governo deveria priorizar o corte de despesas em vez do aumento de tributos.",
    direction: -1,
    weight: 1,
  },

  // Bloco 2 — Liberdades civis e exercício da autoridade
  {
    id: "lib-01",
    dimension: "liberdades",
    title: "Câmeras em espaços públicos",
    situation:
      "Uma cidade avalia usar câmeras em espaços públicos para ajudar a prevenir crimes. As gravações teriam regras de acesso e prazo de exclusão.",
    statement: "Eu apoiaria a medida com essas condições.",
    direction: 1,
    weight: 1,
  },
  {
    id: "lib-02",
    dimension: "liberdades",
    title: "Críticas ofensivas a uma autoridade",
    situation:
      "Uma pessoa publica nas redes sociais críticas duras e ofensivas ao prefeito da cidade, sem ameaças e sem acusações falsas.",
    statement: "Esse tipo de publicação deve continuar permitido, mesmo sendo ofensivo.",
    direction: -1,
    weight: 1,
  },
  {
    id: "lib-03",
    dimension: "liberdades",
    title: "Revistas policiais mais frequentes em um bairro",
    situation:
      "Depois de uma série de assaltos em um bairro, a polícia propõe fazer, durante três meses, abordagens e revistas mais frequentes em pessoas que circulam à noite.",
    statement: "Eu apoiaria as revistas mais frequentes no bairro durante esse período.",
    direction: 1,
    weight: 1,
  },
  {
    id: "lib-04",
    dimension: "liberdades",
    title: "Acesso a mensagens só com autorização judicial",
    situation:
      "Uma proposta permitiria que a polícia acessasse mensagens de celular de pessoas investigadas, em casos urgentes, sem autorização prévia de um juiz.",
    statement: "O acesso a mensagens deveria sempre depender de autorização prévia de um juiz.",
    direction: -1,
    weight: 1,
  },
  {
    id: "lib-05",
    dimension: "liberdades",
    title: "Detectores de metal e revista de mochilas na escola",
    situation:
      "Uma escola pública tem enfrentado brigas frequentes, algumas com objetos cortantes. A direção quer instalar detectores de metal e revistar mochilas na entrada.",
    statement: "Eu apoiaria os detectores e as revistas de mochilas na escola.",
    direction: 1,
    weight: 1,
  },
  {
    id: "lib-06",
    dimension: "liberdades",
    title: "Manifestação pacífica que interrompe o trânsito",
    situation:
      "Um grupo avisa com antecedência que fará uma manifestação pacífica em uma avenida movimentada. O ato deve interromper o trânsito por algumas horas.",
    statement: "A manifestação deve ser permitida, mesmo atrapalhando o trânsito.",
    direction: -1,
    weight: 1,
  },
  {
    id: "lib-07",
    dimension: "liberdades",
    title: "Remoção rápida de informação falsa em emergência",
    situation:
      "Durante uma emergência de saúde, o governo propõe que as plataformas digitais removam rapidamente publicações que um órgão público classificar como falsas.",
    statement: "Eu apoiaria a remoção rápida dessas publicações durante a emergência.",
    direction: 1,
    weight: 1,
  },
  {
    id: "lib-08",
    dimension: "liberdades",
    title: "Recusa de tratamento médico por adulto",
    situation:
      "Uma pessoa adulta e consciente quer recusar um tratamento médico por motivos pessoais. Ela foi informada dos riscos para a própria saúde.",
    statement: "A decisão dessa pessoa deve ser respeitada, mesmo que a equipe médica discorde.",
    direction: -1,
    weight: 1,
  },
  {
    id: "lib-09",
    dimension: "liberdades",
    title: "Penas maiores para furtos repetidos",
    situation: "Uma proposta aumenta as penas de prisão para pessoas que cometem furtos repetidas vezes.",
    statement: "Eu apoiaria penas maiores para quem comete furtos repetidamente.",
    direction: 1,
    weight: 1,
  },
  {
    id: "lib-10",
    dimension: "liberdades",
    title: "Dados de localização compartilhados com a polícia",
    situation:
      "O aplicativo do transporte público de uma cidade registra a localização dos passageiros. A prefeitura quer usar esses dados para planejar linhas e também entregá-los à polícia quando ela pedir.",
    statement: "A entrega desses dados à polícia deveria exigir uma ordem judicial em cada caso.",
    direction: -1,
    weight: 1,
  },

  // Bloco 3 — Costumes, tradição e mudança social
  {
    id: "cos-01",
    dimension: "costumes",
    title: "Diferentes formatos de família nas aulas",
    situation:
      "Uma escola pública propõe incluir, nas aulas sobre convivência, conteúdos sobre diferentes formatos de família, como famílias com avós responsáveis, com um só responsável ou com dois pais ou duas mães.",
    statement: "Eu apoiaria incluir esse conteúdo nas aulas.",
    direction: 1,
    weight: 1,
  },
  {
    id: "cos-02",
    dimension: "costumes",
    title: "Símbolos religiosos em prédios públicos",
    situation:
      "Em um município, alguns prédios públicos exibem há décadas símbolos de uma religião, como crucifixos. Um grupo pede a retirada; outro defende que fazem parte da tradição local.",
    statement: "Os símbolos deveriam permanecer, por fazerem parte da tradição local.",
    direction: -1,
    weight: 1,
  },
  {
    id: "cos-03",
    dimension: "costumes",
    title: "Dispensa de aulas por motivos religiosos",
    situation:
      "Uma família pede que a escola dispense o filho de algumas aulas cujos temas contrariam os valores religiosos da família. A escola considera esses conteúdos parte do currículo.",
    statement: "A escola deveria permitir essa dispensa.",
    direction: -1,
    weight: 1,
  },
  {
    id: "cos-04",
    dimension: "costumes",
    title: "Licença igual para pais e mães",
    situation:
      "Uma empresa pública propõe que pais tenham licença de quatro meses após o nascimento ou a adoção de um filho, igual à das mães, para incentivar a divisão dos cuidados.",
    statement: "Eu apoiaria a licença igual para pais e mães.",
    direction: 1,
    weight: 1,
  },
  {
    id: "cos-05",
    dimension: "costumes",
    title: "Apoio público a uma festa religiosa tradicional",
    situation:
      "Uma festa religiosa tradicional recebe recursos da prefeitura há décadas. Uma proposta corta esse apoio por se tratar de evento ligado a uma religião específica.",
    statement: "A prefeitura deveria continuar apoiando a festa, por fazer parte da tradição local.",
    direction: -1,
    weight: 1,
  },
  {
    id: "cos-06",
    dimension: "costumes",
    title: "Nome social na lista de chamada",
    situation:
      "Um estudante pede à escola para ser chamado pelo nome social — o nome com que se identifica — nas listas de chamada, com autorização dos responsáveis.",
    statement: "A escola deveria atender ao pedido.",
    direction: 1,
    weight: 1,
  },
  {
    id: "cos-07",
    dimension: "costumes",
    title: "Prioridade à família formada por pai, mãe e filhos",
    situation:
      "Uma proposta de lei estabelece como prioridade das políticas sociais o fortalecimento do casamento e da família formada por pai, mãe e filhos.",
    statement: "Eu apoiaria essa prioridade nas políticas sociais.",
    direction: -1,
    weight: 1,
  },
  {
    id: "cos-08",
    dimension: "costumes",
    title: "Revisão de textos sobre figuras históricas",
    situation:
      "Um museu da cidade quer revisar placas que apresentam algumas figuras históricas apenas como heróis, acrescentando informações sobre a participação delas na escravidão e em episódios de violência.",
    statement: "Eu apoiaria a revisão dos textos do museu.",
    direction: 1,
    weight: 1,
  },
  {
    id: "cos-09",
    dimension: "costumes",
    title: "Educação sexual só no ensino médio e com autorização",
    situation:
      "Pais e professores discutem quando tratar de educação sexual na escola. Uma proposta deixa o tema apenas para o ensino médio e somente para estudantes com autorização dos responsáveis.",
    statement: "Eu apoiaria essa regra.",
    direction: -1,
    weight: 1,
  },
  {
    id: "cos-10",
    dimension: "costumes",
    title: "Uniforme escolar à escolha de cada estudante",
    situation:
      "Uma escola tem uniformes diferentes por gênero: saia para meninas e calça para meninos. A direção propõe que cada estudante escolha entre as peças disponíveis.",
    statement: "Eu apoiaria deixar a escolha do uniforme para cada estudante.",
    direction: 1,
    weight: 1,
  },

  // Bloco 4 — Participação política e organização do poder
  {
    id: "par-01",
    dimension: "participacao",
    title: "Moradores decidem parte do orçamento",
    situation:
      "Uma prefeitura propõe que os moradores decidam diretamente, em assembleias por bairro, como usar uma parte do orçamento de obras.",
    statement: "Eu apoiaria que os moradores decidissem diretamente essa parte do orçamento.",
    direction: 1,
    weight: 1,
  },
  {
    id: "par-02",
    dimension: "participacao",
    title: "Decisões técnicas protegidas de pressões políticas",
    situation:
      "Algumas decisões, como a definição da taxa básica de juros, ficam com uma equipe técnica que tem mandato fixo e não pode ser demitida a qualquer momento pelo governo.",
    statement: "Eu prefiro que decisões desse tipo fiquem com equipes técnicas protegidas de pressões políticas.",
    direction: -1,
    weight: 1,
  },
  {
    id: "par-03",
    dimension: "participacao",
    title: "Votação para retirar um prefeito do cargo",
    situation:
      "Uma proposta permite que eleitores convoquem, com assinaturas, uma nova votação para decidir se um prefeito deve deixar o cargo antes do fim do mandato.",
    statement: "Eu apoiaria criar essa possibilidade.",
    direction: 1,
    weight: 1,
  },
  {
    id: "par-04",
    dimension: "participacao",
    title: "Reforma complexa decidida pelo Congresso",
    situation:
      "O governo quer mudar as regras da aposentadoria. Uma opção é deixar a decisão para o Congresso; outra é convocar um plebiscito para que os eleitores decidam.",
    statement: "Mudanças complexas como essa devem ser decididas pelos representantes eleitos, e não por plebiscito.",
    direction: -1,
    weight: 1,
  },
  {
    id: "par-05",
    dimension: "participacao",
    title: "Gestão de escolas e postos de saúde pelos municípios",
    situation:
      "Um estado propõe transferir aos municípios a gestão de escolas e postos de saúde que hoje administra, junto com os recursos correspondentes.",
    statement: "Eu apoiaria transferir essa gestão para os municípios.",
    direction: 1,
    weight: 1,
  },
  {
    id: "par-06",
    dimension: "participacao",
    title: "Desempenho mínimo para partidos",
    situation:
      "Partidos precisam de um desempenho mínimo nas eleições para ter acesso a recursos públicos e a tempo de propaganda. Essa exigência reduz o número de partidos, mas dificulta a vida dos menores.",
    statement: "Eu concordo com essa exigência, mesmo que ela dificulte a continuidade de partidos pequenos.",
    direction: -1,
    weight: 1,
  },
  {
    id: "par-07",
    dimension: "participacao",
    title: "Poder de veto para conselho de saúde",
    situation:
      "Um conselho municipal de saúde, formado por usuários, trabalhadores e gestores, quer ter poder de veto sobre algumas decisões da secretaria de saúde.",
    statement: "Eu apoiaria dar esse poder de veto ao conselho.",
    direction: 1,
    weight: 1,
  },
  {
    id: "par-08",
    dimension: "participacao",
    title: "Tribunais podem anular leis",
    situation:
      "Um tribunal pode anular uma lei aprovada pelo Legislativo quando considera que ela contraria a Constituição.",
    statement: "É importante que os tribunais tenham esse poder, mesmo quando a maioria dos parlamentares discorda.",
    direction: -1,
    weight: 1,
  },
  {
    id: "par-09",
    dimension: "participacao",
    title: "Prazo para votar projetos de iniciativa popular",
    situation:
      "Cidadãos podem apresentar projetos de lei com assinaturas, mas o Legislativo não tem prazo para votá-los. Uma proposta obriga a votação em até seis meses.",
    statement: "Eu apoiaria esse prazo obrigatório.",
    direction: 1,
    weight: 1,
  },
  {
    id: "par-10",
    dimension: "participacao",
    title: "Linhas de ônibus decididas por órgãos técnicos e Câmara",
    situation:
      "Em uma cidade, mudanças nas linhas de ônibus são decididas pela Câmara Municipal e por órgãos técnicos, a partir de estudos. Um grupo pede consulta popular a cada mudança.",
    statement: "As mudanças devem continuar sendo decididas pela Câmara e pelos órgãos técnicos, sem consulta popular a cada caso.",
    direction: -1,
    weight: 1,
  },

  // Bloco 5 — Desenvolvimento e prioridades socioambientais
  {
    id: "soc-01",
    dimension: "socioambiental",
    title: "Mina com controles de contaminação",
    situation:
      "Uma mineradora quer abrir uma mina perto de uma pequena cidade, com promessa de empregos e arrecadação. Estudos indicam risco de contaminação de um rio, que pode ser reduzido com controles.",
    statement: "Eu apoiaria a abertura da mina com os controles propostos.",
    direction: -1,
    weight: 1,
  },
  {
    id: "soc-02",
    dimension: "socioambiental",
    title: "Ampliação de área de proteção ambiental",
    situation:
      "Um município pode ampliar uma área de proteção ambiental. A medida limitaria a expansão de lavouras e de novos loteamentos na região.",
    statement: "Eu apoiaria ampliar a área de proteção.",
    direction: 1,
    weight: 1,
  },
  {
    id: "soc-03",
    dimension: "socioambiental",
    title: "Licenciamento mais rápido para obras estratégicas",
    situation:
      "O licenciamento ambiental de obras como estradas e portos pode levar anos. Uma proposta reduz prazos e etapas de análise para obras consideradas estratégicas.",
    statement: "Eu apoiaria simplificar o licenciamento dessas obras, mesmo com menos etapas de análise.",
    direction: -1,
    weight: 1,
  },
  {
    id: "soc-04",
    dimension: "socioambiental",
    title: "Demarcação de terra indígena com indenização",
    situation:
      "Estudos oficiais reconhecem que uma área hoje ocupada por fazendas produtivas é de ocupação tradicional de uma comunidade indígena. A demarcação exigiria a saída dos fazendeiros, com indenização.",
    statement: "Eu apoiaria a demarcação da área, com indenização aos fazendeiros.",
    direction: 1,
    weight: 1,
  },
  {
    id: "soc-05",
    dimension: "socioambiental",
    title: "Exploração de petróleo perto de região sensível",
    situation:
      "Foi encontrado petróleo no mar perto de uma região ambientalmente sensível. A exploração pode gerar receitas públicas e empregos, mas há risco de vazamentos.",
    statement: "Eu apoiaria a exploração com regras de segurança, por causa das receitas e dos empregos.",
    direction: -1,
    weight: 1,
  },
  {
    id: "soc-06",
    dimension: "socioambiental",
    title: "Tributo sobre combustíveis fósseis",
    situation:
      "Uma proposta cria um tributo sobre combustíveis fósseis para financiar transporte público e energia de fontes renováveis. O preço da gasolina aumentaria.",
    statement: "Eu apoiaria o tributo, mesmo com o aumento do preço da gasolina.",
    direction: 1,
    weight: 1,
  },
  {
    id: "soc-07",
    dimension: "socioambiental",
    title: "Hidrelétrica que alaga área de floresta",
    situation:
      "Para baratear a energia, o governo pode construir uma hidrelétrica que alagaria uma área de floresta e exigiria a mudança de famílias ribeirinhas para outro local.",
    statement: "Eu apoiaria a construção da hidrelétrica, com indenização às famílias.",
    direction: -1,
    weight: 1,
  },
  {
    id: "soc-08",
    dimension: "socioambiental",
    title: "Proibição de sacolas plásticas descartáveis",
    situation:
      "Uma cidade quer proibir sacolas plásticas descartáveis nos supermercados. Comerciantes e consumidores teriam custos com alternativas.",
    statement: "Eu apoiaria a proibição.",
    direction: 1,
    weight: 1,
  },
  {
    id: "soc-09",
    dimension: "socioambiental",
    title: "Prazo máximo para análise de novos agrotóxicos",
    situation:
      "Produtores rurais pedem prazos máximos para que os órgãos responsáveis analisem pedidos de autorização de novos agrotóxicos, hoje sem prazo definido.",
    statement: "Eu apoiaria prazos máximos para essa análise, para que os produtores tenham acesso mais rápido a novos produtos.",
    direction: -1,
    weight: 1,
  },
  {
    id: "soc-10",
    dimension: "socioambiental",
    title: "Reaproveitamento de água e áreas verdes em prédios novos",
    situation:
      "Um município pode exigir que novos prédios tenham sistemas de reaproveitamento de água da chuva e áreas verdes. A exigência encarece a construção.",
    statement: "Eu apoiaria a exigência, mesmo encarecendo os imóveis novos.",
    direction: 1,
    weight: 1,
  },
];

export const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

export function questionIndex(id: string): number {
  return QUESTIONS.findIndex((q) => q.id === id);
}
