import { DIMENSIONS, type DimensionKey } from "./dimensions";
import { RETIRED_QUESTIONS } from "./question-archive";

// Banco versionado de situações, em cinco blocos (um por dimensão). Cada bloco
// tem 10 temas; cada tema tem versões em contextos diferentes, com a mesma
// dimensão, direção e peso. Cada tentativa sorteia uma versão de cada tema
// (10 situações por bloco) e embaralha a ordem dentro do bloco.
// direction = +1: concordar aproxima do polo positivo da dimensão;
// direction = −1: concordar aproxima do polo negativo. Em cada dimensão há
// 5 temas em cada direção, para reduzir respostas automáticas de concordância;
// assim, toda tentativa tem cinco situações em cada direção por bloco.
//
// Critérios de redação (2026.11-v3): cada situação apresenta uma decisão
// concreta, com o que está em jogo, e o argumento principal de cada lado, com
// peso parecido (a ordem dos lados alterna entre as versões); a afirmação
// expressa uma única posição, sem adjetivos que antecipem a resposta.
//
// Qualquer alteração de texto, direção ou peso exige uma nova versão do banco.
// Uma situação nunca muda de sentido sob o mesmo id: as tentativas guardam os
// ids sorteados, e as respostas, os ids respondidos. Ao reescrever, use ids
// novos e mova os textos anteriores para question-archive.ts.

export const QUESTION_BANK_VERSION = "2026.11-v3";

export type QuestionText = { id: string; title: string; situation: string; statement: string };

export type QuestionSlot = {
  /** Theme id, stable across rewrites of its versions. */
  slot: string;
  dimension: DimensionKey;
  direction: 1 | -1;
  weight: number;
  versions: QuestionText[];
};

export type Question = QuestionText & Omit<QuestionSlot, "versions">;

