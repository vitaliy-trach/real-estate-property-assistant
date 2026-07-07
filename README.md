# Real Estate Property Assistant

A small Next.js app for browsing a set of Berlin apartments and asking an assistant
about each one. **Stage 1** is a runnable skeleton: real listings and UI, with the
`/api/ask` route returning a stubbed answer (no model call yet).

> This README is a placeholder and will be completed in the final stage.

## Requirements

- Node.js 18+

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local`. `GROQ_API_KEY` is unused in Stage 1 and will
power the real Q&A model call from Stage 2 onward. `.env.local` is gitignored.

## Project structure

```
app/
  page.tsx              # list + detail + Q&A (single client page)
  layout.tsx            # root layout
  globals.css           # styles
  api/ask/route.ts      # AI route — stubbed answer in Stage 1
components/
  ListingList.tsx       # property cards
  PropertyDetail.tsx    # selected property detail
  QAPanel.tsx           # question input, prompt chips, answer states
lib/
  properties.ts         # mock listings + getPropertyById
  format.ts             # price formatting
types/
  property.ts           # Property type
public/
  property.jpg          # shared listing photo
```
