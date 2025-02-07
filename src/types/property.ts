export interface PropertyType {
    id?: string;
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    image?: string;
    embedding?: number[];
  }