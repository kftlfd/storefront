// @ts-check

const devenv = process.env.NODE_ENV === "development";
const port = process.env.PORT || 8000;
const apiUrl = devenv
  ? `${window.location.protocol}//localhost:${port}/api/`
  : `${window.location.origin}/api/`;

/**
 * @param {string} url
 * @param {object} body
 */
async function query(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(await response.text());
  }
}

/** @returns {Promise<{currencies: object, categories: object}>} */
export async function getCategoriesAndCurrencies() {
  const res = await query(apiUrl, { currencies: "", categories: "" });
  return res;
}

/** @param {string} categoryId */
export async function getProductsByCategory(categoryId) {
  const { category } = await query(apiUrl, { category: categoryId });
  const productIds = Object.keys(category);
  return { productIds, productItems: category };
}

/** @param {string} productId */
export async function getProductById(productId) {
  const { product } = await query(apiUrl, { product: productId });
  return product;
}

/** @param {string[]} ids */
export async function getProductsByIds(ids) {
  const { products } = await query(apiUrl, { products: ids });
  return products;
}
