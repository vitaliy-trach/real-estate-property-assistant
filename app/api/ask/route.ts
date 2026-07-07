import { NextResponse } from "next/server";
import { getPropertyById } from "@/lib/properties";

// Stage 1: no model call yet. This handler is the skeleton we harden in Stage 2
// with zod validation, rate limiting, prompt assembly, and the Groq request.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { propertyId, question } = body as {
      propertyId?: unknown;
      question?: unknown;
    };

    if (
      typeof propertyId !== "string" ||
      typeof question !== "string" ||
      question.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Both propertyId and question are required." },
        { status: 400 },
      );
    }

    // Deny by default: an unknown property never reaches any model context.
    const property = getPropertyById(propertyId);
    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    const answer = `Stub: the model's answer about "${property.title}" to the question "${question.trim()}" will appear here.`;

    return NextResponse.json({ answer });
  } catch {
    // Generic error only — no stack trace or internals leak to the client.
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
