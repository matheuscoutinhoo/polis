import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { AiFailureError, type AiProvider, type StructuredRequest, type StructuredResponse } from "./provider";

/**
 * OpenAI adapter (official SDK, Responses API, structured outputs). Only
 * editorial material and the question text are sent — never e-mail, account
 * identifiers, questionnaire answers or affinity results. `store: false`
 * disables storage of responses for later retrieval; the provider's own
 * retention rules for abuse monitoring still apply to the account in use.
 */
export class OpenAiAdapter implements AiProvider {
  readonly model: string;
  private readonly client: OpenAI;
  private readonly timeoutMs: number;
  private readonly reasoningEffort: string | null;

  constructor() {
    this.model = process.env.OPENAI_MODEL || "gpt-6.2-sol";
    this.timeoutMs = Number(process.env.OPENAI_TIMEOUT_MS ?? 45000);
    this.reasoningEffort = process.env.OPENAI_REASONING_EFFORT || null;
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: this.timeoutMs, maxRetries: 1 });
  }

  async generate<T>(request: StructuredRequest<T>): Promise<StructuredResponse<T>> {
    try {
      const response = await this.client.responses.parse({
        model: this.model,
        instructions: request.instructions,
        input: request.input,
        max_output_tokens: request.maxOutputTokens,
        store: false,
        ...(this.reasoningEffort ? { reasoning: { effort: this.reasoningEffort as "low" | "medium" | "high" } } : {}),
        text: { format: zodTextFormat(request.schema as never, request.schemaName) },
      });
      const parsed = response.output_parsed as T | null;
      if (!parsed) {
        throw new AiFailureError("A resposta do modelo não seguiu o formato esperado.", "INVALID_OUTPUT");
      }
      return {
        data: parsed,
        model: this.model,
        usage: { inputTokens: response.usage?.input_tokens ?? null, outputTokens: response.usage?.output_tokens ?? null },
      };
    } catch (error) {
      if (error instanceof AiFailureError) throw error;
      if (error instanceof OpenAI.APIConnectionTimeoutError) throw new AiFailureError("O serviço de IA demorou demais para responder.", "TIMEOUT");
      if (error instanceof OpenAI.APIError) throw new AiFailureError(`Falha no serviço de IA (status ${error.status ?? "desconhecido"}).`, "PROVIDER_ERROR");
      throw new AiFailureError("Falha inesperada no serviço de IA.", "PROVIDER_ERROR");
    }
  }
}
