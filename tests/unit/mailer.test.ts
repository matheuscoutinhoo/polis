import { afterEach, describe, expect, it, vi } from "vitest";
import { sendMail, verificationEmail } from "@/lib/mailer";

const message = () => verificationEmail("pessoa@exemplo.test", "Pessoa", "https://polis.test/verify-email?token=t1");

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("envio de e-mail pelo Resend (HTTPS)", () => {
  it("tem prioridade sobre SMTP e envia remetente, destinatário, assunto, HTML e texto", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_teste");
    vi.stubEnv("SMTP_HOST", "smtp.exemplo.test");
    vi.stubEnv("MAIL_FROM", "Polis <nao-responda@exemplo.org>");
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ id: "abc" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => {});

    await sendMail(message());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer re_teste", "Content-Type": "application/json" });
    const body = JSON.parse(String(init?.body));
    expect(body).toMatchObject({ from: "Polis <nao-responda@exemplo.org>", to: ["pessoa@exemplo.test"], subject: "Confirme seu e-mail na Polis" });
    expect(body.text).toContain("https://polis.test/verify-email?token=t1");
    expect(body.html).toContain("https://polis.test/verify-email?token=t1");
  });

  it("falha com o status e o tipo do erro, sem repetir a mensagem do provedor", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_teste");
    const providerMessage = "You can only send testing emails to your own email address (dona@exemplo.org).";
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ statusCode: 403, name: "validation_error", message: providerMessage }), { status: 403 })),
    );
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});

    const error = await sendMail(message()).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain("HTTP 403, validation_error");
    expect((error as Error).message).not.toContain("dona@exemplo.org");
    expect(errorLog.mock.calls.flat().join(" ")).not.toContain("dona@exemplo.org");
  });
});
