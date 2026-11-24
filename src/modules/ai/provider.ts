import type { ZodType } from "zod";

export type StructuredRequest<T> = {
  purpose: "event_draft" | "lesson_question" | "event_question" | "evaluation";
  instructions: string;
  input: string;
  schema: ZodType<T>;
  schemaName: string;
  maxOutputTokens: number;
};

export type StructuredResponse<T> = {
  data: T;
  model: string;
  usage: { inputTokens: number | null; outputTokens: number | null };
};

/** Adapter boundary: the application depends on this interface, not on the SDK. */
export interface AiProvider {
  readonly model: string;
  generate<T>(request: StructuredRequest<T>): Promise<StructuredResponse<T>>;
}

export class AiUnavailableError extends Error {
  constructor(message = "O apoio de IA não está configurado neste ambiente.") {
    super(message);
    this.name = "AiUnavailableError";
  }
}

export class AiFailureError extends Error {
  constructor(
    message: string,
    readonly code: "TIMEOUT" | "INVALID_OUTPUT" | "PROVIDER_ERROR" | "REFUSED",
  ) {
    super(message);
    this.name = "AiFailureError";
  }
}

let override: AiProvider | null | undefined;

/** Used by tests and the evaluation script to inject a provider. */
export function setAiProviderForTesting(provider: AiProvider | null | undefined) {
  override = provider;
}

export async function getAiProvider(): Promise<AiProvider> {
  if (override !== undefined) {
    if (override === null) throw new AiUnavailableError();
    return override;
  }
  if (!process.env.OPENAI_API_KEY) throw new AiUnavailableError();
  const { OpenAiAdapter } = await import("./openai-adapter");
  return new OpenAiAdapter();
}

export function aiConfigured(): boolean {
  return override ? true : Boolean(process.env.OPENAI_API_KEY);
}
