export type Category = string;

export type Currency = {
  label: string;
  symbol: string;
};

type Attribute = {
  id: string;
  name: string;
  type: string;
  items: {
    id: string;
    value: string;
  }[];
};

type Price = {
  currency: Currency;
  amount: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  inStock: boolean;
  gallery: string[];
  prices: Price[];
  attributes?: Attribute[];
  description?: string;
  loaded?: boolean;
};
