import { currencies, categories, categoryproducts, products } from "./data";

function delay() {
  return Math.floor(Math.random() * 1000);
}

export function getCategoriesAndCurrencies() {
  return new Promise((resolve, reject) => {
    let result = { currencies, categories };
    setTimeout(() => {
      console.info("[Api request] categories and currencies", "\n", result);
      resolve(result);
    }, delay());
  });
}

export function getProductsByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    if (categoryproducts[categoryId]) {
      let productIds = categoryproducts[categoryId];
      let productItems = {};
      for (let productId of productIds) {
        let p = products[productId];
        if (!p) continue;
        productItems[productId] = {
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.category,
          inStock: p.inStock,
          gallery: p.gallery,
          prices: p.prices,
        };
      }
      setTimeout(() => {
        const result = { productIds, productItems };
        console.info("[API request] category: ", categoryId, "\n", result);
        resolve(result);
      }, delay());
    } else {
      setTimeout(() => {
        console.info("[API request] category: ", categoryId, "\n", "Not found");
        reject("Category not found");
      }, delay());
    }
  });
}

export function getProductById(productId) {
  return new Promise((resolve, reject) => {
    if (products[productId]) {
      setTimeout(() => {
        const result = products[productId];
        console.info("[API request] product: ", productId, "\n", result);
        resolve(result);
      }, delay());
    } else {
      setTimeout(() => {
        console.info("[API request] product: ", productId, "\n", "Not found");
        reject("Product not found");
      }, delay());
    }
  });
}

export function getProductsByIds(ids) {
  return new Promise((resolve, reject) => {
    let result = [];
    for (let id of ids) {
      if (products[id]) result.push(products[id]);
    }
    setTimeout(() => {
      console.info("[API request] products: ", ids, "\n", result);
      resolve(result);
    }, delay());
  });
}
