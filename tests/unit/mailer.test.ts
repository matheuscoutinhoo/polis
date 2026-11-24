import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendMail, verificationEmail } from "@/lib/mailer";

const smtp = vi.hoisted(() => ({ sendMail: vi.fn() }));
vi.mock("nodemailer", () => ({ default: { createTransport: vi.fn(() => smtp) } }));

const message = () => verificationEmail("pessoa@exemplo.test", "Pessoa", "https://polis.test/verify-email?token=t1");

beforeEach(() => {
  smtp.sendMail.mockReset();
  vi.stubEnv("SMTP_HOST", "smtp.exemplo.test");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("envio de e-mail por SMTP", () => {
  it("envia remetente, destinatário, assunto, HTML e texto", async () => {
    vi.stubEnv("MAIL_FROM", "Polis <nao-responda@exemplo.org>");
    smtp.sendMail.mockResolvedValue({ messageId: "abc" });
    vi.spyOn(console, "log").mockImplementation(() => {});

    await sendMail(message());

    expect(smtp.sendMail).toHaveBeenCalledTimes(1);
    const [sent] = smtp.sendMail.mock.calls[0];
    expect(sent).toMatchObject({ from: "Polis <nao-responda@exemplo.org>", to: "pessoa@exemplo.test", subject: "Confirme seu e-mail na Polis" });
    expect(sent.text).toContain("https://polis.test/verify-email?token=t1");
    expect(sent.html).toContain("https://polis.test/verify-email?token=t1");
  });

  it("falha com o código do erro, sem repetir a mensagem do servidor", async () => {
    const serverMessage = "Can't send mail - all recipients were rejected: 550 5.1.1 <pessoa@exemplo.test>: Recipient address rejected";
    smtp.sendMail.mockRejectedValue(Object.assign(new Error(serverMessage), { code: "EENVELOPE", responseCode: 550 }));
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});

    const error = await sendMail(message()).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain("EENVELOPE, 550");
    expect((error as Error).message).not.toContain("pessoa@exemplo.test");
    const logged = errorLog.mock.calls.flat().join(" ");
    expect(logged).toContain("mail.provider_error");
    expect(logged).not.toContain("pessoa@exemplo.test");
  });
});
