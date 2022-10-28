// @ts-check

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { data } from "./data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 8000;
const staticDir = join(__dirname, "build");
const indexFile = join(__dirname, "build", "index.html");
const delay = () => Math.floor(Math.random() * 400);

app.use(express.static(staticDir));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/api/", parseAPIrequest);
app.get("*", (req, res) => res.sendFile(indexFile));

app.listen(port, () =>
  console.log(`Started server at:\thttp://localhost:${port}`)
);

/**
 * @param {{ body: any; }} req
 * @param {{ status: (arg0: number) => void; send: (arg0: {}) => void; }} res
 */
function parseAPIrequest(req, res) {
  /*
  expect POST request with json body:
  {
    currencies?: any,
    categories?: any,
    category?: string - categoryId,
    product?: string - productId,
    products?: array of strings - productIds
  }
  */
  const response = {};
  const errors = {};

  checkCurrencies(req.body, response, errors);
  checkCategories(req.body, response, errors);
  checkCategory(req.body, response, errors);
  checkProduct(req.body, response, errors);
  checkProducts(req.body, response, errors);

  let resp = response;
  if (Object.keys(errors).length > 0) {
    resp = errors;
    res.status(400);
  }
  // res.send(resp);
  setTimeout(() => res.send(resp), delay());
}

/**
 * @param {{ hasOwnProperty: (arg0: string) => any; }} request
 * @param {{ currencies?: any; }} response
 * @param {{}} errors
 */
function checkCurrencies(request, response, errors) {
  if (!request.hasOwnProperty("currencies")) return;
  response.currencies = data.currencies;
}

/**
 * @param {{ hasOwnProperty: (arg0: string) => any; }} request
 * @param {{ categories?: any; }} response
 * @param {{}} errors
 */
function checkCategories(request, response, errors) {
  if (!request.hasOwnProperty("categories")) return;
  response.categories = data.categories;
}

/**
 * @param {{ hasOwnProperty: (arg0: string) => any; category: any; }} request
 * @param {{ category?: any; }} response
 * @param {{ category?: any; }} errors
 */
function checkCategory(request, response, errors) {
  if (!request.hasOwnProperty("category")) return;

  // check for correct input
  const categoryId = request.category;
  if (typeof categoryId !== "string") {
    errors.category = `categoryId of type string is required`;
    return;
  }
  if (!data.categoryproducts[categoryId]) {
    errors.category = `categoryId '${categoryId}' not found`;
    return;
  }

  // prepare products data
  let productIds = data.categoryproducts[categoryId];
  let productItems = {};
  for (let productId of productIds) {
    let p = data.products[productId];
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
  response.category = productItems;
}

/**
 * @param {{ hasOwnProperty: (arg0: string) => any; product: any; }} request
 * @param {{ product?: any; }} response
 * @param {{ category?: any; product?: any; }} errors
 */
function checkProduct(request, response, errors) {
  if (!request.hasOwnProperty("product")) return;

  // check for correct input
  const productId = request.product;
  if (typeof productId !== "string") {
    errors.category = `productId of type string is required`;
    return;
  }
  if (!data.products[productId]) {
    errors.product = `productId "${productId}" not found`;
    return;
  }

  // prepare data
  response.product = data.products[productId];
}

/**
 * @param {{ hasOwnProperty: (arg0: string) => any; products: any; }} request
 * @param {{ products?: any; }} response
 * @param {{ products?: any; }} errors
 */
function checkProducts(request, response, errors) {
  if (!request.hasOwnProperty("products")) return;

  // check for correct input
  const ids = request.products;
  if (typeof ids !== "object") {
    errors.products = `productId of type object (array) is required`;
    return;
  }

  // prepare data
  let products = [];
  for (let productId of ids) {
    if (data.products[productId]) {
      products.push(data.products[productId]);
    }
  }
  response.products = products;
}
