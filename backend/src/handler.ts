import { type Request, type Response } from 'express';

import { data } from './data.js';
import { Product, type Category, type Currency } from './entities.js';

type ReqBody = {
  currencies?: unknown;
  categories?: unknown;
  category?: string;
  product?: string;
  products?: string[];
};

type ResBody = {
  currencies?: Currency[];
  categories?: Category[];
  category?: Product[];
  product?: Product;
  products?: Product[];
};

type Errors = {
  [K in keyof ResBody]?: string;
};

const delay = () => Math.floor(Math.random() * 400);

const validateCategory = (s: string): s is Category => data.categories.includes(s as Category);

export default function handleAPIrequest({ body }: Request, res: Response) {
  const req = body as ReqBody;
  const response: ResBody = {};
  const errors: Errors = {};

  if (req.currencies !== undefined) {
    response.currencies = getCurrencies();
  }

  if (req.categories !== undefined) {
    response.categories = getCategories();
  }

  if (req.category !== undefined) {
    try {
      response.category = getCategory(req.category);
    } catch (e) {
      errors.category = e instanceof Error ? e.message : 'error';
    }
  }

  if (req.product !== undefined) {
    try {
      response.product = getProduct(req.product);
    } catch (e) {
      errors.product = e instanceof Error ? e.message : 'error';
    }
  }

  if (req.products !== undefined) {
    try {
      response.products = getProducts(req.products);
    } catch (e) {
      errors.products = e instanceof Error ? e.message : 'error';
    }
  }

  let resp: ResBody | Errors = response;

  if (Object.keys(errors).length > 0) {
    resp = errors;
    res.status(400);
  }

  setTimeout(() => res.send(resp), delay());
}

function getCurrencies() {
  return data.currencies;
}

function getCategories() {
  return data.categories;
}

function getCategory(categoryId: string) {
  if (typeof categoryId !== 'string') {
    throw new Error('categoryId of type string is required');
  }
  if (!validateCategory(categoryId)) {
    throw new Error(`categoryId '${categoryId}' not found`);
  }

  const productIds = data.categoryproducts[categoryId];

  return productIds.map((id) => data.productsMap[id]).filter((p): p is Product => p !== undefined);
}

function getProduct(productId: string) {
  if (typeof productId !== 'string') {
    throw new Error('productId of type string is required');
  }

  const product = data.productsMap[productId];

  if (!product) {
    throw new Error('productId "${productId}" not found');
  }

  return product;
}

function getProducts(productIds: string[]) {
  if (!Array.isArray(productIds)) {
    throw new Error('expected array of productIds');
  }

  return productIds
    .map((id) => (typeof id === 'string' ? data.productsMap[id] : undefined))
    .filter((p): p is Product => p !== undefined);
}
