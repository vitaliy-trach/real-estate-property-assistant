# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Next.js app for browsing a small set of Berlin apartments and asking an AI assistant about each one. The project is built in **stages**:

- **Stage 1 (current):** runnable skeleton — real listings and UI, but `/api/ask` returns a hardcoded stub answer with no model call. `zod` and `GROQ_API_KEY` are present but unused.
- **Stage 2+ (planned):** harden `/api/ask` with zod validation, rate limiting, prompt assembly, and the real Groq request. Comments in `app/api/ask/route.ts` and `types/property.ts` mark the seams where this work lands.

When extending the app, prefer completing these planned seams over introducing parallel structures.

## Commands

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npx tsc --noEmit # type-check (tsconfig sets noEmit; strict mode is on)
```

There is **no lint or test script and no test framework configured** — do not assume `npm test`/`npm run lint` exist. Type-checking via `tsc` is the only automated check. Requires Node.js 18+.

## Architecture

**State lives in one place.** `app/page.tsx` is a single `"use client"` component that owns *all* interactive state — selected property, question text, request status, answer, error. Every child (`ListingList`, `PropertyDetail`, `QAPanel`) is presentational and receives state + callbacks as props. Don't add local state to children; lift it into `page.tsx`.

**The detail pane renders twice for one responsive layout.** `page.tsx` builds a single `DetailPane` element and passes it *both* to `ListingList` via `expandedContent` (rendered inline under the selected card, shown on mobile) *and* into the right-column `<aside>` (shown on desktop). Which one is visible is decided purely by CSS in `app/globals.css` — there is no JS breakpoint logic. Changes to the detail/Q&A layout must account for both mount points.

**Stale-response guard.** `page.tsx` uses `requestRef` (a `useRef` counter) to ignore `/api/ask` responses that arrive after the user has switched properties. Any new async flow that depends on the selected property must follow the same pattern: capture the request id before `await`, then bail if `requestRef.current` has moved on. Switching property also resets the whole Q&A conversation (see the `useEffect` on `selectedId`).

**Deny-by-default API.** `app/api/ask/route.ts` validates the body, then calls `getPropertyById` and returns 404 for unknown properties *before* building any answer — so an unknown property never reaches model context. Preserve this ordering when adding the real model call. Error responses return generic messages only; never leak internals or stack traces to the client.

**Data is mock and centralized.** `lib/properties.ts` exports the `properties` array and `getPropertyById`. This is the single source of truth for both the UI and (later) the model context — the `Property.description` field is written to feed the prompt in a future stage. There is no database; edit this file to change listings. All listings share one placeholder image (`/public/property.jpg`).

## Conventions

- **Path alias:** `@/*` maps to the repo root (e.g. `@/components/QAPanel`, `@/lib/properties`).
- **`MAX_QUESTION_LENGTH = 500`** is defined in *both* `app/page.tsx` and `components/QAPanel.tsx`. Keep the two in sync if you change it.
- `QAStatus` (`"idle" | "loading" | "success" | "error"`) is exported from `components/QAPanel.tsx` and drives the answer-area rendering; reuse it rather than re-deriving status.
- Env: copy `.env.example` to `.env.local` (gitignored). `GROQ_API_KEY` is wired for Stage 2 and unused today.
