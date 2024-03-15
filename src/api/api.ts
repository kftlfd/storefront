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

async function query<T>(url: string, body: QueryBody) {
  const response = await fetch(url, {
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

export async function getCategoriesAndCurrencies() {
  const res = await query<{ currencies: Currency[]; categories: Category[] }>(apiUrl, {
    currencies: '',
    categories: '',
  });
  return res;
}

export async function getProductsByCategory(categoryId: Category) {
  const { category } = await query<{ category: Product[] }>(apiUrl, {
    category: categoryId,
  });
  const productIds = category.map((p) => p.id);
  const productItems = category.reduce(
    (acc, p) => ({ ...acc, [p.id]: p }),
    {} as Record<Product['id'], Product>,
  );
  return { productIds, productItems };
}

export async function getProductById(productId: string) {
  const { product } = await query<{ product: Product }>(apiUrl, {
    product: productId,
  });
  return product;
}

export async function getProductsByIds(ids: string[]) {
  const { products } = await query<{ products: Product[] }>(apiUrl, {
    products: ids,
  });
  return products;
}
