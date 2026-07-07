import { NextResponse } from "next/server";
import { getPropertyById } from "@/lib/properties";
import { askSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { buildMessages } from "@/lib/prompt";
import { askLLM, isLLMConfigured } from "@/lib/llm";

// Behind a reverse proxy / Vercel, the client IP is the first entry of
// x-forwarded-for. Fallback keeps the limiter functioning in local dev.
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || "unknown";
}

export async function POST(request: Request) {
  try {
    // 1. Rate limit per IP.
    const ip = getClientIp(request);
    if (!checkRateLimit(ip).ok) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    // 2. Parse + validate. safeParse never throws; invalid bodies get a clean message.
    const body = await request.json().catch(() => null);
    const parsed = askSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const { propertyId, question } = parsed.data;

    // 3. Resolve property — deny by default before any model context is built.
    const property = getPropertyById(propertyId);
    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    // 4. Config guard — missing key returns a clean error, never a stack trace.
    if (!isLLMConfigured()) {
      console.error("GROQ_API_KEY is not set; cannot answer questions.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    // 5-6. Build the prompt from server-owned data and call the model.
    const messages = buildMessages(property, question);
    const answer = await askLLM(messages);

    // 7. Success.
    return NextResponse.json({ answer });
  } catch (error) {
    // Log server-side (never the key/value); return a generic error to the client.
    console.error("POST /api/ask failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
