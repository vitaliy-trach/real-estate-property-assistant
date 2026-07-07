import type { Property } from "@/types/property";

// Stage 1 uses a single shared placeholder photo for every listing.
const PLACEHOLDER_IMAGE = "/property.jpg";

export const properties: Property[] = [
  {
    id: "prenzlauer-berg-altbau",
    title: "Bright Altbau flat in Prenzlauer Berg",
    price: 745000,
    beds: 2,
    baths: 1,
    areaSqm: 78,
    location: "Berlin, Prenzlauer Berg",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A restored two-bedroom apartment in a classic 1900s Altbau building with 3.4-metre ceilings, stucco details and tall windows facing a quiet courtyard. The building sits on a leafy side street a five-minute walk from Kollwitzplatz and its weekly farmers' market. Kastanienallee, several playgrounds and the U2 at Eberswalder Straße are all within easy reach, and the block itself stays calm in the evenings.",
  },
  {
    id: "mitte-canal-loft",
    title: "Modern loft near the Spree in Mitte",
    price: 980000,
    beds: 2,
    baths: 2,
    areaSqm: 92,
    location: "Berlin, Mitte",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A light-filled loft on the top floor of a converted commercial building steps from the Spree river and Museum Island. Open-plan living, two bathrooms and floor-to-ceiling windows with an open outlook over the rooftops. Hackescher Markt with its S-Bahn, restaurants and galleries is a few minutes away on foot; the location is central and lively, though the flat's inner-facing rooms stay noticeably quieter.",
  },
  {
    id: "kreuzberg-canalside",
    title: "Canal-side apartment in Kreuzberg",
    price: 690000,
    beds: 3,
    baths: 1,
    areaSqm: 84,
    location: "Berlin, Kreuzberg",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A spacious three-bedroom flat overlooking the Landwehrkanal, one of Kreuzberg's greenest and most sought-after stretches. Original wooden floors, a south-facing balcony and the Maybachufer Turkish market right around the corner. The neighbourhood is busy and full of cafés, bars and small shops, so it suits someone who wants a vibrant, walkable area; the U8 at Schönleinstraße is five minutes away.",
  },
  {
    id: "charlottenburg-classic",
    title: "Elegant flat in Charlottenburg",
    price: 1150000,
    beds: 3,
    baths: 2,
    areaSqm: 118,
    location: "Berlin, Charlottenburg",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A generous, high-ceilinged apartment in a stately Altbau near Savignyplatz in the west of the city. Three bedrooms, two full bathrooms, a separate kitchen and a formal living room with herringbone parquet. The area is refined and residential, close to Kurfürstendamm shopping, well-regarded schools and Charlottenburg Palace gardens, with excellent S-Bahn and U-Bahn links at Savignyplatz and Zoologischer Garten.",
  },
  {
    id: "neukoelln-compact",
    title: "Compact studio in Neukölln",
    price: 329000,
    beds: 1,
    baths: 1,
    areaSqm: 46,
    location: "Berlin, Neukölln",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A smart one-bedroom apartment in the heart of north Neukölln, one of Berlin's fastest-changing neighbourhoods. Recently renovated with a new kitchen and bathroom, it faces the courtyard so the rooms stay quiet despite the busy streets outside. Weserstraße's cafés and bars, Tempelhofer Feld and the U8 at Rathaus Neukölln are all a short walk away, making it a strong buy-to-let or a first home for one person.",
  },
  {
    id: "friedrichshain-park",
    title: "Family apartment by Volkspark Friedrichshain",
    price: 815000,
    beds: 3,
    baths: 2,
    areaSqm: 102,
    location: "Berlin, Friedrichshain",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A bright three-bedroom family apartment on a quiet street beside Volkspark Friedrichshain, the district's largest green space with playgrounds and sports fields. Two bathrooms, a large eat-in kitchen and a storage room, all in a well-maintained building with a lift. Several schools and daycares are within walking distance, and the tram on Greifswalder Straße reaches Alexanderplatz in under fifteen minutes.",
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}
