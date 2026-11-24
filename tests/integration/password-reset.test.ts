import { beforeEach, describe, expect, it } from "vitest";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resetDatabase, waitForMail } from "../support/fixtures";

const ORIGIN = "http://localhost:3000";

function post(path: string, body: unknown) {
  return auth.handler(
    new Request(`${ORIGIN}/api/auth${path}`, {
      method: "POST",
      headers: { "content-type": "application/json", origin: ORIGIN },
      body: JSON.stringify(body),
    }),
  );
}

async function signUp(email: string, password: string) {
  return post("/sign-up/email", { name: "Pessoa Teste", email, password, acceptTerms: true });
}

describe("Cadastro e recuperação de acesso", () => {
  beforeEach(resetDatabase);

  it("exige o aceite explícito dos termos e registra o consentimento com versão", async () => {
    const refused = await post("/sign-up/email", { name: "Sem aceite", email: "sem-aceite@exemplo.test", password: "senha-forte-123" });
    expect(refused.status).toBe(400);
    expect(await db.user.count()).toBe(0);

    const accepted = await signUp("com-aceite@exemplo.test", "senha-forte-123");
    expect(accepted.status).toBe(200);
    const user = await db.user.findUniqueOrThrow({ where: { email: "com-aceite@exemplo.test" }, include: { consents: true } });
    expect(user.role).toBe("USER");
    expect(user.consents).toHaveLength(1);
    expect(user.consents[0]).toMatchObject({ kind: "TERMS", revokedAt: null });
  });

  it("redefine a senha com token de uso único e encerra as sessões abertas", async () => {
    const email = "recuperar@exemplo.test";
    expect((await signUp(email, "senha-antiga-123")).status).toBe(200);
    expect(await db.session.count()).toBe(1);

    const known = await post("/request-password-reset", { email, redirectTo: "/redefinir-senha" });
    const unknown = await post("/request-password-reset", { email: "ninguem@exemplo.test", redirectTo: "/redefinir-senha" });
    // Same answer for registered and unknown e-mails: no account enumeration.
    expect(known.status).toBe(200);
    expect(unknown.status).toBe(known.status);
    expect(await unknown.json()).toEqual(await known.json());

    const mail = await waitForMail(email, /senha/i);
    const token = /reset-password\/([^?"'\s<]+)/.exec(mail.text)?.[1];
    expect(token).toBeTruthy();

    const reset = await post("/reset-password", { newPassword: "senha-nova-456", token });
    expect(reset.status).toBe(200);
    expect(await db.session.count()).toBe(0);

    const reused = await post("/reset-password", { newPassword: "outra-senha-789", token });
    expect(reused.status).toBe(400);

    expect((await post("/sign-in/email", { email, password: "senha-antiga-123" })).status).toBe(401);
    expect((await post("/sign-in/email", { email, password: "outra-senha-789" })).status).toBe(401);
    expect((await post("/sign-in/email", { email, password: "senha-nova-456" })).status).toBe(200);
  });
});
