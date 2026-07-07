"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ListingList from "@/components/ListingList";
import PropertyDetail from "@/components/PropertyDetail";
import QAPanel, { type QAStatus } from "@/components/QAPanel";
import { properties, getPropertyById } from "@/lib/properties";
import type { Property } from "@/types/property";

const MAX_QUESTION_LENGTH = 500;
const PAGE_SIZE = 8;

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<QAStatus>("idle");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Guards against a slow response landing after the user switched properties.
  const requestRef = useRef(0);

  // Right-column scroll container (desktop); reset to top on new selection.
  const detailScrollRef = useRef<HTMLElement>(null);

  // Infinite scroll: reveal the catalogue a page at a time.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingMoreRef = useRef(false);

  const visibleProperties = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;

  const loadMore = useCallback(() => {
    if (loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    // Simulated latency — the Stage 2 seam for a real paginated request.
    window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, properties.length));
      setLoadingMore(false);
      loadingMoreRef.current = false;
    }, 350);
  }, []);

  const selected = selectedId ? getPropertyById(selectedId) : undefined;

  // Every property gets its own fresh conversation.
  useEffect(() => {
    requestRef.current += 1;
    setQuestion("");
    setStatus("idle");
    setAnswer("");
    setErrorMessage("");
    if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
  }, [selectedId]);

  async function ask() {
    const propertyId = selectedId;
    const trimmed = question.trim();
    if (!propertyId || trimmed.length === 0 || trimmed.length > MAX_QUESTION_LENGTH) {
      return;
    }

    const requestId = (requestRef.current += 1);
    setStatus("loading");
    setAnswer("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, question: trimmed }),
      });

      if (requestRef.current !== requestId) return; // stale — property changed
      if (!response.ok) throw new Error("Request failed");

      const data: unknown = await response.json();
      if (requestRef.current !== requestId) return;

      const nextAnswer =
        data && typeof data === "object" && typeof (data as { answer?: unknown }).answer === "string"
          ? (data as { answer: string }).answer
          : "";
      setAnswer(nextAnswer);
      setStatus("success");
    } catch {
      if (requestRef.current !== requestId) return;
      setStatus("error");
      setErrorMessage("The assistant could not respond. Please try again.");
    }
  }

  const detailPane = selected ? (
    <DetailPane
      property={selected}
      question={question}
      status={status}
      answer={answer}
      errorMessage={errorMessage}
      onQuestionChange={setQuestion}
      onAsk={ask}
    />
  ) : null;

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Berlin · {properties.length} listings</p>
        <h1 className="app__title">Property Assistant</h1>
        <p className="app__lede">
          Browse a handful of Berlin apartments and ask about each one — schools, transit,
          the feel of the street.
        </p>
      </header>

      <main className="layout">
        <div className="layout__list">
          <ListingList
            properties={visibleProperties}
            selectedId={selectedId}
            onSelect={setSelectedId}
            expandedContent={detailPane}
            hasMore={hasMore}
            isLoadingMore={loadingMore}
            onLoadMore={loadMore}
          />
        </div>

        <aside className="layout__detail" aria-live="polite" ref={detailScrollRef}>
          {selected ? (
            detailPane
          ) : (
            <div className="empty">
              <p className="empty__title">Select a property</p>
              <p className="empty__text">
                Pick a listing on the left to see the full details and ask the assistant a
                question.
              </p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

interface DetailPaneProps {
  property: Property;
  question: string;
  status: QAStatus;
  answer: string;
  errorMessage: string;
  onQuestionChange: (value: string) => void;
  onAsk: () => void;
}

function DetailPane({
  property,
  question,
  status,
  answer,
  errorMessage,
  onQuestionChange,
  onAsk,
}: DetailPaneProps) {
  return (
    <div className="detail-pane">
      <PropertyDetail property={property} />
      <QAPanel
        property={property}
        question={question}
        status={status}
        answer={answer}
        errorMessage={errorMessage}
        onQuestionChange={onQuestionChange}
        onAsk={onAsk}
      />
    </div>
  );
}
