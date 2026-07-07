import { z } from "zod";

// Server-side validation is authoritative — the Stage-1 client check is UX only.
// The 500-char cap bounds prompt size (OWASP A06).
export const askSchema = z.object({
  propertyId: z.string().min(1),
  question: z
    .string()
    .trim()
    .min(1, "Question is empty")
    .max(500, "Question too long"),
});

export type AskInput = z.infer<typeof askSchema>;
