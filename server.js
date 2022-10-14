const express = require("express");
const cors = require("cors");
const path = require("path");
const data = require("./data");

const app = express();
const port = process.env.PORT || 8000;
const staticDir = path.join(__dirname, "build");
const indexFile = path.join(__dirname, "build", "index.html");
const delay = () => Math.floor(Math.random() * 400);

app.use(express.static(staticDir));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/api/", parseAPIrequest);
app.get("*", (req, res) => res.sendFile(indexFile));

app.listen(port, () =>
  console.log(`Started server at:\thttp://localhost:${port}`)
);

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

function checkCurrencies(request, response, errors) {
  if (!request.hasOwnProperty("currencies")) return;
  response.currencies = data.currencies;
}

function checkCategories(request, response, errors) {
  if (!request.hasOwnProperty("categories")) return;
  response.categories = data.categories;
}

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
