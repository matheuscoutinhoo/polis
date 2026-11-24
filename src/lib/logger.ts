type Level = "debug" | "info" | "warn" | "error";

const SENSITIVE_KEYS = /(email|password|senha|token|secret|answer|resposta|question|pergunta|body|text|cookie|authorization)/i;

function sanitize(data: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  if (!data) return undefined;
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEYS.test(key)) {
      clean[key] = "[omitido]";
    } else if (value instanceof Error) {
      clean[key] = { name: value.name, message: value.message.slice(0, 300) };
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

function write(level: Level, event: string, data?: Record<string, unknown>) {
  if (level === "debug" && process.env.NODE_ENV === "production") return;
  const line = JSON.stringify({ level, event, time: new Date().toISOString(), ...sanitize(data) });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/**
 * Structured logger. Only operational metadata is logged: keys that may carry
 * personal data, credentials, questionnaire answers or user content are omitted.
 */
export const logger = {
  debug: (event: string, data?: Record<string, unknown>) => write("debug", event, data),
  info: (event: string, data?: Record<string, unknown>) => write("info", event, data),
  warn: (event: string, data?: Record<string, unknown>) => write("warn", event, data),
  error: (event: string, data?: Record<string, unknown>) => write("error", event, data),
};
