import type { Category, Currency, Product } from "./types";

const devenv = process.env.NODE_ENV === "development";
const port = process.env.PORT || 8000;
const apiUrl = devenv
  ? `${window.location.protocol}//localhost:${port}/api/`
  : `${window.location.origin}/api/`;

type QueryBody = {
  categories?: "";
  currencies?: "";
  category?: string;
  product?: string;
  products?: string[];
};

async function query<T>(url: string, body: QueryBody) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const res: T = await response.json();
    return res;
  } else {
    throw new Error(await response.text());
  }
}

export async function getCategoriesAndCurrencies() {
  const res = await query<{ currencies: Category[]; categories: Currency[] }>(
    apiUrl,
    { currencies: "", categories: "" }
  );
  return res;
}

export async function getProductsByCategory(categoryId: Category) {
  const { category } = await query<{ category: Product[] }>(apiUrl, {
    category: categoryId,
  });
  const productIds = Object.keys(category);
  return { productIds, productItems: category };
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
