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
  {
    id: "schoeneberg-winterfeldt",
    title: "Bright flat near Winterfeldtplatz, Schöneberg",
    price: 585000,
    beds: 2,
    baths: 1,
    areaSqm: 68,
    location: "Berlin, Schöneberg",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A cheerful two-bedroom apartment a block from Winterfeldtplatz, home to Berlin's best-loved Saturday market. The flat has a bright corner living room, a renovated kitchen and a small balcony over a quiet inner street. It is a friendly, established neighbourhood with independent shops and restaurants, and the U1, U2, U3 and U4 all meet at Nollendorfplatz a few minutes away.",
  },
  {
    id: "wedding-brunnenstrasse",
    title: "Renovated flat in up-and-coming Wedding",
    price: 398000,
    beds: 2,
    baths: 1,
    areaSqm: 61,
    location: "Berlin, Wedding",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A fully renovated two-bedroom apartment in Wedding, one of the last central districts where prices are still reasonable. New wiring, oak-effect floors and a modern bathroom, on a middle floor with a lift. Humboldthain park and its climbing towers are a short stroll away, and Gesundbrunnen's S-Bahn, U-Bahn and regional trains make the rest of the city and the airport easy to reach.",
  },
  {
    id: "moabit-waterside",
    title: "Quiet flat by the water in Moabit",
    price: 469000,
    beds: 2,
    baths: 1,
    areaSqm: 72,
    location: "Berlin, Moabit",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A calm two-bedroom apartment on a residential island district ringed by the Spree and the canals. High ceilings, a west-facing living room and a quiet, tree-lined street near the historic Arminiusmarkt hall. Moabit is central but understated, with everyday shops close by and the U9 at Turmstraße connecting quickly to Zoologischer Garten and the south of the city.",
  },
  {
    id: "treptow-parkside",
    title: "Park-side apartment in Alt-Treptow",
    price: 540000,
    beds: 2,
    baths: 1,
    areaSqm: 70,
    location: "Berlin, Treptow",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A well-kept two-bedroom flat a few steps from Treptower Park, with its riverside lawns, beer garden and boat rentals on the Spree. The apartment is bright and quiet, with a balcony facing greenery rather than the street. The S-Bahn at Treptower Park reaches Ostkreuz and the city centre in minutes, while Kreuzberg and Neukölln are just across the river.",
  },
  {
    id: "lichtenberg-value",
    title: "Value two-bedroom in Lichtenberg",
    price: 315000,
    beds: 2,
    baths: 1,
    areaSqm: 64,
    location: "Berlin, Lichtenberg",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "An affordable, move-in-ready two-bedroom apartment in a quiet residential pocket of Lichtenberg. Practical layout, a separate kitchen and a loggia, in a maintained building with low running costs. The Tierpark zoo and several parks are nearby, everyday shopping is on the doorstep, and trams and the U5 give a direct ride into the centre — a sensible choice for a first purchase.",
  },
  {
    id: "wilmersdorf-altbau",
    title: "Elegant Altbau in Wilmersdorf",
    price: 890000,
    beds: 3,
    baths: 2,
    areaSqm: 108,
    location: "Berlin, Wilmersdorf",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A gracious three-bedroom Altbau apartment on a quiet, leafy street near Ludwigkirchplatz. Original mouldings, double doors and a large south-west living room that fills with afternoon light. The area is calm and well-heeled, with cafés around the square, Volkspark Wilmersdorf a short walk away and the U3 and U7 giving quick access across the west of Berlin.",
  },
  {
    id: "steglitz-garden",
    title: "Family flat near the Botanical Garden, Steglitz",
    price: 625000,
    beds: 3,
    baths: 2,
    areaSqm: 96,
    location: "Berlin, Steglitz",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A comfortable three-bedroom family apartment close to Berlin's Botanical Garden and its glasshouses. Two bathrooms, a bright kitchen and a quiet balcony, in a green, low-rise part of the south-west. Several primary schools and a Gymnasium are within walking distance, and the S1 runs directly to the centre — a settled, family-friendly location with plenty of everyday amenities.",
  },
  {
    id: "pankow-leafy",
    title: "Leafy apartment in Pankow",
    price: 452000,
    beds: 2,
    baths: 1,
    areaSqm: 74,
    location: "Berlin, Pankow",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A pleasant two-bedroom apartment on a residential street near Bürgerpark Pankow, with its ponds, playgrounds and shaded paths. The flat is bright and quiet, with a modern kitchen and a balcony over the garden courtyard. Pankow keeps a relaxed, local feel while a tram and the U2 connect it to Prenzlauer Berg and the centre in a short ride.",
  },
  {
    id: "tempelhof-feld",
    title: "Spacious flat by Tempelhofer Feld",
    price: 560000,
    beds: 2,
    baths: 1,
    areaSqm: 80,
    location: "Berlin, Tempelhof",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A spacious two-bedroom apartment a block from Tempelhofer Feld, the vast former airfield now used for cycling, skating and picnics. Generous rooms, a bright living area and a balcony catching the evening sun over the park. The U6 at Paradestraße reaches the centre directly, and the surrounding streets are quiet and residential despite the open space next door.",
  },
  {
    id: "koepenick-oldtown",
    title: "Riverside apartment in Köpenick old town",
    price: 385000,
    beds: 2,
    baths: 1,
    areaSqm: 76,
    location: "Berlin, Köpenick",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A characterful two-bedroom apartment in the cobbled old town of Köpenick, where the Dahme meets the Spree in Berlin's leafy south-east. Water and forest are on the doorstep, with the baroque palace, a weekly market and small cafés nearby. It is a quiet, almost small-town setting; the S3 and trams reach the city, and Ostkreuz is around half an hour away.",
  },
  {
    id: "tiergarten-pied",
    title: "Central pied-à-terre near Tiergarten",
    price: 720000,
    beds: 1,
    baths: 1,
    areaSqm: 52,
    location: "Berlin, Tiergarten",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A polished one-bedroom apartment moments from the Tiergarten, Berlin's great central park. Compact but well-proportioned, with a smart kitchen and a quiet bedroom facing the courtyard. It is ideal as a low-maintenance city base or a rental: the Hauptbahnhof, the government quarter and the S-Bahn are all within walking distance, putting the whole city within easy reach.",
  },
  {
    id: "weissensee-lake",
    title: "Lake-view apartment in Weißensee",
    price: 430000,
    beds: 2,
    baths: 1,
    areaSqm: 69,
    location: "Berlin, Weißensee",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A relaxed two-bedroom apartment near the Weißer See, a small lake with a lido, boat hire and a lakeside beer garden. The living room looks out over greenery, and the neighbourhood is quiet and residential with a genuine local feel. There is no U-Bahn here, but frequent trams reach Alexanderplatz in about twenty minutes, and everyday shops are close by.",
  },
  {
    id: "friedrichshain-eastside",
    title: "Loft near the East Side Gallery, Friedrichshain",
    price: 675000,
    beds: 1,
    baths: 1,
    areaSqm: 58,
    location: "Berlin, Friedrichshain",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A stylish open-plan loft close to the Spree and the East Side Gallery, in the middle of Friedrichshain's nightlife and riverside bars. Exposed concrete, large industrial windows and a mezzanine sleeping area. This is a lively, young part of the city that stays busy after dark; Warschauer Straße's S-Bahn, U-Bahn and trams make it a well-connected base for someone who wants to be in the thick of it.",
  },
  {
    id: "rixdorf-charm",
    title: "Charming flat in historic Rixdorf, Neukölln",
    price: 505000,
    beds: 2,
    baths: 1,
    areaSqm: 71,
    location: "Berlin, Neukölln",
    imageUrl: PLACEHOLDER_IMAGE,
    description:
      "A charming two-bedroom apartment in Rixdorf, a cobbled, village-like corner of Neukölln around the historic Richardplatz. Wooden floors, a bright living room and a courtyard that stays quiet and green. The pocket is full of small cafés, a smithy and seasonal markets, yet the U7 at Karl-Marx-Straße and Tempelhofer Feld are only a short walk away.",
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}
