import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../api/types";

import { LocalStorage, ls, exp } from "./localStorage";

const expire = exp.seconds(2);

const productsLS = {
  filterExpired() {
    const currentTime = new Date().getTime();
    const products = LocalStorage.get(ls.products, {});
    for (let id in products) {
      if (products[id].expire < currentTime) {
        delete products[id];
      }
    }
    return products;
  },

  load() {
    const data = this.filterExpired();
    LocalStorage.set(ls.products, data);
    return data;
  },

  add(item: Product) {
    const products = LocalStorage.get(ls.products, {});
    products[item.id] = {
      ...item,
      expire: new Date().getTime() + expire,
    };
    LocalStorage.set(ls.products, products);
  },
};

type Products = { [id: string]: Product };

const initialState: { items: Products } = {
  items: productsLS.load(),
};

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    loadProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.items = {
        ...state.items,
        [product.id]: product,
      };
      productsLS.add(product);
    },

    loadProductsBasics: (state, action: PayloadAction<Products>) => {
      const productItems = action.payload;
      state.items = {
        ...productItems,
        ...state.items,
      };
    },
  },
});

export default productsSlice.reducer;

export const { loadProduct, loadProductsBasics } = productsSlice.actions;
