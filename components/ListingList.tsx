import type { ReactNode } from "react";
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
}

export default function ListingList({
  properties,
  selectedId,
  onSelect,
  expandedContent,
}: ListingListProps) {
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
    </ul>
  );
}
