"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";

const ERRORS: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "E-mail ou senha incorretos.",
  USER_ALREADY_EXISTS: "Já existe uma conta com este e-mail. Entre com sua senha ou recupere o acesso.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Já existe uma conta com este e-mail. Entre com sua senha ou recupere o acesso.",
  PASSWORD_TOO_SHORT: "A senha precisa ter pelo menos 10 caracteres.",
  PASSWORD_TOO_LONG: "A senha pode ter no máximo 128 caracteres.",
  INVALID_EMAIL: "Informe um e-mail no formato nome@dominio.com.",
  INVALID_TOKEN: "O link expirou ou já foi usado. Peça um novo link.",
  INVALID_PASSWORD: "A senha atual está incorreta.",
};

export function authErrorMessage(error: { code?: string; message?: string; status?: number } | null | undefined): string {
  if (!error) return "Não foi possível concluir agora. Tente novamente.";
  if (error.status === 429) return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.";
  if (error.code && ERRORS[error.code]) return ERRORS[error.code];
  if (error.message && /termos|nome|caracteres/i.test(error.message)) return error.message;
  return "Não foi possível concluir agora. Verifique os dados e tente novamente.";
}

export function SignInForm({ next }: { next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const { error: authError } = await authClient.signIn.email({ email: email.trim(), password });
    if (authError) {
      setError(authErrorMessage(authError));
      setBusy(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <Notice tone="error" role="alert">
          {error}
        </Notice>
      ) : null}
      <TextField id="email" label="E-mail" type="email" autoComplete="email" inputMode="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField id="password" label="Senha" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" block busy={busy} busyLabel="Entrando...">
        Entrar
      </Button>
      <p className="text-meta text-ink-soft">
        <Link href="/recuperar-senha" className="text-link">
          Esqueci minha senha
        </Link>
      </p>
    </form>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "", password: "", acceptTerms: false });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate() {
    const errors: Record<string, string> = {};
    const name = values.name.trim();
    if (name.length < 2 || name.length > 40) errors.name = "Use entre 2 e 40 caracteres.";
    else if (!/^[\p{L}\p{M}\p{N} .'’_-]+$/u.test(name)) errors.name = "Use letras, números, espaços e pontuação simples (sem e-mails ou links).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Informe um e-mail no formato nome@dominio.com.";
    if (values.password.length < 10) errors.password = "A senha precisa ter pelo menos 10 caracteres.";
    if (!values.acceptTerms) errors.acceptTerms = "É preciso aceitar os Termos de uso e a Política de privacidade para criar a conta.";
    return errors;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;
    setBusy(true);
    setError(null);
    const { error: authError } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      callbackURL: "/verificar-email",
      // Validated on the server before the account is created.
      acceptTerms: true,
    } as Parameters<typeof authClient.signUp.email>[0]);
    if (authError) {
      setError(authErrorMessage(authError));
      setBusy(false);
      return;
    }
    router.push("/questionario?bemvindo=1");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <Notice tone="error" role="alert">
          {error}
        </Notice>
      ) : null}
      <TextField
        id="name"
        label="Nome de exibição"
        autoComplete="nickname"
        hint="É o único dado exibido publicamente, junto com o que você decidir publicar."
        value={values.name}
        error={fieldErrors.name}
        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
      />
      <TextField
        id="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        inputMode="email"
        hint="Usado para acessar e recuperar a conta. Nunca é exibido."
        value={values.email}
        error={fieldErrors.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
      />
      <TextField
        id="password"
        label="Senha"
        type="password"
        autoComplete="new-password"
        hint="Pelo menos 10 caracteres."
        value={values.password}
        error={fieldErrors.password}
        onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
      />
      <div className="flex flex-col gap-2">
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-body">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 flex-none accent-[var(--color-action)]"
            checked={values.acceptTerms}
            aria-invalid={fieldErrors.acceptTerms ? true : undefined}
            aria-describedby={fieldErrors.acceptTerms ? "terms-error" : undefined}
            onChange={(e) => setValues((v) => ({ ...v, acceptTerms: e.target.checked }))}
          />
          <span>
            Li e aceito os{" "}
            <Link href="/termos" className="text-link" target="_blank">
              Termos de uso
            </Link>{" "}
            e a{" "}
            <Link href="/privacidade" className="text-link" target="_blank">
              Política de privacidade
            </Link>
            .
          </span>
        </label>
        {fieldErrors.acceptTerms ? (
          <p id="terms-error" className="text-meta font-medium text-danger" role="alert">
            {fieldErrors.acceptTerms}
          </p>
        ) : null}
        <p className="text-meta text-ink-soft">O questionário de afinidades tem uma autorização separada, que você decide depois.</p>
      </div>
      <Button type="submit" block busy={busy} busyLabel="Criando conta...">
        Criar conta
      </Button>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Informe um e-mail no formato nome@dominio.com.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: authError } = await authClient.requestPasswordReset({ email: email.trim(), redirectTo: "/redefinir-senha" });
    setBusy(false);
    if (authError && authError.status === 429) {
      setError(authErrorMessage(authError));
      return;
    }
    // Same message whether or not the e-mail exists.
    setSent(true);
  }

  if (sent) {
    return (
      <Notice tone="success" title="Verifique seu e-mail" role="status">
        Se houver uma conta com este endereço, enviaremos um link para criar uma nova senha. O link vale por 1 hora e só pode ser usado uma vez.
      </Notice>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <TextField id="email" label="E-mail da conta" type="email" autoComplete="email" inputMode="email" value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" block busy={busy} busyLabel="Enviando...">
        Enviar link de recuperação
      </Button>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (password.length < 10) return setError("A senha precisa ter pelo menos 10 caracteres.");
    if (password !== confirm) return setError("As senhas não coincidem.");
    setBusy(true);
    setError(null);
    const { error: authError } = await authClient.resetPassword({ newPassword: password, token });
    setBusy(false);
    if (authError) return setError(authErrorMessage(authError));
    setDone(true);
  }

  if (done) {
    return (
      <Notice tone="success" title="Senha redefinida" role="status">
        Sua senha foi alterada e as sessões abertas foram encerradas.{" "}
        <Link href="/entrar" className="text-link">
          Entrar com a nova senha
        </Link>
      </Notice>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <Notice tone="error" role="alert">
          {error}
        </Notice>
      ) : null}
      <TextField id="password" label="Nova senha" type="password" autoComplete="new-password" hint="Pelo menos 10 caracteres." value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField id="confirm" label="Confirme a nova senha" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <Button type="submit" block busy={busy} busyLabel="Salvando...">
        Salvar nova senha
      </Button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (next.length < 10) return setMessage({ tone: "error", text: "A nova senha precisa ter pelo menos 10 caracteres." });
    setBusy(true);
    setMessage(null);
    const { error } = await authClient.changePassword({ currentPassword: current, newPassword: next, revokeOtherSessions: true });
    setBusy(false);
    if (error) return setMessage({ tone: "error", text: authErrorMessage(error) });
    setCurrent("");
    setNext("");
    setMessage({ tone: "success", text: "Senha alterada. As outras sessões abertas foram encerradas." });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {message ? (
        <Notice tone={message.tone} role={message.tone === "error" ? "alert" : "status"}>
          {message.text}
        </Notice>
      ) : null}
      <TextField id="current-password" label="Senha atual" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      <TextField id="new-password" label="Nova senha" type="password" autoComplete="new-password" hint="Pelo menos 10 caracteres." value={next} onChange={(e) => setNext(e.target.value)} />
      <div>
        <Button type="submit" variant="secondary" busy={busy} busyLabel="Salvando...">
          Alterar senha
        </Button>
      </div>
    </form>
  );
}

export function ResendVerificationButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  async function resend() {
    if (state === "busy") return;
    setState("busy");
    const { error } = await authClient.sendVerificationEmail({ email, callbackURL: "/verificar-email" });
    setState(error ? "error" : "sent");
  }
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Button variant="secondary" size="sm" onClick={resend} busy={state === "busy"} busyLabel="Enviando...">
          Reenviar e-mail de confirmação
        </Button>
      </div>
      <p className="text-meta text-ink-soft" role="status" aria-live="polite">
        {state === "sent" ? "Enviamos um novo link. Confira também a caixa de spam." : state === "error" ? "Não foi possível reenviar agora. Aguarde alguns minutos." : ""}
      </p>
    </div>
  );
}
