import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/format";

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <article className="detail">
      <div className="detail__media">
        <img src={property.imageUrl} alt={`Photo of ${property.title}`} />
      </div>

      <header className="detail__header">
        <p className="detail__location">{property.location}</p>
        <h2 className="detail__title">{property.title}</h2>
        <p className="detail__price">{formatPrice(property.price)}</p>
      </header>

      <dl className="detail__specs">
        <div className="detail__spec">
          <dt>Bedrooms</dt>
          <dd>{property.beds}</dd>
        </div>
        <div className="detail__spec">
          <dt>Bathrooms</dt>
          <dd>{property.baths}</dd>
        </div>
        <div className="detail__spec">
          <dt>Area</dt>
          <dd>
            {property.areaSqm} m<sup>2</sup>
          </dd>
        </div>
      </dl>

      <p className="detail__description">{property.description}</p>
    </article>
  );
}
