"use client";

import { useId, type KeyboardEvent } from "react";
import type { Property } from "@/types/property";

export type QAStatus = "idle" | "loading" | "success" | "error";

const MAX_QUESTION_LENGTH = 500;

const SUGGESTIONS = [
  "Good for families?",
  "How is the transit?",
  "What's nearby?",
  "Is it a quiet area?",
];

interface QAPanelProps {
  property: Property;
  question: string;
  status: QAStatus;
  answer: string;
  errorMessage: string;
  onQuestionChange: (value: string) => void;
  onAsk: () => void;
}

export default function QAPanel({
  property,
  question,
  status,
  answer,
  errorMessage,
  onQuestionChange,
  onAsk,
}: QAPanelProps) {
  const inputId = useId();
  const trimmedLength = question.trim().length;
  const tooLong = question.length > MAX_QUESTION_LENGTH;
  const canAsk = trimmedLength > 0 && !tooLong && status !== "loading";

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && canAsk) {
      event.preventDefault();
      onAsk();
    }
  }

  return (
    <section className="qa" aria-label={`Questions about ${property.title}`}>
      <header className="qa__header">
        <span className="qa__mark" aria-hidden="true" />
        <div>
          <h3 className="qa__title">Ask about this property</h3>
          <p className="qa__subtitle">The assistant answers from this listing&apos;s description.</p>
        </div>
      </header>

      <div className="qa__chips">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="qa__chip"
            onClick={() => onQuestionChange(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="qa__field">
        <label className="qa__label" htmlFor={inputId}>
          Your question
        </label>
        <textarea
          id={inputId}
          className="qa__input"
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. how far is the nearest U-Bahn?"
          rows={3}
          aria-describedby={`${inputId}-meta`}
          aria-invalid={tooLong}
        />
        <div className="qa__field-meta" id={`${inputId}-meta`}>
          <span className={`qa__counter${tooLong ? " qa__counter--over" : ""}`}>
            {question.length} / {MAX_QUESTION_LENGTH}
          </span>
          <button type="button" className="qa__ask" onClick={onAsk} disabled={!canAsk}>
            {status === "loading" ? "Thinking…" : "Ask"}
          </button>
        </div>
        {tooLong ? (
          <p className="qa__hint qa__hint--warn" role="alert">
            That question is too long — please keep it under {MAX_QUESTION_LENGTH} characters.
          </p>
        ) : null}
      </div>

      <div className="qa__answer" aria-live="polite">
        {status === "idle" ? (
          <p className="qa__placeholder">
            Ask a question about this property — or tap one of the prompts above.
          </p>
        ) : null}

        {status === "loading" ? (
          <p className="qa__loading" role="status">
            <span className="qa__spinner" aria-hidden="true" />
            Thinking it over…
          </p>
        ) : null}

        {status === "success" ? (
          <div className="qa__bubble">
            <span className="qa__bubble-label">Assistant</span>
            <p className="qa__bubble-text">{answer}</p>
          </div>
        ) : null}

        {status === "error" ? (
          <p className="qa__error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </section>
  );
}