export const QUESTION_SLOTS: QuestionSlot[] = [
  // Bloco 1 — Economia, mercado e redistribuição
  {
    slot: "eco-01",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-01-2a",
        title: "Imposto maior sobre imóveis de alto valor",
        situation:
          "Uma cidade quer abrir 3 mil vagas em creches aumentando em 30% o imposto dos imóveis acima de R$ 1 milhão; os demais continuam pagando o mesmo. Quem defende diz que quem tem mais patrimônio pode contribuir mais e que faltam vagas hoje. Quem critica diz que o aumento acaba repassado aos aluguéis e que a prefeitura deveria cortar gastos antes de cobrar mais.",
        statement: "Eu apoiaria aumentar o imposto dos imóveis de alto valor para abrir as vagas.",
      },
      {
        id: "eco-01-2b",
        title: "Imposto maior sobre grandes heranças",
        situation:
          "Para ampliar as escolas de tempo integral, um estado propõe dobrar, de 4% para 8%, o imposto sobre heranças acima de R$ 2 milhões; as menores não mudam. Quem critica diz que esse patrimônio já pagou impostos quando foi formado e que famílias ricas levariam seus bens para outros estados. Quem defende diz que grandes heranças concentram riqueza de geração em geração e podem contribuir mais.",
        statement: "Eu apoiaria dobrar o imposto sobre as heranças acima de R$ 2 milhões.",
      },
    ],
  },
  {
    slot: "eco-02",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-02-2a",
        title: "Limite de motoristas de aplicativo",
        situation:
          "Taxistas pedem que a prefeitura limite o número de motoristas de aplicativo, como já faz com as licenças de táxi. Quem defende o limite diz que, sem ele, a renda de todos os motoristas cai e o trânsito piora. Quem é contra diz que o limite encarece as corridas e fecha uma fonte de renda para quem precisa trabalhar.",
        statement: "A prefeitura não deveria limitar o número de motoristas de aplicativo.",
      },
      {
        id: "eco-02-2b",
        title: "Limite para o aluguel por temporada",
        situation:
          "Em uma cidade turística, um em cada cinco apartamentos do centro passou a ser alugado por temporada em aplicativos. Os proprietários dizem que esse aluguel completa a renda deles e traz turistas que movimentam o comércio. Hotéis e associações de moradores pedem um limite, dizendo que os aluguéis para quem mora na cidade subiram muito.",
        statement: "A prefeitura não deveria limitar o número de imóveis alugados por temporada.",
      },
    ],
  },
  {
    slot: "eco-03",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-03-2a",
        title: "Renda mensal para famílias de baixa renda",
        situation:
          "Um estado avalia pagar R$ 300 por mês a 200 mil famílias de baixa renda. Para isso, teria de adiar obras em estradas ou aumentar um imposto estadual. Quem defende diz que o dinheiro garante comida na mesa e circula no comércio local. Quem critica diz que as estradas também geram empregos e que benefícios permanentes desestimulam a busca por trabalho.",
        statement: "Eu apoiaria criar o benefício mensal para essas famílias.",
      },
      {
        id: "eco-03-2b",
        title: "Desconto na conta de luz para famílias de baixa renda",
        situation:
          "Um estado avalia pagar metade da conta de luz de famílias de baixa renda, cobrindo o custo com um aumento na tarifa dos demais consumidores. Quem critica diz que a conta ficaria mais cara para pequenos comércios e para famílias que ganham pouco, mas estão acima do limite do programa. Quem defende diz que a energia é essencial e pesa muito no orçamento das famílias mais pobres.",
        statement: "Eu apoiaria o desconto na conta de luz dessas famílias.",
      },
    ],
  },
  {
    slot: "eco-04",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-04-2a",
        title: "Concessão do serviço de água a uma empresa",
        situation:
          "A empresa pública de água de uma cidade não tem dinheiro para levar esgoto a todos os bairros. Uma empresa privada assumiria o serviço por 30 anos, com metas de investimento fiscalizadas por uma agência. Quem defende diz que a empresa privada tem capital para fazer as obras mais rápido. Quem critica diz que a tarifa tende a subir e que água não deveria gerar lucro.",
        statement: "Eu apoiaria conceder o serviço de água à empresa privada.",
      },
      {
        id: "eco-04-2b",
        title: "Concessão de parques a uma empresa",
        situation:
          "Uma cidade gasta pouco com seus parques. A proposta concede dois deles a uma empresa por 20 anos: a entrada segue gratuita, e a empresa lucra com restaurantes, estacionamento e eventos. Quem critica diz que o espaço público vira negócio e que eventos pagos restringem o uso pelos moradores. Quem defende diz que a prefeitura economiza e os parques ficam mais bem cuidados.",
        statement: "Eu apoiaria conceder os parques à empresa.",
      },
    ],
  },
  {
    slot: "eco-05",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-05-2a",
        title: "Salário mínimo acima da inflação",
        situation:
          "O governo federal propõe que o salário mínimo do próximo ano suba 5% acima da inflação. Quem defende diz que o aumento melhora a vida de milhões de trabalhadores e aposentados e movimenta o comércio. Quem critica diz que pequenos negócios teriam de demitir ou deixar de contratar e que as contas da previdência ficariam mais pesadas.",
        statement: "Eu apoiaria o aumento de 5% acima da inflação.",
      },
      {
        id: "eco-05-2b",
        title: "Jornada de 40 horas sem corte de salário",
        situation:
          "Uma proposta reduz a jornada máxima de trabalho de 44 para 40 horas semanais, sem redução de salário. Quem critica diz que o custo de cada hora trabalhada sobe, o que pode levar a demissões e a preços mais altos. Quem defende diz que as pessoas ganhariam tempo para a família e o descanso e que as empresas tenderiam a contratar mais.",
        statement: "Eu apoiaria reduzir a jornada para 40 horas sem redução de salário.",
      },
    ],
  },
  {
    slot: "eco-06",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-06-2a",
        title: "Abrir um negócio antes da vistoria",
        situation:
          "Abrir uma padaria exige várias licenças e pode levar meses. A proposta permite começar a funcionar com uma declaração do dono, deixando a vistoria para depois, com multa para quem descumprir as regras. Quem defende diz que a demora trava empregos e empurra pessoas para a informalidade. Quem critica diz que falhas de higiene e de segurança só apareceriam depois de alguém ser prejudicado.",
        statement: "Eu apoiaria permitir que o negócio abra antes da vistoria.",
      },
      {
        id: "eco-06-2b",
        title: "Comércio aberto aos domingos e feriados",
        situation:
          "Uma cidade exige autorização especial para as lojas abrirem aos domingos e feriados. A proposta deixa cada comerciante escolher seus dias e horários. Quem critica diz que os comerciários perderiam os domingos com a família e que pequenos lojistas não acompanhariam as grandes redes. Quem defende diz que a regra atual limita vendas e empregos e não combina com a rotina dos consumidores.",
        statement: "Cada comerciante deveria poder escolher seus dias e horários de funcionamento.",
      },
    ],
  },
  {
    slot: "eco-07",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-07-2a",
        title: "Postos públicos ou vales para clínicas particulares",
        situation:
          "Para reduzir a fila de consultas, um município pode contratar médicos para os postos de saúde ou dar vales para consultas em clínicas particulares, com custo parecido. Quem prefere os postos diz que eles fortalecem o SUS e também cuidam da prevenção. Quem prefere os vales diz que as clínicas já existem e atenderiam mais rápido.",
        statement: "O município deveria contratar médicos para os postos públicos em vez de dar os vales.",
      },
      {
        id: "eco-07-2b",
        title: "Creches públicas ou vagas em creches particulares",
        situation:
          "Faltam 2 mil vagas em creches. Com o mesmo dinheiro, a prefeitura pode construir creches públicas, prontas em três anos, ou comprar vagas em creches particulares já para o próximo ano. Quem prefere comprar diz que as famílias precisam da vaga agora. Quem prefere construir diz que as creches ficariam para a cidade, com padrão de atendimento garantido.",
        statement: "A prefeitura deveria construir as creches públicas em vez de comprar as vagas.",
      },
    ],
  },
  {
    slot: "eco-08",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-08-2a",
        title: "Imposto sobre calçados importados",
        situation:
          "Fábricas de calçados pedem que o governo aumente o imposto sobre calçados importados. Quem defende a medida diz que ela protege milhares de empregos no país. Quem é contra diz que os consumidores pagariam mais caro e que proteger um setor da concorrência reduz o incentivo para que ele melhore.",
        statement: "O governo deveria manter baixo o imposto sobre calçados importados.",
      },
      {
        id: "eco-08-2b",
        title: "Peças nacionais nas compras do governo",
        situation:
          "Um governo vai comprar ônibus e equipamentos hospitalares. A proposta exige que metade das peças seja fabricada no país, mesmo que isso custe mais. Quem critica diz que, pagando mais caro, o governo compraria menos ônibus e equipamentos com o mesmo orçamento. Quem defende diz que o dinheiro público deve gerar empregos e fortalecer a indústria do país.",
        statement: "O governo deveria comprar pelo melhor preço e qualidade, sem exigir peças fabricadas no país.",
      },
    ],
  },
  {
    slot: "eco-09",
    dimension: "economia",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "eco-09-2a",
        title: "Previdência para entregadores de aplicativo",
        situation:
          "Entregadores de aplicativo não têm aposentadoria nem auxílio em caso de acidente pagos pela empresa. A proposta obriga as plataformas a contribuir para a previdência deles. Quem defende diz que quem trabalha todos os dias precisa de proteção. Quem critica diz que o custo iria para o preço das entregas e que muitos entregadores preferem a flexibilidade de hoje.",
        statement: "Eu apoiaria obrigar as plataformas a contribuir para a previdência dos entregadores.",
      },
      {
        id: "eco-09-2b",
        title: "Seguro e previdência para diaristas de aplicativo",
        situation:
          "Diaristas contratadas por aplicativo trabalham sem seguro contra acidentes nem contribuição para a aposentadoria. A proposta obriga as plataformas a pagar as duas coisas. Quem critica diz que o serviço ficaria mais caro e que parte dos clientes voltaria a contratar fora do aplicativo, sem proteção alguma. Quem defende diz que a empresa que lucra com o serviço deve dividir os riscos.",
        statement: "Eu apoiaria obrigar as plataformas a pagar o seguro e a previdência das diaristas.",
      },
    ],
  },
  {
    slot: "eco-10",
    dimension: "economia",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "eco-10-2a",
        title: "Cortar gastos ou aumentar impostos",
        situation:
          "Um estado gasta mais do que arrecada. As saídas principais são cortar despesas, inclusive em programas sociais e obras, ou aumentar impostos. Quem prefere cortar diz que o governo precisa gastar melhor antes de pedir mais dinheiro à população. Quem prefere aumentar impostos diz que os cortes atingem primeiro quem depende dos serviços públicos.",
        statement: "O estado deveria priorizar o corte de despesas em vez do aumento de impostos.",
      },
      {
        id: "eco-10-2b",
        title: "Teto para os gastos do estado",
        situation:
          "A proposta limita, por dez anos, o crescimento dos gastos de um estado à inflação do ano anterior. Quem critica diz que a população cresce e envelhece e que saúde e educação precisariam de mais dinheiro do que o teto permite. Quem defende diz que o teto obriga o governo a escolher prioridades e evita dívidas que ficariam para as próximas gerações.",
        statement: "Eu apoiaria o teto de gastos por dez anos.",
      },
    ],
  },

  // Bloco 2 — Liberdades civis e exercício da autoridade
  {
    slot: "lib-01",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-01-2a",
        title: "Câmeras de vigilância nas ruas",
        situation:
          "Uma cidade quer instalar 2 mil câmeras nas ruas, com imagens guardadas por 30 dias e acessíveis à polícia. Quem defende diz que as câmeras inibem crimes e ajudam a esclarecer casos. Quem critica diz que toda a população passaria a ser vigiada o tempo todo e que as imagens poderiam ser usadas para outros fins.",
        statement: "Eu apoiaria a instalação das câmeras.",
      },
      {
        id: "lib-01-2b",
        title: "Reconhecimento facial no metrô",
        situation:
          "Uma cidade quer usar reconhecimento facial nas estações de metrô para encontrar pessoas com mandado de prisão. Quem critica diz que esses sistemas erram e que pessoas inocentes já foram abordadas por engano em outros lugares. Quem defende diz que a tecnologia ajudou a prender foragidos em outras cidades e que cada alerta é conferido por um policial.",
        statement: "Eu apoiaria o uso de reconhecimento facial nas estações.",
      },
    ],
  },
  {
    slot: "lib-02",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-02-2a",
        title: "Vídeos que ofendem o prefeito",
        situation:
          "Uma pessoa chama o prefeito de incompetente e covarde em vídeos nas redes sociais, sem ameaças nem acusações de crime. O prefeito pede à Justiça que os vídeos sejam retirados. Para uns, criticar autoridades com dureza faz parte da democracia. Para outros, ofensa pessoal não é crítica e degrada o debate público.",
        statement: "Os vídeos devem continuar no ar.",
      },
      {
        id: "lib-02-2b",
        title: "Sátira sobre um juiz",
        situation:
          "Um humorista publica vídeos imitando de forma grosseira um juiz conhecido, sem ameaças nem acusações falsas. O juiz pede a retirada dos vídeos. Quem apoia o juiz diz que ridicularizar quem julga enfraquece a confiança na Justiça. Quem apoia o humorista diz que as autoridades precisam tolerar a sátira.",
        statement: "O humorista deve poder manter os vídeos no ar.",
      },
    ],
  },
  {
    slot: "lib-03",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-03-2a",
        title: "Revistas policiais em um bairro",
        situation:
          "Depois de uma série de assaltos noturnos em um bairro, a polícia propõe revistar com mais frequência, por três meses, quem circula ali à noite. Quem apoia diz que a presença policial afasta os assaltantes. Quem critica diz que moradores, sobretudo jovens, seriam revistados sem motivo e que isso aumenta a desconfiança em relação à polícia.",
        statement: "Eu apoiaria as revistas mais frequentes durante esses três meses.",
      },
      {
        id: "lib-03-2b",
        title: "Toque de recolher para adolescentes",
        situation:
          "Depois de brigas entre jovens à noite, uma cidade propõe proibir, por seis meses, que menores de 16 anos circulem desacompanhados depois das 23h. Quem critica diz que a medida pune todos os jovens pelo que alguns fizeram e atrapalha quem estuda ou trabalha à noite. Quem defende diz que a medida protege os adolescentes e ajuda as famílias.",
        statement: "Eu apoiaria o toque de recolher para menores de 16 anos.",
      },
    ],
  },
  {
    slot: "lib-04",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-04-2a",
        title: "Mensagens de celular sem ordem judicial",
        situation:
          "Uma proposta permite que a polícia leia as mensagens de celular de suspeitos de sequestro sem esperar a autorização de um juiz, comunicando a Justiça em até 24 horas. Quem defende diz que, nesses casos, algumas horas podem salvar uma vida. Quem critica diz que exceções assim tendem a se ampliar e abrem espaço para abusos.",
        statement: "O acesso às mensagens deveria depender sempre de autorização prévia de um juiz.",
      },
      {
        id: "lib-04-2b",
        title: "Entrada em casas a partir de denúncia anônima",
        situation:
          "Uma proposta permite que a polícia entre em uma casa sem mandado quando receber uma denúncia anônima de que ali há armas ou drogas. Quem critica diz que qualquer pessoa poderia usar denúncias falsas para provocar a invasão de uma casa. Quem defende diz que, até o mandado sair, as provas desaparecem.",
        statement: "A entrada da polícia em uma casa, nesses casos, deveria depender de mandado judicial.",
      },
    ],
  },
  {
    slot: "lib-05",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-05-2a",
        title: "Detectores de metal na escola",
        situation:
          "Uma escola pública teve brigas com objetos cortantes. A direção quer instalar detectores de metal na entrada e revistar a mochila de quem fizer o alarme disparar. Para uns, a medida protege estudantes e professores. Para outros, transforma a escola em um ambiente de suspeita e não resolve as causas da violência.",
        statement: "Eu apoiaria os detectores de metal na entrada da escola.",
      },
      {
        id: "lib-05-2b",
        title: "Cadastro biométrico nos estádios",
        situation:
          "Depois de brigas entre torcidas, um estado quer exigir cadastro com foto e impressão digital para a entrada nos estádios. Quem critica diz que milhões de torcedores teriam dados pessoais guardados pelo governo por causa de poucos. Quem defende diz que assim os envolvidos em brigas seriam identificados e impedidos de voltar.",
        statement: "Eu apoiaria o cadastro biométrico obrigatório nos estádios.",
      },
    ],
  },
  {
    slot: "lib-06",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-06-2a",
        title: "Protesto que fecha uma avenida",
        situation:
          "Um grupo anuncia um protesto que vai ocupar uma avenida movimentada por três horas, no horário de pico. Para quem defende o ato, protestar em lugares visíveis é um direito, e algum transtorno faz parte. Para quem critica, milhares de pessoas sem relação com a causa perderiam horas no trânsito, e ambulâncias poderiam ficar presas.",
        statement: "O protesto deve ser permitido na avenida.",
      },
      {
        id: "lib-06-2b",
        title: "Acampamento de protesto em uma praça",
        situation:
          "Um grupo monta barracas em uma praça central para protestar contra o governo e anuncia que vai ficar duas semanas. Quem critica diz que a praça é de todos e que o comércio do entorno perderia clientes. Quem defende diz que ocupar o espaço público é uma forma legítima de pressão política.",
        statement: "O acampamento deve ser permitido durante as duas semanas.",
      },
    ],
  },
  {
    slot: "lib-07",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-07-2a",
        title: "Remoção de publicações durante uma epidemia",
        situation:
          "Durante uma epidemia, o governo quer obrigar as redes sociais a remover em até duas horas as publicações que o Ministério da Saúde considerar falsas. Quem defende diz que boatos sobre vacinas e remédios custam vidas. Quem critica diz que o governo passaria a decidir o que é verdade e que informações corretas também poderiam ser apagadas.",
        statement: "Eu apoiaria obrigar as redes sociais a remover essas publicações.",
      },
      {
        id: "lib-07-2b",
        title: "Suspensão de perfis durante um desastre",
        situation:
          "Durante uma enchente, boatos sobre o rompimento de uma barragem causam pânico. A Defesa Civil quer que as redes suspendam por cinco dias os perfis que mais espalharem a mensagem. Quem critica diz que muita gente compartilha por medo, sem má-fé, e que a suspensão é uma punição sem julgamento. Quem defende diz que o pânico pode levar pessoas a sair de áreas seguras para áreas de risco.",
        statement: "Eu apoiaria suspender esses perfis durante a emergência.",
      },
    ],
  },
  {
    slot: "lib-08",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-08-2a",
        title: "Transfusão recusada por motivo religioso",
        situation:
          "Um adulto lúcido recusa uma transfusão de sangue por motivo religioso, sabendo que pode morrer. A equipe médica quer pedir à Justiça autorização para fazer a transfusão mesmo assim. Para uns, cada adulto decide sobre o próprio corpo, mesmo quando a escolha parece errada aos outros. Para outros, o dever de salvar uma vida deve vir antes.",
        statement: "A recusa dessa pessoa deve ser respeitada.",
      },
      {
        id: "lib-08-2b",
        title: "Proibição de saltos em uma cachoeira",
        situation:
          "Depois de acidentes graves, uma cidade proíbe os saltos de uma pedra em uma cachoeira, com multa para quem desobedecer. A prefeitura diz que os resgates custam caro e põem em risco também os bombeiros. Moradores adultos dizem que conhecem os riscos e que a decisão de saltar é deles.",
        statement: "Adultos deveriam poder continuar saltando, por conta e risco próprios.",
      },
    ],
  },
  {
    slot: "lib-09",
    dimension: "liberdades",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "lib-09-2a",
        title: "Pena maior para furtos repetidos",
        situation:
          "Uma proposta dobra a pena de prisão de quem for condenado por furto pela terceira vez. Quem defende diz que poucas pessoas cometem a maioria dos furtos e que a punição precisa crescer com a repetição. Quem critica diz que as prisões já estão lotadas e que manter presos por mais tempo os autores de furtos os aproxima do crime organizado.",
        statement: "Eu apoiaria dobrar a pena na terceira condenação por furto.",
      },
      {
        id: "lib-09-2b",
        title: "Mais tempo em regime fechado",
        situation:
          "Condenados por roubo podem passar ao regime semiaberto depois de cumprir parte da pena. A proposta aumenta essa parte, mantendo-os mais tempo no regime fechado. Quem critica diz que o custo das prisões sobe e que a volta gradual ao convívio fica mais difícil, favorecendo a reincidência. Quem defende diz que a sensação de impunidade diminui e que a sociedade fica protegida por mais tempo.",
        statement: "Eu apoiaria aumentar o tempo em regime fechado para condenados por roubo.",
      },
    ],
  },
  {
    slot: "lib-10",
    dimension: "liberdades",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "lib-10-2a",
        title: "Dados do cartão de transporte para a polícia",
        situation:
          "O cartão de transporte de uma cidade registra onde e quando cada passageiro embarca. A polícia quer acesso direto a esses dados para localizar suspeitos, sem pedir autorização a um juiz em cada caso. Quem defende diz que isso agilizaria as investigações. Quem critica diz que os deslocamentos de toda a população ficariam expostos, sem controle.",
        statement: "A polícia só deveria acessar esses dados com ordem judicial em cada caso.",
      },
      {
        id: "lib-10-2b",
        title: "Cadastro de pacientes acessado pela polícia",
        situation:
          "Uma secretaria de saúde quer dar à polícia acesso direto ao cadastro de pacientes da rede pública, para localizar pessoas procuradas. Quem critica diz que pessoas com mandado deixariam de buscar atendimento e que os dados de saúde de todos ficariam expostos. Quem defende diz que o cadastro tem endereços atualizados que ajudariam a encontrar foragidos.",
        statement: "A polícia só deveria acessar esse cadastro com ordem judicial em cada caso.",
      },
    ],
  },

  // Bloco 3 — Costumes, tradição e mudança social
  {
    slot: "cos-01",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-01-2a",
        title: "Diferentes formatos de família nas aulas",
        situation:
          "Uma escola pública quer incluir, nas aulas para crianças de 8 a 10 anos, histórias com diferentes formatos de família, como as criadas por avós, por um só responsável ou por dois pais ou duas mães. Parte das famílias apoia, dizendo que todas as crianças precisam se ver respeitadas na escola. Outra parte é contra, dizendo que o tema cabe às famílias e não deveria ser tratado nessa idade.",
        statement: "Eu apoiaria incluir essas histórias nas aulas.",
      },
      {
        id: "cos-01-2b",
        title: "Casais do mesmo sexo em campanha de adoção",
        situation:
          "Uma prefeitura prepara uma campanha para estimular a adoção e quer mostrar diferentes famílias adotantes, incluindo casais do mesmo sexo. Quem critica diz que o dinheiro público não deveria ser usado em um tema que divide a população. Quem defende diz que a campanha deve mostrar as famílias que de fato adotam.",
        statement: "Eu apoiaria mostrar casais do mesmo sexo na campanha.",
      },
    ],
  },
  {
    slot: "cos-02",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-02-2a",
        title: "Crucifixos no fórum",
        situation:
          "Crucifixos estão pendurados há décadas nas salas de audiência do fórum de uma cidade. Um grupo pede a retirada, porque o Estado é laico e deve tratar todas as crenças da mesma forma. Outro grupo quer mantê-los, porque fazem parte da história e da cultura locais.",
        statement: "Os crucifixos deveriam permanecer nas salas do fórum.",
      },
      {
        id: "cos-02-2b",
        title: "Oração no início das sessões da Câmara",
        situation:
          "As sessões da Câmara de uma cidade começam há décadas com uma oração cristã. Alguns vereadores querem manter a oração, porque ela expressa a fé da maioria dos moradores. Outros querem trocá-la por um minuto de silêncio, para incluir quem tem outra religião ou nenhuma.",
        statement: "A oração deveria ser mantida no início das sessões.",
      },
    ],
  },
  {
    slot: "cos-03",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-03-2a",
        title: "Dispensa da aula sobre evolução",
        situation:
          "Uma família pede que a escola dispense o filho das aulas sobre a teoria da evolução, que contrariam a fé da família. Quem apoia o pedido diz que os pais têm o direito de educar os filhos segundo suas crenças. Quem é contra diz que o currículo comum garante que todas as crianças aprendam o mesmo conteúdo científico.",
        statement: "A escola deveria aceitar o pedido de dispensa.",
      },
      {
        id: "cos-03-2b",
        title: "Educação dos filhos em casa",
        situation:
          "Uma proposta permite que as famílias eduquem os filhos em casa, sem matrícula em escola, com provas anuais para acompanhar o aprendizado. Quem critica diz que as crianças perderiam a convivência com quem pensa diferente e que casos de negligência ficariam mais difíceis de perceber. Quem defende diz que os pais devem poder escolher a educação que dão aos filhos.",
        statement: "As famílias deveriam poder educar os filhos em casa, com as provas anuais.",
      },
    ],
  },
  {
    slot: "cos-04",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-04-2a",
        title: "Licença-paternidade igual à das mães",
        situation:
          "Uma proposta amplia a licença-paternidade de 5 dias para 4 meses, igual à das mães. Quem defende diz que isso divide o cuidado com os filhos e reduz a discriminação contra mulheres na contratação. Quem critica diz que os primeiros meses do bebê pedem mais a presença da mãe e que cada família deveria decidir como dividir os cuidados.",
        statement: "Eu apoiaria a licença de quatro meses para os pais.",
      },
      {
        id: "cos-04-2b",
        title: "Cota para mulheres na direção de estatais",
        situation:
          "Nas empresas públicas de um estado, 9 em cada 10 diretores são homens. A proposta exige que ao menos um terço das diretorias seja ocupado por mulheres. Quem critica diz que os cargos devem ser ocupados por mérito, sem critério de sexo. Quem defende diz que, sem regra, a desigualdade se mantém por gerações.",
        statement: "Eu apoiaria a cota de um terço para mulheres nas diretorias.",
      },
    ],
  },
  {
    slot: "cos-05",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-05-2a",
        title: "Dinheiro público para uma festa religiosa",
        situation:
          "Uma festa católica tradicional recebe R$ 500 mil da prefeitura todos os anos e atrai turistas. Uma proposta corta esse apoio. Quem defende o corte diz que o Estado não deve financiar eventos de uma religião. Quem defende o apoio diz que a festa é patrimônio cultural da cidade e movimenta a economia local.",
        statement: "A prefeitura deveria continuar financiando a festa.",
      },
      {
        id: "cos-05-2b",
        title: "Feriado do padroeiro",
        situation:
          "Uma cidade tem feriado no dia do santo padroeiro. Uma proposta transforma a data em dia comemorativo, sem folga. Quem quer manter o feriado diz que a data faz parte da identidade da cidade há gerações. Quem defende a mudança diz que o Estado é laico e que o comércio perde vendas com o feriado.",
        statement: "O feriado do padroeiro deveria ser mantido.",
      },
    ],
  },
  {
    slot: "cos-06",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-06-2a",
        title: "Nome social na escola",
        situation:
          "Um estudante de 15 anos, com autorização dos pais, pede para ser chamado na escola pelo nome com que se identifica, diferente do nome de registro. Parte da comunidade escolar apoia, dizendo que isso evita constrangimentos e abandono escolar. Outra parte é contra, dizendo que a escola não deveria tratar de identidade de gênero com adolescentes.",
        statement: "A escola deveria atender ao pedido do estudante.",
      },
      {
        id: "cos-06-2b",
        title: "Nome social no trabalho",
        situation:
          "Uma funcionária trans de uma empresa pública pede para usar o nome social no crachá e no e-mail de trabalho. Alguns colegas dizem que documentos de trabalho deveriam seguir o nome de registro. Outros dizem que atender ao pedido é uma questão de respeito.",
        statement: "A empresa deveria atender ao pedido da funcionária.",
      },
    ],
  },
  {
    slot: "cos-07",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-07-2a",
        title: "Família de pai, mãe e filhos como prioridade",
        situation:
          "Uma proposta de lei define como prioridade das políticas sociais o fortalecimento da família formada por pai, mãe e filhos. Quem defende diz que essa família é a base da sociedade e a que mais protege as crianças. Quem critica diz que o Estado passaria a valorizar mais umas famílias do que outras, como as de mães que criam os filhos sozinhas.",
        statement: "Eu apoiaria essa prioridade nas políticas sociais.",
      },
      {
        id: "cos-07-2b",
        title: "Programa público para evitar divórcios",
        situation:
          "Uma prefeitura quer criar cursos e aconselhamento gratuito para casais, com a meta de reduzir os divórcios. Quem critica diz que o poder público não deveria tratar o divórcio como um problema a ser combatido. Quem defende diz que casamentos estáveis fazem bem aos filhos e à comunidade.",
        statement: "Eu apoiaria usar dinheiro público nesse programa.",
      },
    ],
  },
  {
    slot: "cos-08",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-08-2a",
        title: "Placas sobre heróis da cidade",
        situation:
          "Um museu quer revisar as placas que apresentam figuras históricas da cidade apenas como heróis, acrescentando que algumas mantiveram pessoas escravizadas e participaram de ataques contra povos indígenas. Quem apoia diz que a história completa precisa ser contada. Quem critica diz que julgar o passado com os valores de hoje apaga o contexto da época.",
        statement: "Eu apoiaria a revisão das placas.",
      },
      {
        id: "cos-08-2b",
        title: "Troca do nome de uma rua",
        situation:
          "Uma rua central homenageia um político do século XIX que enriqueceu com o tráfico de pessoas escravizadas. Parte dos moradores quer manter o nome: diz que trocá-lo não muda o passado, que a rua se chama assim há 150 anos e que a mudança traz custos para moradores e comerciantes. Outra parte propõe homenagear uma professora negra da cidade, dizendo que uma rua não deveria celebrar quem lucrou com a escravidão.",
        statement: "Eu apoiaria trocar o nome da rua.",
      },
    ],
  },
  {
    slot: "cos-09",
    dimension: "costumes",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "cos-09-2a",
        title: "Educação sexual com autorização dos pais",
        situation:
          "Uma proposta permite tratar de educação sexual na escola apenas no ensino médio e só com os estudantes que tiverem autorização escrita dos responsáveis. Quem defende diz que cabe às famílias decidir quando e como falar do assunto. Quem critica diz que essas aulas ajudam crianças a reconhecer abusos e que justamente quem mais precisa pode ficar sem elas.",
        statement: "Eu apoiaria essa regra para a educação sexual.",
      },
      {
        id: "cos-09-2b",
        title: "Nudez na TV aberta antes das 23h",
        situation:
          "Uma proposta proíbe cenas de nudez e de uso de drogas na TV aberta antes das 23h. Quem critica diz que já existe classificação indicativa e que cabe aos pais, e não ao governo, controlar o que os filhos assistem. Quem defende diz que muitas crianças veem TV sem supervisão e precisam de proteção.",
        statement: "Eu apoiaria proibir essas cenas antes das 23h.",
      },
    ],
  },
  {
    slot: "cos-10",
    dimension: "costumes",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "cos-10-2a",
        title: "Uniforme escolar sem divisão por gênero",
        situation:
          "Uma escola tem uniforme com saia para as meninas e calça para os meninos. A direção propõe que cada estudante escolha qualquer peça. Para quem apoia, a regra atual impõe papéis de gênero e incomoda parte dos estudantes. Para quem é contra, o uniforme atual funciona bem e a mudança abre uma discussão que deveria ficar com as famílias.",
        statement: "Eu apoiaria deixar cada estudante escolher as peças do uniforme.",
      },
      {
        id: "cos-10-2b",
        title: "Brinquedos sem divisão entre meninos e meninas",
        situation:
          "Uma escola de educação infantil decide deixar de separar brinquedos e atividades em “de menino” e “de menina”. Parte das famílias é contra, dizendo que a escola não deveria interferir no modo como cada família educa os filhos sobre ser menino ou menina. Outra parte apoia, dizendo que as crianças devem poder brincar do que gostam.",
        statement: "Eu apoiaria a decisão da escola.",
      },
    ],
  },

  // Bloco 4 — Participação política e organização do poder
  {
    slot: "par-01",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-01-2a",
        title: "Moradores decidem parte das obras",
        situation:
          "Uma prefeitura propõe que 20% do dinheiro de obras seja decidido pelos moradores, em assembleias nos bairros. Quem apoia diz que quem vive no bairro sabe melhor o que falta ali. Quem critica diz que poucas pessoas vão às assembleias e que grupos organizados acabariam decidindo por todos.",
        statement: "Eu apoiaria que os moradores decidissem diretamente essa parte das obras.",
      },
      {
        id: "par-01-2b",
        title: "Votação pela internet para escolher obras",
        situation:
          "Um governo estadual propõe que os moradores de cada região escolham, por votação pela internet, quais obras serão feitas com parte do orçamento. Quem critica diz que obras pouco visíveis, como as de esgoto, perderiam para as mais populares e que técnicos e deputados planejam melhor. Quem defende diz que a decisão ficaria mais próxima da população.",
        statement: "Eu apoiaria escolher essas obras por votação dos moradores.",
      },
    ],
  },
  {
    slot: "par-02",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-02-2a",
        title: "Mandato fixo para quem define os juros",
        situation:
          "A taxa básica de juros é definida por uma diretoria técnica com mandato fixo, que o presidente da República não pode demitir. Quem defende diz que isso evita que os juros sejam baixados por interesse eleitoral, o que gera inflação. Quem critica diz que uma decisão que afeta os empregos e as dívidas de todos deveria ficar com quem foi eleito.",
        statement: "Decisões como essa devem ficar com uma diretoria técnica de mandato fixo.",
      },
      {
        id: "par-02-2b",
        title: "Diretor de escola: prova ou eleição",
        situation:
          "Os diretores das escolas estaduais podem ser escolhidos por prova e análise de currículo ou por eleição entre professores, funcionários, estudantes e famílias. Quem prefere a eleição diz que o diretor precisa do apoio de quem convive com a escola todos os dias. Quem prefere a prova diz que ela seleciona quem tem preparo para administrar uma escola.",
        statement: "Os diretores deveriam ser escolhidos por prova e análise de currículo, e não por eleição.",
      },
    ],
  },
  {
    slot: "par-03",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-03-2a",
        title: "Votação para tirar o prefeito do cargo",
        situation:
          "Uma proposta permite que, com assinaturas de 10% dos eleitores, a cidade faça uma votação para decidir se o prefeito deve deixar o cargo antes do fim do mandato. Quem defende diz que o eleitor deve poder corrigir uma escolha ruim sem esperar quatro anos. Quem critica diz que a cidade viveria em campanha permanente e que os derrotados na eleição usariam o mecanismo para tentar reverter o resultado.",
        statement: "Eu apoiaria criar esse tipo de votação.",
      },
      {
        id: "par-03-2b",
        title: "Votação para derrubar uma lei municipal",
        situation:
          "Uma proposta permite que os eleitores, com assinaturas, convoquem uma votação para derrubar uma lei aprovada pela Câmara Municipal. Quem critica diz que leis necessárias, mas impopulares, como aumentos de tarifa, seriam derrubadas e que os vereadores deixariam de assumir responsabilidades. Quem defende diz que a população teria a palavra final sobre as leis que a afetam.",
        statement: "Eu apoiaria que os eleitores pudessem convocar essa votação.",
      },
    ],
  },
  {
    slot: "par-04",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-04-2a",
        title: "Aposentadoria: Congresso ou plebiscito",
        situation:
          "O governo quer mudar as regras da aposentadoria. Uma opção é deixar a decisão com o Congresso; outra é fazer um plebiscito. Quem prefere o Congresso diz que o tema tem muitos detalhes técnicos e exige negociação. Quem prefere o plebiscito diz que uma mudança que afeta a vida de todos deveria ser decidida diretamente pelos eleitores.",
        statement: "A mudança deveria ser decidida pelo Congresso, e não por plebiscito.",
      },
      {
        id: "par-04-2b",
        title: "Plano diretor: Câmara ou consulta popular",
        situation:
          "O plano diretor define onde a cidade pode crescer e quantos andares os prédios podem ter. Uma opção é aprová-lo na Câmara, depois de audiências públicas; outra é submeter os pontos principais a uma consulta popular. Quem prefere a consulta diz que os moradores devem decidir como a cidade vai mudar. Quem prefere a Câmara diz que o plano tem centenas de regras ligadas entre si.",
        statement: "O plano diretor deveria ser decidido pela Câmara, sem consulta popular.",
      },
    ],
  },
  {
    slot: "par-05",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-05-2a",
        title: "Escolas e postos de saúde para os municípios",
        situation:
          "Um estado propõe passar aos municípios a gestão das escolas e dos postos de saúde que hoje administra, junto com o dinheiro para mantê-los. Quem defende diz que a prefeitura está mais perto e conhece melhor as necessidades locais. Quem critica diz que municípios pequenos não têm equipe para isso e que a qualidade ficaria desigual entre as cidades.",
        statement: "Eu apoiaria passar essa gestão aos municípios.",
      },
      {
        id: "par-05-2b",
        title: "Subprefeituras com orçamento próprio",
        situation:
          "Em uma cidade grande, as decisões sobre limpeza, praças e pequenas obras ficam na sede da prefeitura. A proposta cria subprefeituras com orçamento próprio em cada região. Quem critica diz que a medida cria cargos e custos e que as subprefeituras podem virar moeda de troca política. Quem defende diz que os problemas seriam resolvidos mais perto de quem convive com eles.",
        statement: "Eu apoiaria criar as subprefeituras com orçamento próprio.",
      },
    ],
  },
  {
    slot: "par-06",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-06-2a",
        title: "Desempenho mínimo para partidos",
        situation:
          "Partidos que não alcançam uma votação mínima perdem acesso ao fundo partidário e ao tempo de propaganda. Quem defende diz que a regra reduz o número de partidos e facilita formar maiorias para governar. Quem critica diz que ela dificulta o surgimento de novas ideias e deixa os eleitores de partidos pequenos sem representação.",
        statement: "A exigência de desempenho mínimo deveria ser mantida.",
      },
      {
        id: "par-06-2b",
        title: "Mais assinaturas para criar partidos",
        situation:
          "Para criar um partido, é preciso reunir assinaturas de eleitores em vários estados. A proposta aumenta esse mínimo. Quem critica diz que novos movimentos teriam mais dificuldade para disputar eleições com os partidos já estabelecidos. Quem defende diz que haveria menos partidos sem eleitores reais, criados para negociar tempo de TV e recursos.",
        statement: "Eu apoiaria aumentar o número mínimo de assinaturas.",
      },
    ],
  },
  {
    slot: "par-07",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-07-2a",
        title: "Poder de veto para o conselho de saúde",
        situation:
          "Um conselho municipal de saúde, formado por usuários, trabalhadores e gestores, quer poder vetar o fechamento de postos e a terceirização de serviços. Quem apoia diz que quem usa o serviço deve ter voz real nas decisões. Quem critica diz que quem responde pelos resultados é o prefeito eleito, que não poderia ser travado por um conselho que não passou pelas urnas.",
        statement: "Eu apoiaria dar esse poder de veto ao conselho.",
      },
      {
        id: "par-07-2b",
        title: "Conselhos escolares decidem a verba",
        situation:
          "A secretaria de educação define como cada escola gasta a verba de manutenção. A proposta passa a decisão aos conselhos escolares, formados por famílias, estudantes, professores e funcionários. Quem critica diz que os conselhos não têm preparo para compras públicas e que o controle dos gastos ficaria mais difícil. Quem defende diz que quem está na escola sabe o que é mais urgente.",
        statement: "Eu apoiaria passar essa decisão aos conselhos escolares.",
      },
    ],
  },
  {
    slot: "par-08",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-08-2a",
        title: "Supremo anula lei aprovada pelo Congresso",
        situation:
          "O Congresso aprova, por ampla maioria, uma lei que o Supremo Tribunal Federal considera contrária à Constituição e anula. Para uns, os tribunais devem poder barrar leis que violam a Constituição, mesmo contra a maioria. Para outros, juízes que não foram eleitos não deveriam derrubar o que os representantes do povo decidiram.",
        statement: "É importante que os tribunais possam anular leis aprovadas pela maioria.",
      },
      {
        id: "par-08-2b",
        title: "Tribunal de contas suspende uma obra",
        situation:
          "Um tribunal de contas suspende uma obra aprovada pelo governo e pela Assembleia, por suspeita de preço acima do mercado, até o fim de uma análise que pode levar meses. Quem critica diz que um órgão técnico não deveria paralisar uma decisão de representantes eleitos e que obras paradas também custam caro. Quem defende diz que a suspensão evita prejuízos que depois não se recuperam.",
        statement: "É importante que o tribunal de contas possa suspender a obra.",
      },
    ],
  },
  {
    slot: "par-09",
    dimension: "participacao",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "par-09-2a",
        title: "Prazo para votar projetos de iniciativa popular",
        situation:
          "Cidadãos podem apresentar projetos de lei com assinaturas, mas o Congresso pode deixá-los parados por anos. A proposta obriga a votação em seis meses; vencido o prazo, nenhum outro projeto é votado antes dele. Quem apoia diz que a vontade de milhões de eleitores não pode ser ignorada. Quem critica diz que o Congresso perderia o controle da própria agenda e seria travado por projetos mal preparados.",
        statement: "Eu apoiaria o prazo obrigatório de seis meses.",
      },
      {
        id: "par-09-2b",
        title: "Debate obrigatório de petições",
        situation:
          "Uma Câmara Municipal recebe petições pela internet, mas não é obrigada a analisá-las. A proposta obriga os vereadores a debater em plenário toda petição com 5 mil assinaturas. Quem critica diz que as sessões seriam tomadas por campanhas organizadas nas redes, deixando outros assuntos de lado. Quem defende diz que os moradores ganhariam um canal direto para pautar a Câmara.",
        statement: "Eu apoiaria tornar esse debate obrigatório.",
      },
    ],
  },
  {
    slot: "par-10",
    dimension: "participacao",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "par-10-2a",
        title: "Consulta popular sobre linhas de ônibus",
        situation:
          "Em uma cidade, técnicos da prefeitura definem as linhas de ônibus a partir de pesquisas sobre os trajetos dos passageiros. Moradores querem consulta popular no bairro a cada mudança. Quem prefere os técnicos diz que a rede funciona como um todo e que consultas bairro a bairro a desequilibrariam. Quem prefere a consulta diz que os técnicos não conhecem a rotina de quem depende do ônibus.",
        statement: "As mudanças nas linhas devem continuar com os técnicos, sem consulta popular.",
      },
      {
        id: "par-10-2b",
        title: "Local de um hospital: técnicos ou votação",
        situation:
          "Um estado vai construir um hospital regional. Os técnicos da saúde escolheram o local pelo acesso e pela demanda; moradores de outras cidades da região querem escolher o local por votação. Quem defende a votação diz que a população deve ter a palavra final sobre uma obra paga por todos. Quem defende a escolha técnica diz que o hospital deve ficar onde atende mais gente.",
        statement: "O local deve ser definido pelos técnicos, sem votação.",
      },
    ],
  },

  // Bloco 5 — Desenvolvimento e prioridades socioambientais
  {
    slot: "soc-01",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-01-2a",
        title: "Mina perto de uma cidade pequena",
        situation:
          "Uma mineradora quer abrir uma mina perto de uma cidade de 20 mil habitantes, com 1.500 empregos e uma arrecadação que dobraria o orçamento da prefeitura. Estudos apontam risco de contaminação do rio que abastece a cidade, que a empresa promete controlar. Quem apoia diz que a cidade não pode recusar essa chance de crescer. Quem é contra diz que, se algo der errado, o rio não se recupera.",
        statement: "Eu apoiaria a abertura da mina.",
      },
      {
        id: "soc-01-2b",
        title: "Fábrica de celulose que usa a água de um rio",
        situation:
          "Uma empresa quer instalar uma fábrica de celulose em uma cidade pequena, com 800 empregos. A fábrica usaria um terço da água de um rio que também abastece os agricultores da região e promete tratá-la e devolvê-la. Quem é contra diz que, em anos de seca, faltaria água para as lavouras e para os moradores. Quem apoia diz que a região precisa de indústria e de empregos.",
        statement: "Eu apoiaria a instalação da fábrica.",
      },
    ],
  },
  {
    slot: "soc-02",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-02-2a",
        title: "Ampliação de uma área de proteção ambiental",
        situation:
          "Um município pode ampliar uma área de proteção ambiental que guarda nascentes. A medida proibiria novas lavouras e loteamentos em 15% do território. Quem apoia diz que, sem as nascentes, faltará água para todos no futuro. Quem é contra diz que produtores perderiam renda e que a cidade deixaria de crescer.",
        statement: "Eu apoiaria ampliar a área de proteção.",
      },
      {
        id: "soc-02-2b",
        title: "Construções em um manguezal",
        situation:
          "Uma cidade litorânea pode proibir novas construções em um manguezal, o que impediria uma marina e um hotel com 400 empregos. Quem é contra a proibição diz que a cidade tem desemprego alto e que o projeto ocuparia só uma parte da área. Quem apoia diz que o manguezal é berçário de peixes e protege a costa contra enchentes.",
        statement: "Eu apoiaria proibir as construções no manguezal.",
      },
    ],
  },
  {
    slot: "soc-03",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-03-2a",
        title: "Licenciamento mais rápido para obras estratégicas",
        situation:
          "O licenciamento ambiental de estradas, ferrovias e portos pode levar anos. A proposta corta prazos e etapas da análise para as obras que o governo considerar estratégicas. Quem defende diz que a demora encarece as obras e atrasa o desenvolvimento. Quem critica diz que menos análise significa mais risco de danos que poderiam ter sido evitados.",
        statement: "Eu apoiaria reduzir os prazos e as etapas do licenciamento dessas obras.",
      },
      {
        id: "soc-03-2b",
        title: "Licença ambiental por autodeclaração",
        situation:
          "A proposta permite que granjas e pequenas indústrias obtenham a licença ambiental com uma declaração do próprio dono, deixando a fiscalização para depois. Quem critica diz que os problemas só seriam descobertos depois do dano e que a fiscalização já não dá conta hoje. Quem defende diz que o órgão ambiental poderia concentrar esforços nos grandes empreendimentos.",
        statement: "Eu apoiaria a licença por autodeclaração para esses empreendimentos.",
      },
    ],
  },
  {
    slot: "soc-04",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-04-2a",
        title: "Demarcação de terra indígena",
        situation:
          "Estudos oficiais concluem que uma área com fazendas produtivas é de ocupação tradicional de um povo indígena. A demarcação exigiria a saída dos fazendeiros, com indenização. Quem apoia diz que a Constituição garante essas terras aos povos indígenas. Quem critica diz que as famílias de fazendeiros estão ali há gerações, com títulos de propriedade dados pelo próprio governo.",
        statement: "Eu apoiaria a demarcação da área.",
      },
      {
        id: "soc-04-2b",
        title: "Território quilombola",
        situation:
          "Estudos oficiais reconhecem que uma comunidade quilombola vive há gerações em uma área hoje usada em parte por uma empresa de reflorestamento. A titulação do território exigiria a saída da empresa, com indenização. Quem é contra diz que a empresa comprou a área legalmente e gera empregos na região. Quem apoia diz que a comunidade tem direito à terra que ocupa há gerações.",
        statement: "Eu apoiaria a titulação do território para a comunidade.",
      },
    ],
  },
  {
    slot: "soc-05",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-05-2a",
        title: "Petróleo perto da foz de um rio",
        situation:
          "Foi encontrado petróleo no mar, perto da foz de um grande rio, em uma região de grande diversidade de espécies. A exploração renderia bilhões em royalties para educação e saúde. Quem apoia diz que o país não pode abrir mão dessa riqueza e que há tecnologia para evitar acidentes. Quem é contra diz que um vazamento naquela região causaria danos irreversíveis.",
        statement: "Eu apoiaria a exploração do petróleo nessa região.",
      },
      {
        id: "soc-05-2b",
        title: "Ampliação de porto perto de recifes",
        situation:
          "Um estado quer ampliar um porto para exportar mais grãos, com novos empregos e mais arrecadação. A obra exigiria dragar uma área perto de recifes de coral usados pela pesca artesanal. Quem é contra diz que a dragagem pode destruir os recifes e o sustento de centenas de pescadores. Quem apoia diz que o porto é essencial para a economia do estado.",
        statement: "Eu apoiaria ampliar o porto.",
      },
    ],
  },
  {
    slot: "soc-06",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-06-2a",
        title: "Imposto sobre gasolina e diesel",
        situation:
          "Uma proposta cria um imposto sobre gasolina e diesel para financiar ônibus e energia renovável. O preço da gasolina subiria cerca de 10%. Quem defende diz que poluir precisa custar mais e que a arrecadação melhoraria o transporte coletivo. Quem critica diz que o aumento pesaria mais para motoristas de aplicativo, caminhoneiros e quem mora longe do trabalho.",
        statement: "Eu apoiaria criar o imposto sobre gasolina e diesel.",
      },
      {
        id: "soc-06-2b",
        title: "Pedágio urbano no centro",
        situation:
          "Uma cidade grande propõe cobrar uma taxa diária dos carros que entram no centro nos horários de pico, para reduzir a poluição e financiar ônibus. Quem critica diz que quem depende do carro para trabalhar pagaria mais, enquanto quem tem dinheiro continuaria circulando. Quem defende diz que os congestionamentos e a poluição diminuiriam.",
        statement: "Eu apoiaria a cobrança da taxa.",
      },
    ],
  },
  {
    slot: "soc-07",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-07-2a",
        title: "Hidrelétrica que alaga floresta",
        situation:
          "O governo pode construir uma hidrelétrica que baratearia a energia para milhões de pessoas. A represa alagaria uma área de floresta e obrigaria 3 mil famílias ribeirinhas a se mudar, com indenização. Quem apoia diz que a energia é limpa e necessária para o país crescer. Quem é contra diz que a floresta não volta e que as famílias perderiam seu modo de vida.",
        statement: "Eu apoiaria construir a hidrelétrica.",
      },
      {
        id: "soc-07-2b",
        title: "Parque eólico em dunas de pescadores",
        situation:
          "Uma empresa quer instalar torres de energia eólica em dunas onde vivem comunidades de pescadores. Quem é contra diz que as comunidades perderiam acesso a parte do território e que as obras alterariam as dunas. Quem apoia diz que o país precisa de energia renovável, que o município ganharia arrecadação e que a empresa pagaria compensações.",
        statement: "Eu apoiaria a instalação do parque eólico.",
      },
    ],
  },
  {
    slot: "soc-08",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-08-2a",
        title: "Proibição de descartáveis de plástico",
        situation:
          "Uma cidade quer proibir copos, talheres e embalagens plásticas descartáveis em restaurantes e entregas. Quem apoia diz que esse plástico entope bueiros e acaba nos rios e no mar. Quem é contra diz que as alternativas custam mais e que o aumento recairia sobre pequenos restaurantes e consumidores.",
        statement: "Eu apoiaria a proibição.",
      },
      {
        id: "soc-08-2b",
        title: "Multa para quem não separa o lixo",
        situation:
          "Uma cidade quer obrigar os moradores a separar o lixo reciclável, com multa para quem descumprir depois de dois avisos. Quem é contra diz que a prefeitura deveria primeiro garantir coleta seletiva em todos os bairros e que a multa pesaria mais para quem tem menos tempo e espaço em casa. Quem apoia diz que, sem obrigação, a reciclagem não avança.",
        statement: "Eu apoiaria a obrigação de separar o lixo, com multa.",
      },
    ],
  },
  {
    slot: "soc-09",
    dimension: "socioambiental",
    direction: -1,
    weight: 1,
    versions: [
      {
        id: "soc-09-2a",
        title: "Prazo máximo para aprovar agrotóxicos",
        situation:
          "Pedidos de autorização de novos agrotóxicos levam anos para ser analisados. Produtores querem um prazo máximo: se a análise não terminar a tempo, o produto ganha registro provisório. Quem defende diz que produtos mais modernos e menos tóxicos ficam parados na fila. Quem critica diz que produtos seriam liberados sem uma avaliação completa dos riscos à saúde.",
        statement: "Eu apoiaria o prazo máximo com registro provisório.",
      },
      {
        id: "soc-09-2b",
        title: "Pulverização aérea perto de casas",
        situation:
          "Um estado proíbe pulverizar agrotóxicos por avião a menos de 500 metros de casas e rios. Produtores pedem que a distância caia para 250 metros. Quem é contra diz que o vento leva o produto para casas, escolas e nascentes próximas. Quem defende a mudança diz que a aplicação por avião é mais barata e rápida e que as regras de segurança evitam que o produto se espalhe.",
        statement: "Eu apoiaria reduzir a distância mínima para 250 metros.",
      },
    ],
  },
  {
    slot: "soc-10",
    dimension: "socioambiental",
    direction: 1,
    weight: 1,
    versions: [
      {
        id: "soc-10-2a",
        title: "Exigências ambientais para prédios novos",
        situation:
          "Um município pode exigir que todo prédio novo tenha reaproveitamento da água da chuva, telhado verde e área de solo que absorve a água. Quem apoia diz que isso reduz enchentes e o calor na cidade. Quem critica diz que cada apartamento ficaria até 5% mais caro, o que afasta a casa própria de quem ganha menos.",
        statement: "Eu apoiaria essas exigências para os prédios novos.",
      },
      {
        id: "soc-10-2b",
        title: "Área verde em novos loteamentos",
        situation:
          "Um município pode exigir que novos loteamentos reservem 30% da área para árvores e solo que absorve a chuva. Quem é contra diz que haveria menos lotes à venda e que cada um ficaria mais caro. Quem apoia diz que os bairros ficariam mais frescos e sofreriam menos com enchentes.",
        statement: "Eu apoiaria exigir 30% de área verde nos novos loteamentos.",
      },
    ],
  },
];

