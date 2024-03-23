import env from '@/env';

import type { Category, Currency, Product } from './types';

const apiUrl = env.apiUrl;

type QueryBody = {
  categories?: '';
  currencies?: '';
  category?: string;
  product?: string;
  products?: string[];
};

async function query<T>(body: QueryBody) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return (await response.json()) as T;
  } else {
    throw new Error(await response.text());
  }
}

export async function getCategoriesCurrenciesCartProducts(productIds: Product['id'][]) {
  return query<{ currencies: Currency[]; categories: Category[]; products: Product[] }>({
    currencies: '',
    categories: '',
    products: productIds,
  });
}

export async function getCategoryProducts(categoryId: Category) {
  const { category } = await query<{ category: Product[] }>({
    category: categoryId,
  });
  return category;
}

export async function getProductById(productId: string) {
  const { product } = await query<{ product: Product }>({
    product: productId,
  });
  return product;
}
