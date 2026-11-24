import nodemailer from "nodemailer";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { logger } from "@/lib/logger";

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 15_000;

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

/**
 * Resend (HTTPS API) takes precedence over SMTP: Railway only allows outbound
 * SMTP on Pro plans. Empty values count as unset, because Railway resolves
 * references to missing variables to empty strings.
 */
export function mailProvider(): "resend" | "smtp" | null {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST) return "smtp";
  return null;
}

export function mailConfigured() {
  return mailProvider() !== null;
}

function sender() {
  return process.env.MAIL_FROM || "Polis <nao-responda@polis.app>";
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
      // Fail fast on blocked ports instead of holding sign-up requests for minutes.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

async function sendWithResend(message: MailMessage) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: sender(), to: [message.to], subject: message.subject, html: message.html, text: message.text }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });
  if (!response.ok) {
    // Error messages may quote account addresses, so only the status and error type are kept.
    const payload: unknown = await response.json().catch(() => null);
    const name = payload && typeof payload === "object" && "name" in payload ? payload.name : undefined;
    const errorType = typeof name === "string" ? name.slice(0, 60) : "unknown";
    logger.error("mail.provider_error", { provider: "resend", status: response.status, errorType });
    throw new Error(`Falha no envio de e-mail pelo Resend (HTTP ${response.status}, ${errorType}).`);
  }
}

/**
 * Sends transactional e-mail through Resend or SMTP. Without a provider in
 * development, messages are written to a local outbox file (.dev-mail) so
 * verification and recovery flows can be completed and tested locally.
 */
export async function sendMail(message: MailMessage) {
  const provider = mailProvider();
  if (provider === "resend") {
    await sendWithResend(message);
    logger.info("mail.sent", { provider, subject: message.subject });
    return;
  }
  if (provider === "smtp") {
    await getTransporter().sendMail({
      from: sender(),
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    logger.info("mail.sent", { provider, subject: message.subject });
    return;
  }

  if (process.env.NODE_ENV === "production" && process.env.POLIS_ALLOW_DEV_MAIL !== "true") {
    logger.error("mail.not_configured", { subject: message.subject });
    throw new Error("Envio de e-mail não configurado (defina RESEND_API_KEY ou SMTP_HOST).");
  }

  // Development outbox only; the ignore hints keep Next from tracing the whole project.
  const dir = path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.DEV_MAIL_DIR || ".dev-mail");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(/*turbopackIgnore: true*/ dir, "outbox.jsonl"),
    JSON.stringify({ ...message, sentAt: new Date().toISOString() }) + "\n",
    "utf8",
  );
  logger.info("mail.dev_outbox", { subject: message.subject, dir });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function layout(title: string, paragraphs: string[], action: { label: string; url: string }, footer: string) {
  const html = `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#F8FAF8;font-family:'Source Sans 3',Arial,sans-serif;color:#263B42">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" style="max-width:560px;background:#FFFFFF;border:1px solid #DCE4E1;border-radius:12px" cellpadding="0" cellspacing="0"><tr><td style="padding:32px">
<p style="margin:0 0 24px;font-weight:700;font-size:20px;color:#263B42">Polis</p>
<h1 style="margin:0 0 16px;font-size:22px;line-height:28px">${escapeHtml(title)}</h1>
${paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:24px">${escapeHtml(p)}</p>`).join("")}
<p style="margin:24px 0"><a href="${escapeHtml(action.url)}" style="display:inline-block;background:#246F73;color:#FFFFFF;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:8px">${escapeHtml(action.label)}</a></p>
<p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#526469">Se o botão não funcionar, copie este endereço no navegador:<br><span style="word-break:break-all">${escapeHtml(action.url)}</span></p>
<p style="margin:16px 0 0;font-size:14px;line-height:20px;color:#526469">${escapeHtml(footer)}</p>
</td></tr></table></td></tr></table></body></html>`;
  const text = [title, "", ...paragraphs, "", `${action.label}: ${action.url}`, "", footer].join("\n");
  return { html, text };
}

export function verificationEmail(to: string, name: string, url: string): MailMessage {
  const { html, text } = layout(
    "Confirme seu e-mail",
    [`Olá, ${name}.`, "Confirme este endereço para concluir o cadastro na Polis. A confirmação é necessária para publicar nos fóruns."],
    { label: "Confirmar e-mail", url },
    "O link vale por 24 horas. Se você não criou uma conta na Polis, ignore esta mensagem.",
  );
  return { to, subject: "Confirme seu e-mail na Polis", html, text };
}

export function resetPasswordEmail(to: string, name: string, url: string): MailMessage {
  const { html, text } = layout(
    "Redefinir senha",
    [`Olá, ${name}.`, "Recebemos um pedido para redefinir a senha da sua conta na Polis."],
    { label: "Criar nova senha", url },
    "O link vale por 1 hora e só pode ser usado uma vez. Se você não fez este pedido, ignore esta mensagem; sua senha continua a mesma.",
  );
  return { to, subject: "Redefinição de senha na Polis", html, text };
}
