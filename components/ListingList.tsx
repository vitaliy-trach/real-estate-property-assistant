"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/format";

interface ListingListProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /**
   * Rendered inline underneath the selected card. Used on mobile, where the
   * detail + Q&A expand in place; hidden by CSS on desktop, which shows them
   * in a dedicated right column instead.
   */
  expandedContent?: ReactNode;
  /** Whether more listings remain beyond the ones passed in `properties`. */
  hasMore: boolean;
  /** True while the next page is being fetched. */
  isLoadingMore: boolean;
  /** Request the next page. Called on scroll and on the fallback button. */
  onLoadMore: () => void;
}

export default function ListingList({
  properties,
  selectedId,
  onSelect,
  expandedContent,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: ListingListProps) {
  const sentinelRef = useRef<HTMLLIElement | null>(null);

  // Auto-load the next page when the sentinel scrolls into view. The button
  // below is the keyboard-accessible fallback and the no-observer path.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, onLoadMore]);

  return (
    <ul className="listing-list" aria-label="Property listings">
      {properties.map((property) => {
        const isSelected = property.id === selectedId;
        return (
          <li key={property.id} className="listing-item">
            <button
              type="button"
              className={`listing-card${isSelected ? " listing-card--active" : ""}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(property.id)}
            >
              <span className="listing-card__media">
                <img src={property.imageUrl} alt="" loading="lazy" />
              </span>
              <span className="listing-card__body">
                <span className="listing-card__location">{property.location}</span>
                <span className="listing-card__title">{property.title}</span>
                <span className="listing-card__price">{formatPrice(property.price)}</span>
                <span className="listing-card__stats">
                  <span>
                    {property.beds} {property.beds === 1 ? "bed" : "beds"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {property.baths} {property.baths === 1 ? "bath" : "baths"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{property.areaSqm} m²</span>
                </span>
              </span>
            </button>

            {isSelected && expandedContent ? (
              <div className="listing-item__expand">{expandedContent}</div>
            ) : null}
          </li>
        );
      })}

      <li className="listing-sentinel" ref={sentinelRef}>
        {isLoadingMore ? (
          <p className="listing-status" role="status">
            <span className="listing-spinner" aria-hidden="true" />
            Loading more listings…
          </p>
        ) : hasMore ? (
          <button type="button" className="load-more" onClick={onLoadMore}>
            Load more listings
          </button>
        ) : (
          <p className="listing-end">You’ve reached the end · {properties.length} listings</p>
        )}
      </li>
    </ul>
  );
}
