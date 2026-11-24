import { expect, test } from "@playwright/test";
import { query, signIn, signOut, signUp, uniqueEmail, verifyEmail } from "./helpers";

test("fórum e administração: criar, seguir, publicar, comentar, denunciar, moderar e revisar fonte com motivo registrado", async ({ page }) => {
  const authorEmail = uniqueEmail("autora");
  await signUp(page, "Autora Fórum", authorEmail);

  // Unverified accounts can read but not publish.
  await page.goto("/comunidade/novo");
  await expect(page.getByText("Confirme seu e-mail para publicar")).toBeVisible();
  await verifyEmail(page, authorEmail);

  await page.goto("/comunidade/novo");
  await page.getByLabel("Título").fill("Como funcionam as comissões da Câmara");
  await page.getByLabel("Descrição").fill("Espaço para entender o papel das comissões permanentes no processo legislativo.");
  await page.getByLabel("Categoria").selectOption("INSTITUICOES");
  await page.getByRole("button", { name: "Criar fórum" }).click();
  await page.waitForURL(/\/comunidade\/como-funcionam-as-comissoes-da-camara$/);
  const forumUrl = page.url();

  await page.getByRole("button", { name: "Seguir fórum" }).click();
  await expect(page.getByRole("button", { name: "Deixar de seguir" })).toBeVisible();

  await page.getByRole("link", { name: "Novo tópico" }).click();
  await page.getByLabel("Título").fill("Comissões podem aprovar projetos sozinhas?");
  await page.getByLabel("Texto").fill("Li que alguns projetos tramitam em caráter conclusivo. O que isso significa na prática?");
  await page.getByRole("button", { name: "Publicar tópico" }).click();
  await page.waitForURL((url) => /^\/comunidade\/[^/]+\/[^/]+$/.test(url.pathname) && !url.pathname.endsWith("/novo-topico"));
  const topicUrl = page.url();
  await expect(page.getByText("Conteúdo de participantes · não verificado pela Polis")).toBeVisible();

  await page.getByLabel("Seu comentário").fill("Comentário de teste com um ataque pessoal fictício.");
  await page.getByRole("button", { name: "Comentar" }).click();
  await expect(page.getByText("Comentário publicado.")).toBeVisible();
  await expect(page.getByText("Comentário de teste com um ataque pessoal fictício.")).toBeVisible();

  // Another person reports the comment.
  await signOut(page);
  const readerEmail = uniqueEmail("leitora");
  await signUp(page, "Leitora Fórum", readerEmail);
  await page.goto(topicUrl);
  await expect(page.getByRole("button", { name: "Editar" })).toHaveCount(0);
  await page.getByRole("button", { name: "Denunciar" }).last().click();
  await page.getByRole("radio", { name: "Assédio ou ataque pessoal" }).check();
  await page.getByRole("button", { name: "Enviar denúncia" }).click();
  await expect(page.getByText("Denúncia enviada.")).toBeVisible();

  // An administrator processes the report without access to questionnaire answers.
  await signOut(page);
  const adminEmail = uniqueEmail("admin");
  await signUp(page, "Administração", adminEmail);
  await query(`UPDATE users SET role = 'ADMIN' WHERE email = $1`, [adminEmail]);
  await signOut(page);
  await signIn(page, adminEmail);
  await page.goto("/admin/moderacao");
  await expect(page.getByRole("heading", { name: /Denúncias abertas \(1\)/ })).toBeVisible();
  await page.getByRole("radio", { name: "Remover o conteúdo" }).check();
  await page.getByLabel("Motivo registrado").fill("Ataque pessoal a outra participante, contrário às regras.");
  await page.getByRole("button", { name: "Registrar decisão" }).click();
  await expect(page.getByText("Denúncia resolvida e decisão registrada.")).toBeVisible();

  await page.goto(topicUrl);
  await expect(page.getByText(/Comentário removido pela moderação\. Motivo: Ataque pessoal/)).toBeVisible();
  await page.goto("/admin");
  await expect(page.getByText("Conteúdo removido").first()).toBeVisible();

  await test.step("fonte nova entra pendente e só é aprovada com motivo registrado", async () => {
    const [publisher] = await query<{ id: string }>(`SELECT id FROM publishers WHERE key = 'planalto-legislacao'`);
    await page.goto("/admin/fontes/nova");
    await page.getByLabel("Órgão ou editor aprovado").selectOption(publisher.id);
    await page.getByLabel("Título do documento").fill("Lei nº 9.096, de 19 de setembro de 1995 (Lei dos Partidos Políticos)");
    await page.getByLabel("Endereço canônico (HTTPS)").fill("https://www.planalto.gov.br/ccivil_03/leis/l9096.htm");
    await page.getByLabel("Tipo de material").selectOption("ATO_REGISTRO");
    await page.getByLabel("Condição de reutilização", { exact: true }).selectOption("OFFICIAL_ACT");
    await page.getByLabel("Descrição da condição de reutilização").fill("Ato oficial (texto normativo).");
    await page.getByLabel("O que a fonte sustenta e seus limites").fill("Regras gerais sobre partidos políticos; não trata de resultados eleitorais.");
    await page.getByRole("button", { name: "Cadastrar fonte" }).click();
    await expect(page.getByText("Fonte cadastrada e aguardando revisão.")).toBeVisible();

    await page.getByLabel("Motivo da decisão").fill("Endereço oficial conferido no Portal da Legislação.");
    await page.getByRole("button", { name: "Aprovar" }).click();
    await expect(page.getByText(/^Fonte aprovada; a decisão foi registrada\./)).toBeVisible();
    await expect(page.getByText("Nenhuma fonte nesta situação.")).toBeVisible();
    await page.goto("/admin");
    await expect(page.getByText("Motivo: Endereço oficial conferido no Portal da Legislação.")).toBeVisible();
  });

  // Non-admins cannot reach the admin area.
  await signOut(page);
  await signIn(page, readerEmail);
  const response = await page.goto("/admin/moderacao");
  expect(response?.status()).toBe(404);
  await page.goto(forumUrl);
  await expect(page.getByRole("heading", { level: 1, name: "Como funcionam as comissões da Câmara" })).toBeVisible();
});
