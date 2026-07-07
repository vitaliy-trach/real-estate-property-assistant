import OpenAI from "openai";

const MODEL = "llama-3.1-8b-instant";
const DEFAULT_BASE_URL = "https://api.groq.com/openai/v1";

// Kept structural (not imported from the SDK) so prompt.ts stays provider-agnostic.
// Each member is assignable to the SDK's ChatCompletionMessageParam.
export type ChatMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string };

let client: OpenAI | null = null;

export function isLLMConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}

// Lazy + memoized: only constructed once we know the key is present (see route guard).
function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: process.env.GROQ_BASE_URL ?? DEFAULT_BASE_URL,
    });
  }
  return client;
}

export async function askLLM(messages: ChatMessage[]): Promise<string> {
  const res = await getClient().chat.completions.create({
    model: MODEL,
    messages,
    max_tokens: 500,
    temperature: 0.3,
  });
  return res.choices[0]?.message?.content?.trim() ?? "";
}
