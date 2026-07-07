export interface Property {
  id: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  areaSqm: number;
  location: string;
  imageUrl: string; // local placeholder photo served from /public
  description: string; // 1-2 paragraphs; feeds the model context in a later stage
}
