# Polis

Plataforma web de educação política para pessoas sem conhecimento prévio. A Polis explica instituições, ideias, correntes e acontecimentos brasileiros com **fontes oficiais aprovadas** e diferentes perspectivas, apresentadas com os mesmos critérios. Ela **explica, mas não conduz**: não recomenda voto, partido, candidato, movimento ou corrente.

Este repositório contém o MVP completo: contas e privacidade, questionário de 50 situações sorteadas de um banco de 100, com cálculo determinístico, trilha de aprendizado com gamificação simples, acontecimentos explicados com fontes e apoio de IA (OpenAI, somente no servidor), fóruns com moderação e uma área administrativa mínima.

- [Visão geral da arquitetura](#arquitetura)
- [Execução local](#execução-local)
- [Testes e verificações](#testes-e-verificações)
- [Deploy no Railway](#deploy-no-railway)
- [Backup e restauração](#backup-e-restauração)
- [Metodologia do questionário](#metodologia-do-questionário)
- [Trilha, XP e conquistas](#trilha-xp-e-conquistas)
- [Acontecimentos e uso de IA](#acontecimentos-e-uso-de-ia)
- [Comunidade e moderação](#comunidade-e-moderação)
- [Privacidade e segurança](#privacidade-e-segurança)
- [Acesso sem conta e questionário obrigatório](#acesso-sem-conta-e-questionário-obrigatório)
- [Catálogo de fontes aprovadas](#catálogo-de-fontes-aprovadas)
- [Conteúdo inicial e lacunas documentais](#conteúdo-inicial-e-lacunas-documentais)
- [Condições de uso e limitações editoriais](#condições-de-uso-e-limitações-editoriais)
- [Limitações conhecidas e dependências externas](#limitações-conhecidas-e-dependências-externas)

---

## Arquitetura

Monólito modular em **Next.js (App Router)** com Server Components e Server Actions, **PostgreSQL** via **Prisma**, autenticação com **Better Auth**, validação com **Zod** e o **SDK oficial da OpenAI** (Responses API com saída estruturada).

```
src/
  app/                 rotas (páginas enxutas; regras ficam nos módulos)
  components/          componentes visuais do sistema de design (ui/, polis/) e de fluxos (auth/, learning/...)
  lib/                 infraestrutura: db, auth, sessão (DAL), e-mail, logs, limites de frequência
  modules/
    account/           conta, consentimentos, exportação e exclusão de dados
    diagnostic/        banco de 100 situações (50 sorteadas por tentativa), escala, pontuação, perfis de referência, serviço
    learning/          lições (esquema e validação editorial), trilha (estratégias), progresso e XP
    sources/           política de URLs de editores aprovados, cadastro e revisão de fontes
    events/            estrutura da análise, portão de publicação, consultas públicas e administrativas
    ai/                adaptador OpenAI, instruções, pacote de evidências, verificação de referências
    community/         fóruns, tópicos, comentários, denúncias
    admin/             moderação e registro de decisões
prisma/
  schema.prisma, migrations/   modelo de dados versionado
  seed.ts, seed-data/          seed editorial idempotente (fontes, lições, acontecimentos, fóruns)
scripts/               banco local, validadores editoriais, promoção de administrador, avaliação da IA
tests/                 unit/, integration/, e2e/ (Playwright)
.railway/railway.ts    infraestrutura como código do Railway
```

Padrões usados onde resolvem um problema concreto: **adaptador** para a OpenAI (`modules/ai/provider.ts` + `openai-adapter.ts`, substituível em testes) e **estratégias** para ordenar a trilha (`modules/learning/path.ts`). O acesso ao banco fica concentrado nos serviços de cada módulo, sem uma camada de repositórios que apenas repasse chamadas ao Prisma.

**Versões principais** (fixadas em `package.json`): Node.js ≥ 22.12 · Next.js 16.4.6 · React 19.3.1 · Prisma 7.10.1 (`@prisma/adapter-pg`) · Better Auth 1.7.27 · openai 7.62.0 · Zod 4.6.7 · Tailwind CSS 4.3.5 · TypeScript 6.0.3 · Vitest 5.1.1 · Playwright 1.65.1.

Observações sobre esta versão do Next.js: `params` e `searchParams` são assíncronos; `cacheComponents` está desativado de propósito (páginas personalizadas e privadas são renderizadas por requisição e nunca entram em cache compartilhado); o lint usa `eslint` diretamente.

## Execução local

Pré-requisitos: Node.js 22.12 ou superior e npm. Não é preciso Docker: há um PostgreSQL embutido para desenvolvimento.

```bash
npm install
cp .env.example .env            # no Windows: copy .env.example .env
# edite BETTER_AUTH_SECRET (qualquer texto longo e aleatório)

npm run db:local                # terminal 1: PostgreSQL local (bancos polis e polis_test, UTF-8)
npm run db:migrate:deploy       # terminal 2: aplica as migrations e carrega o conteúdo editorial (de novo só quando ele muda)
npm run db:seed                 # atualiza fontes, lições, acontecimentos e fóruns oficiais (idempotente; opcional no primeiro uso)
npm run dev                     # http://localhost:3000
```

- Já tem um PostgreSQL? Ajuste `DATABASE_URL` e pule `npm run db:local`. Os bancos precisam usar **UTF-8**.
- Se um banco local antigo tiver sido criado com outra codificação, `npm run db:local -- --fix-encoding` o recria em UTF-8 (apaga os dados dele).
- **E-mails em desenvolvimento**: sem `SMTP_HOST`, confirmação de conta e recuperação de senha são gravadas em `.dev-mail/outbox.jsonl`; copie o link de lá.
- **Primeiro administrador**: crie a conta em `/criar-conta` e rode `npm run admin:promote -- seu@email.org` (`--revoke` remove o papel). Nenhuma credencial fica no código.
- **IA**: sem `OPENAI_API_KEY`, perguntas e rascunhos com IA exibem uma mensagem clara de indisponibilidade; todo o resto funciona.

### Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` / `build` / `start` | desenvolvimento; build de produção (`prisma generate && next build`); servidor em `0.0.0.0:$PORT` |
| `npm run lint` / `typecheck` | ESLint e TypeScript |
| `npm run test` / `test:unit` / `test:integration` | Vitest (unitários e integração com banco) |
| `npm run test:e2e` | build de produção + Playwright (desktop e 360 px) |
| `npm run db:local` | PostgreSQL embutido para desenvolvimento |
| `npm run db:migrate:dev` / `db:migrate:deploy` | criar migration (dev) / aplicar migrations (produção, sem apagar dados) e aplicar o seed editorial quando a versão do conteúdo mudou (`seed --if-outdated`; acontecimentos já existentes são preservados) |
| `npm run db:seed` | seed editorial explícito e idempotente (atualiza o conteúdo já carregado) |
| `npm run check:content` | validação editorial das lições (estrutura, fontes, citações literais, exemplo, exercícios) |
| `npm run check:catalog` | validação do catálogo de fontes e dos acontecimentos (URLs, trechos, portão de publicação) |
| `npm run docs:catalog` | gera `docs/catalogo-de-fontes.md` |
| `npm run admin:promote -- email` | concede o papel de administrador a uma conta existente |
| `npm run ai:eval` | bateria de avaliação da IA (requer `OPENAI_API_KEY`; `-- --simulado` testa só o script) |

## Testes e verificações

```bash
npm run lint && npm run typecheck
npm run test:unit
npm run test:integration        # usa TEST_DATABASE_URL (banco separado; precisa conter "test" no nome)
npx playwright install chromium # uma vez
npm run test:e2e                # cria e reinicia o banco polis_e2e, aplica migrations e seed
```

Cobertura proporcional ao risco:

- **Questionário**: pontuação, direção dos itens, sorteio das situações (uma versão de cada tema, cinco em cada direção por bloco; tentativa pausada mantém o sorteio; resposta fora do sorteio é recusada; tentativas anteriores ao sorteio seguem com as situações originais), “Não sei” fora do cálculo, mínimos por dimensão, empates, padrões mistos, reprodutibilidade (resultado salvo idêntico ao recalculado), afinidades recalculadas quando os perfis mudam, pausa e retomada, nova versão da autorização exigida para responder de novo, histórico de resultados (o mais recente ordena a trilha; leitura e exclusão só pela própria pessoa), revogação apagando os dados.
- **Autorização entre contas**: isolamento de respostas e resultados; ninguém edita ou exclui conteúdo de outra pessoa; publicação exige e-mail confirmado e conta sem suspensão; área administrativa inacessível para não administradores.
- **XP idempotente**: requisições simultâneas e repetidas não duplicam pontos (índice único + inserções idempotentes).
- **Recuperação de acesso**: aceite dos termos obrigatório no cadastro, token de redefinição de uso único, mesma resposta para e-mail cadastrado ou não, sessões encerradas após a troca.
- **IA**: referências inválidas, números ausentes das evidências, recomendações e instruções embutidas (unitários com provedor falso).
- **Fluxos ponta a ponta** (Playwright): cadastro → confirmação → consentimento → 50 respostas com pausa → resultado com a trilha em fluxo → lição → XP sem duplicação → refazer o questionário → histórico e comparação → resultado anterior → exclusão das respostas; fórum → tópico → comentário → denúncia → moderação com motivo; cadastro de fonte oficial → aprovação com motivo registrado; visitante sem conta vê avisos no lugar das listas e prévias nas páginas de conteúdo, sem receber o que fica oculto; conta nova é levada ao questionário antes do conteúdo; telas principais a 360 px sem rolagem horizontal.

## Deploy no Railway

A configuração está em [`.railway/railway.ts`](.railway/railway.ts) (Infraestrutura como Código do Railway; o antigo `railway.json` foi descontinuado). Ela declara o PostgreSQL e o serviço web `polis` com build, start, **pre-deploy de migrations**, **healthcheck** em `/api/health` e Node.js 24. O Railway não lê esse arquivo sozinho: a CLI compara o arquivo com o projeto e só aplica depois da sua confirmação. Segredos nunca ficam no repositório; eles são **variáveis compartilhadas** do ambiente no Railway.

**Antes de começar**

- Conta no Railway. O e-mail transacional (confirmação de conta e recuperação de senha) é enviado por **SMTP**, e o Railway só libera SMTP de saída no plano **Pro**; nos planos Free, Trial e Hobby a conexão é bloqueada e esses e-mails não são enviados (o restante do site funciona).
- Um servidor SMTP (host, porta, usuário e senha) e um remetente aceito por ele.
- Railway CLI **5.45.2 ou superior** (`npm i -g @railway/cli`; confira com `railway --version`), Node.js 24, `npm install` já executado (instala o SDK `railway` usado pelo arquivo) e um cliente `ssh` com chave (`ssh-keygen -t ed25519`, se ainda não tiver).

**Passo a passo** (na pasta do projeto)

1. Entre e crie o projeto: `railway login` e `railway init --name polis`.
2. No painel do projeto, abra **Settings → Shared Variables**, escolha o ambiente `production` e crie:
   - `BETTER_AUTH_SECRET` (obrigatória, 32+ caracteres): `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`
   - `MAIL_FROM` (ex.: `Polis <nao-responda@seu-dominio.org>`), `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` e `SMTP_PASSWORD` (o envio só funciona no plano Pro)
   - opcionais: `OPENAI_API_KEY` (sem ela a IA fica indisponível com aviso claro) e `CONTACT_EMAIL` (exibido na política de privacidade)

   Variáveis não criadas chegam vazias ao app, que as trata como "não configuradas".
3. Revise e aplique a configuração: `railway config plan` e `railway config apply`. Isso cria o PostgreSQL e o serviço `polis`.
   - **Windows com a CLI instalada pelo npm**: antes desses comandos, rode `$env:_ = "$env:APPDATA\npm\node_modules\@railway\cli\bin\railway.exe"` no PowerShell. Sem isso, o SDK não encontra o executável e acusa, por engano, "requires Railway CLI 5.42.1 or newer".
4. **Gere o domínio público antes do primeiro deploy**: `railway domain --service polis`. `BETTER_AUTH_URL` vale `https://${{RAILWAY_PUBLIC_DOMAIN}}` e só é resolvida no deploy.
5. Publique: `railway up --service polis` (envia a pasta respeitando o `.gitignore`). Se preferir deploy automático a cada push, envie o código para um repositório GitHub privado e conecte-o em **polis → Settings → Source**. Cada deploy executa `npm run build`, depois `npm run db:migrate:deploy` (pre-deploy: aplica as migrations e carrega o conteúdo editorial no primeiro deploy e sempre que ele mudar; se falhar, a versão no ar continua) e `npm run start` (`0.0.0.0:$PORT`).
6. Confira `https://SEU-DOMINIO/api/health`. O esperado é `"status":"ok"`, `"database":"ok"`, `"auth":"configured"` e `"mail":"configured"`.
7. **Conteúdo editorial**: o primeiro deploy já carrega fontes, lições, acontecimentos e fóruns oficiais (o log do pre-deploy mostra `Polis · seed editorial`). Nos deploys seguintes, o seed roda de novo só quando o conteúdo de `prisma/seed-data` mudou (a versão aplicada fica na tabela `editorial_releases`): fontes, módulos, lições e fóruns são atualizados, lições reorganizadas mantêm o progresso (`previous` no seed), e acontecimentos já existentes e trechos de fontes cadastrados na administração não são sobrescritos.
8. **Administrador**: crie sua conta no site, confirme o e-mail e, via `railway ssh --service polis`, rode `npm run admin:promote -- seu@email.org`. Saia e entre de novo para ver `/admin`.
9. Ative **Backups** no serviço PostgreSQL (veja abaixo).

Para atualizar, rode `railway up --service polis` de novo (ou faça push, se conectou o GitHub). As migrations novas e o conteúdo editorial alterado são aplicados no pre-deploy. Para forçar a atualização completa, inclusive de acontecimentos já publicados, rode `npm run db:seed` via `railway ssh --service polis`. Se a máquina não tiver SSH, rode o seed ou o promote localmente com `DATABASE_URL` igual à `DATABASE_PUBLIC_URL` do serviço Postgres (aba *Variables*).

**Domínio próprio**: adicione `domains: ["polis.seu-dominio.org"]` ao serviço em `.railway/railway.ts`, troque `BETTER_AUTH_URL` para `https://polis.seu-dominio.org` e rode `railway config apply`. Crie os registros DNS indicados por `railway domain status polis.seu-dominio.org`.

**Problemas comuns**

- *Healthcheck failed* no deploy: procure nos logs (`railway logs --service polis`) o evento `health.auth_misconfigured`. Ele indica qual variável está inválida (`BETTER_AUTH_URL` sem domínio gerado ou `BETTER_AUTH_SECRET` ausente/curta). Corrija e publique de novo; a versão anterior continua no ar.
- E-mails não chegam: procure `mail.provider_error` nos logs. `ETIMEDOUT` ou `ECONNECTION` indicam SMTP bloqueado (planos sem SMTP de saída) ou host/porta incorretos; `EAUTH` indica usuário ou senha recusados pelo servidor SMTP.

O healthcheck responde `200` com o estado do banco e se autenticação, IA e e-mail estão configurados (sem detalhes sensíveis). Responde `503` se o banco estiver indisponível ou se `BETTER_AUTH_URL`/`BETTER_AUTH_SECRET` forem inválidas. Os logs são JSON estruturado e ocultam campos como e-mail, senha, tokens, respostas e textos digitados.

## Backup e restauração

- **Backups do Railway**: no serviço PostgreSQL, aba *Backups*, agende backups diários/semanais/mensais ou crie um manual. A restauração cria um novo volume com a cópia e prepara a troca para revisão antes do deploy (o volume anterior fica preservado, desmontado). Backups só podem ser restaurados no mesmo projeto e ambiente.
- **Backup lógico portátil** (recomendado antes de mudanças grandes), com a `DATABASE_PUBLIC_URL` do Postgres:

  ```bash
  pg_dump --format=custom --no-owner --dbname "$DATABASE_PUBLIC_URL" --file polis-$(date +%F).dump
  # restaurar em um banco NOVO e vazio, conferir e só então apontar DATABASE_URL para ele:
  pg_restore --no-owner --dbname "$NOVO_DATABASE_URL" polis-AAAA-MM-DD.dump
  ```

- Nunca rode `prisma migrate reset` nem `prisma migrate dev` em produção; use apenas `db:migrate:deploy`.
- Os backups contêm dados sensíveis (respostas do questionário): restrinja o acesso e apague cópias antigas conforme a política de privacidade. Dados excluídos por usuários podem permanecer em backups até a expiração deles.

## Metodologia do questionário

A descrição completa, gerada a partir do código, está na página **`/fontes-e-metodo`**. Resumo (banco `2026.11-v2`, cálculo `2026.11-v1`, perfis `2026.11-v3`):

- **50 situações por tentativa**, em **5 blocos de 10**, um por dimensão: economia, mercado e redistribuição; liberdades civis e exercício da autoridade; costumes, tradição e mudança social; participação política e organização do poder; desenvolvimento e prioridades socioambientais. As dimensões são uma modelagem editorial inicial e se sobrepõem; isso é explicado na página de método.
- **Banco de 100 situações com sorteio**: cada bloco tem 10 temas, e cada tema tem versões em contextos diferentes com a mesma dimensão, direção e peso (hoje, duas). A tentativa sorteia uma versão de cada tema, embaralha a ordem dentro do bloco e guarda os ids sorteados (`questionIds`); a tentativa pausada continua com as mesmas situações. Tentativas anteriores ao sorteio usaram a primeira versão de cada tema. Para ampliar o banco, acrescente versões em `question-bank.ts` sem mudar o sentido de ids existentes e suba `QUESTION_BANK_VERSION`.
- Escala de concordância de cinco pontos (−2 a +2) e a opção separada **“Não sei / preciso entender melhor”, que não conta como neutra**: fica fora do cálculo.
- Cada item tem **direção** (+1/−1; cinco em cada direção por bloco em toda tentativa, para reduzir a concordância automática) e **peso**. Escore da dimensão = Σ(valor × direção × peso) ÷ (2 × Σ pesos válidos), em −1..+1.
- **Mínimo de 6 respostas válidas** por dimensão; afinidades exigem pelo menos 2 dimensões válidas.
- **Perfis de referência por faixas** (não pontos) para liberalismos, conservadorismos, social-democracia, socialismos, comunismo, anarquismos e libertarianismos (socialismos e comunismo têm perfis separados desde a versão `2026.11-v3`). Cada faixa traz justificativa, a fonte e se a sustentação é **direta** ou **inferência editorial explicitada**; dimensões sem posição sustentada pelo acervo ficam indefinidas e não entram no cálculo.
- **Índice de proximidade** = 1 − (distância média às faixas ÷ 2), apenas nas dimensões comparáveis; comparações com menos de 3 dimensões são marcadas como limitadas. Não é probabilidade nem diagnóstico. Empates são exibidos como empate; a ordem editorial fixa desempata a trilha.
- O resultado mostra dimensões separadas, tensões (“Você apresentou posições diferentes nestes temas...”) e a contribuição de cada resposta. Refazer guarda um novo resultado: o mais recente ordena a trilha e os anteriores ficam num histórico privado (`/conta/resultados`), com comparação lado a lado por dimensão e por corrente (indicando quantas situações os dois resultados têm em comum), até a pessoa apagá-los. Resultados salvos com uma versão anterior dos perfis têm as afinidades recalculadas a partir dos escores guardados.
- A IA **não participa** do cálculo. Nada do questionário é enviado à OpenAI. Cliques, leituras, quizzes e fóruns não alteram o resultado.

## Trilha, XP e conquistas

Fundamentos em comum para todos → lições de correntes em ordem editorial (trilha geral) ou da mais próxima para a mais distante (trilha por afinidade, opcional) → temas transversais, história e leitura crítica. O resultado muda **somente a ordem**; o catálogo completo continua aberto. XP: leitura (10), compreensão verificada (15) e conclusão de módulo (25), **uma vez por atividade**; erros no exercício não tiram pontos e é possível tentar de novo. Quatro conquistas por conclusão; nada é público e nada premia concordância ideológica ou volume de publicações.

## Acontecimentos e uso de IA

Fluxo editorial: a administração cria o rascunho, **vincula fontes aprovadas** (com trechos cadastrados), redige a análise no editor estruturado ou **gera um rascunho com IA**, revisa e publica. A análise tem: o que aconteceu, contexto, atores, situação atual (com data de referência), etapas documentadas, instituições e limites, conceitos relacionados (ligados às lições), impactos (**documentados** ou **possíveis**, sempre com mecanismo decisão → mudança → grupo → condições), argumentos atribuídos, incertezas e limitações.

**Portão de publicação** (`modules/events/content.ts`): bloqueia referências a fontes não aprovadas ou não vinculadas, fato central ou situação atual sem evidência, ausência de etapa datada e argumentos sem atribuição; itens secundários sem evidência são omitidos da versão pública com aviso de limitação. Alterações em uma análise publicada a devolvem para revisão.

**IA** (`modules/ai/`): chamada somente no servidor, pela Responses API com saída estruturada (Zod) e `store: false`; modelo em `OPENAI_MODEL` (padrão `gpt-6.2-sol`). A IA recebe apenas conteúdo publicado e trechos de fontes aprovadas, cada um com um ID emitido pelo sistema (F1, F2...); perguntas e documentos são delimitados e tratados como dados, nunca como instruções. O servidor descarta referências inexistentes, bloqueia respostas com números ausentes das evidências ou com linguagem de recomendação, e avisa a revisão sobre afirmações sem relação lexical com a fonte. Limites diários por pessoa e global. Se a API falhar, lições, acontecimentos e trilhas continuam funcionando e a função exibe um erro compreensível.

**Bateria de avaliação** (`npm run ai:eval`): pedido de voto/convencimento, a mesma dúvida de posições opostas, alegação falsa com fonte verificável, fonte com apenas uma estimativa/promessa, impacto sem evidência, URL não aprovada, documento com instruções embutidas e rascunho com fonte declaratória. Gera relatório em `ai-eval-reports/` com verificações automáticas e campos para **revisão humana**. Essas avaliações reduzem riscos e não garantem neutralidade absoluta.

## Comunidade e moderação

Fóruns sobre correntes, ideias e acontecimentos (título, descrição, categoria, regras), tópicos e comentários em texto simples (sem HTML; renderização escapada), edição e exclusão do próprio conteúdo, seguir/deixar de seguir, busca e filtros, paginação. Publicar exige e-mail confirmado. Publicações são identificadas como **conteúdo de participantes, não verificado pela Polis**. Denúncias (ameaças, assédio, dados pessoais, discurso de ódio, spam) entram na fila administrativa; decisões — arquivar, remover, encerrar tópico, suspender publicação — exigem motivo e ficam registradas. A moderação analisa condutas, não opiniões, e não acessa respostas do questionário. Há limites de frequência para criar fóruns, tópicos, comentários e denúncias.

## Privacidade e segurança

- Respostas e afinidades são **dados sensíveis** (LGPD, art. 5º, II): autorização específica, separada dos termos, com finalidade, versão e data registradas, revogável a qualquer momento (a revogação apaga respostas e resultados). A versão `questionario-2026-11-v2` da autorização inclui o histórico de resultados; quem autorizou a versão anterior confirma a nova antes de responder de novo, sem perder o acesso ao resultado já calculado. Responder é condição para usar lições, acontecimentos e fóruns, o que é informado com destaque antes da autorização (art. 9º, § 3º).
- A pessoa exporta todos os seus dados em JSON, apaga um resultado do histórico (`/conta/resultados`) ou todas as respostas do questionário e exclui a conta em `/conta/privacidade`. Na exclusão, escolhe manter os textos publicados sem vínculo (“Participante removido”) ou apagá-los.
- Sessões e senhas gerenciadas pelo Better Auth (cookies `httpOnly`, seguros em HTTPS; proteção de origem/CSRF), senha mínima de 10 caracteres, recuperação com token de uso único e expiração de 1 hora, sem revelar se o e-mail existe; limites de tentativa persistentes no PostgreSQL.
- Autorização no servidor em todas as ações (sessão, propriedade do registro e papel de administrador). Validação com Zod e limites de tamanho; consultas parametrizadas pelo Prisma.
- Fontes só de editores aprovados, por domínio exato e caminho (HTTPS, sem IP, credenciais ou portas não padrão). A aplicação não busca URLs enviadas por usuários.
- Páginas privadas não são cacheadas; cabeçalhos de segurança configurados em `next.config.ts`.

## Acesso sem conta e questionário obrigatório

Sem conta, a página inicial aparece completa. Nas demais páginas de conteúdo, as listas dão lugar a um aviso para criar a conta ou entrar, e as páginas abertas por link direto mostram uma prévia com o mesmo aviso (“Já tenho conta” volta para a mesma página depois do login):

- **Aprender**: catálogo e módulos ficam ocultos; cada lição mostra o cabeçalho, a introdução e a primeira seção. Fontes, conceitos relacionados, verificação de compreensão, perguntas à IA e discussões exigem conta.
- **Acontecimentos**: a lista fica oculta; cada acontecimento mostra o cabeçalho e “O que aconteceu”.
- **Comunidade**: a lista de fóruns fica oculta; cada fórum mostra a apresentação e as regras, e cada tópico mostra só o título.
- **Fontes e método**: introdução e política editorial.
- **Questionário**: explicação e dimensões.

Termos de uso, política de privacidade, regras da comunidade e as páginas de acesso (entrar, criar conta, recuperar senha, confirmar e-mail) continuam públicas. O que fica oculto não é renderizado nem chega ao navegador (`components/auth/signup-gate.tsx`; `previewBlocks` em `modules/learning/content.ts`).

Com conta, o **questionário é obrigatório**: enquanto não houver um resultado concluído, a página inicial, as lições, os acontecimentos e os fóruns levam a `/questionario` (`getContentUser` em `lib/session.ts`). Conta, privacidade, fontes e método e as páginas públicas continuam acessíveis, e administradores são dispensados para que a moderação não dependa disso. A condição é informada com destaque antes da autorização (LGPD, art. 9º, § 3º). Apagar as respostas ou revogar a autorização suspende o acesso ao conteúdo até uma nova resposta.

## Catálogo de fontes aprovadas

O catálogo completo (editores, domínios aceitos, fontes, o que cada uma sustenta, limites e condição de reutilização) está em **[`docs/catalogo-de-fontes.md`](docs/catalogo-de-fontes.md)** (gerado por `npm run docs:catalog`) e na página `/fontes-e-metodo` (para quem tem conta). Editores aprovados incluem Presidência da República (legislação e notícias), Câmara dos Deputados, Senado Federal e ILB, Congresso Nacional, STF, TSE, Banco Central, IBGE, Ipea, ministérios (MEC e Portal Domínio Público, MMA, Fazenda, Receita Federal, Tesouro, Secom, MJSP), ANPD, Arquivo Nacional, CGU, Casa Civil, CAPES/eduCAPES e o Portal de Periódicos da UFMG.

Todas as fontes do seed foram conferidas nas páginas oficiais durante a implementação (consulta em 21/11/2026), com trechos literais. Os trechos dos livros didáticos e artigos usados nas lições de correntes foram reconferidos no texto integral em 25/11/2026 (a data aparece em cada fonte do catálogo). Quando a condição de reutilização não é informada, a Polis apenas referencia e cita trechos curtos com atribuição. Origem oficial não significa endosso.

## Conteúdo inicial e lacunas documentais

**Catorze módulos com duas lições cada** (3 a 7 minutos, exemplo concreto, conceitos relacionados, fontes e verificação com explicação): Fundamentos da política · Como o Brasil se organiza · Leis, eleições e partidos · Economia no debate público · Liberalismos · Conservadorismos · Social-democracia · Socialismos · Comunismo · Anarquismos · Libertarianismos · Temas transversais · História política do Brasil · Leitura crítica. Cada corrente tem um módulo próprio, com ideias centrais na primeira lição e trajetória, variações e debates na segunda, para que a trilha por afinidade possa ordená-las uma a uma. Endereços antigos dos módulos combinados redirecionam para os novos.

**Cinco acontecimentos reais**, com datas e fontes oficiais verificadas: Lei 15.270/2025 (isenção do IR até R$ 5 mil e tributação mínima de altas rendas), Lei 15.100/2025 (celulares nas escolas), Lei 15.190/2025 (licenciamento ambiental e vetos), Lei 15.211/2025 (proteção de crianças e adolescentes em ambientes digitais) e eleições gerais de 2026. **Fóruns oficiais** iniciais, sem usuários nem atividade fictícia.

Lacunas registradas (também exibidas em `/fontes-e-metodo` e nas próprias lições):

- **Progressismo**: nenhuma fonte aprovada define o termo; a lição de temas transversais registra a ausência.
- **Conservadorismos**: o acervo traz a descrição de uma obra, o resumo de um artigo e menções em livro didático; não há textos de autores conservadores.
- **Socialismos**: o acervo detalha a formulação de Marx e o Estado socialista do século XX; socialismos que se apresentam como democráticos não são descritos.
- **Anarquismos**: o acervo cobre a vertente apresentada por Bakunin, um estudo histórico brasileiro e menções em livros didáticos; o anarcocapitalismo não tem fonte e não é descrito.
- **Ambientalismo e nacionalismo** aparecem no acervo como temas de políticas públicas e estudos históricos, não como correntes definidas.
- Algumas faixas dos perfis de referência são **inferências editoriais** explicitadas, não sustentação direta.
- **TSE**: o portal bloqueou a verificação automatizada; dados eleitorais vieram de notícias oficiais da Câmara, do Senado e do STF. Documentos do TSE só entram após conferência manual.
- Andamentos posteriores à data de referência de cada acontecimento (21/11/2026) não foram verificados.

## Condições de uso e limitações editoriais

Os **Termos de uso** (`/termos`) e a **Política de privacidade** (`/privacidade`) estão na aplicação. Em síntese: conteúdo educativo revisado por pessoas, mas sujeito a erros (use “Sinalizar problema”); origem oficial não equivale a endosso; o questionário não é teste validado nem diagnóstico de identidade política; respostas de IA são identificadas, usam só fontes aprovadas e podem falhar; publicações de participantes são de responsabilidade de quem publica; a Polis não cobre toda a filosofia política e declara as lacunas em vez de preencher com conteúdo sem referência.

## Limitações conhecidas e dependências externas

- **OpenAI**: a integração está pronta (adaptador, instruções, verificações, limites e bateria de avaliação), mas **não foi executada contra a API real** neste ambiente, por falta de `OPENAI_API_KEY`. Os testes usam um provedor falso. Rode `npm run ai:eval` com a chave antes de abrir a função ao público.
- **E-mail**: o envio por SMTP está implementado, mas **não foi testado com um servidor real**. Os testes simulam o transporte SMTP; em desenvolvimento e nos testes, os e-mails vão para a caixa local.
- **Railway**: a configuração está pronta. O build de produção foi verificado sem acesso ao banco, como acontece no build do Railway, e o `.railway/railway.ts` foi avaliado com o mesmo script da CLI 5.75. Nenhum recurso foi criado nem houve deploy.
- O modelo padrão `gpt-6.2-sol` pode ser trocado por `OPENAI_MODEL`; confira a disponibilidade na sua conta.
- Fora do escopo do MVP: MFA, app nativo, pagamentos, mensagens privadas, chat em tempo real, notificações push, ranking público e coleta automática de notícias.
