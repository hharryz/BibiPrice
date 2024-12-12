export type Product = {
  name: string;
  description: string | null;
  shop: string;
  price: string;
  image: string;
  platform: string;
  identifier: string;
  category: string[];
  url: string;
};

export type PriceHistory = {
  date: Date;
  price: number;
};