/** Situations of the current bank: new attempts draw from these. */
export const QUESTIONS: Question[] = QUESTION_SLOTS.flatMap(({ versions, ...slot }) => versions.map((version) => ({ ...version, ...slot })));

/** Current and retired situations, so attempts and results always show the text that was answered. */
export const QUESTION_BY_ID = new Map([...QUESTIONS, ...RETIRED_QUESTIONS].map((q) => [q.id, q]));

// Attempts saved before the draw existed have no ids: they used the original
// version of every theme (now among the retired situations), in this order.
const PRE_DRAW_IDS = RETIRED_QUESTIONS.filter((q) => q.id === q.slot).map((q) => q.id);

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Situations of a new attempt: one version of every theme, drawn at random, with
 * the blocks in their fixed order and the situations of each block shuffled.
 */
export function drawQuestionIds(random: () => number = Math.random): string[] {
  return DIMENSIONS.flatMap((dimension) =>
    shuffle(
      QUESTION_SLOTS.filter((slot) => slot.dimension === dimension.key).map((slot) => slot.versions[Math.floor(random() * slot.versions.length)].id),
      random,
    ),
  );
}

/** Ids shown in an attempt, in order (attempts saved before the draw used the original situations). */
export function attemptQuestionIds(questionIds: string[]): string[] {
  return questionIds.length ? questionIds : PRE_DRAW_IDS;
}

/** Questions of an attempt, in order; null when one of them is unknown. */
export function attemptQuestions(questionIds: string[]): Question[] | null {
  const questions = attemptQuestionIds(questionIds).map((id) => QUESTION_BY_ID.get(id));
  return questions.every((question): question is Question => question !== undefined) ? questions : null;
}
