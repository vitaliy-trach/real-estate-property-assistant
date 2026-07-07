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
  const [query, setQuery] = useState("");

  // Guards against a slow response landing after the user switched properties.
  const requestRef = useRef(0);

  // Right-column scroll container (desktop); reset to top on new selection.
  const detailScrollRef = useRef<HTMLElement>(null);

  // Left-column scroll container; reset to top when the search query changes.
  const listScrollRef = useRef<HTMLDivElement>(null);

  // Infinite scroll: reveal the catalogue a page at a time.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingMoreRef = useRef(false);

  // Filter by title or district (case-insensitive); pagination runs on the result.
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProperties = normalizedQuery
    ? properties.filter(
        (property) =>
          property.title.toLowerCase().includes(normalizedQuery) ||
          property.location.toLowerCase().includes(normalizedQuery),
      )
    : properties;

  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  const loadMore = useCallback(() => {
    if (loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    // Simulated latency — the Stage 2 seam for a real paginated request.
    window.setTimeout(() => {
      setVisibleCount((count) => count + PAGE_SIZE);
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

  // Restart pagination and scroll back to the top when the query changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    if (listScrollRef.current) listScrollRef.current.scrollTop = 0;
  }, [normalizedQuery]);

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
          <div className="list-search">
            <div className="list-search__field">
              <svg
                className="list-search__icon"
                viewBox="0 0 20 20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="9" cy="9" r="6" />
                <line x1="13.5" y1="13.5" x2="18" y2="18" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                className="list-search__input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or district"
                aria-label="Search listings by title or district"
              />
              {query ? (
                <button
                  type="button"
                  className="list-search__clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : null}
            </div>
            {normalizedQuery ? (
              <p className="list-search__count" role="status">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? "result" : "results"}
              </p>
            ) : null}
          </div>

          <div className="list-scroll" ref={listScrollRef}>
            {filteredProperties.length === 0 ? (
              <div className="list-empty">
                <p className="list-empty__title">No matching listings</p>
                <p className="list-empty__text">
                  Nothing matches “{query.trim()}”. Try a different title or district.
                </p>
              </div>
            ) : (
              <ListingList
                properties={visibleProperties}
                selectedId={selectedId}
                onSelect={setSelectedId}
                expandedContent={detailPane}
                hasMore={hasMore}
                isLoadingMore={loadingMore}
                onLoadMore={loadMore}
              />
            )}
          </div>
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
