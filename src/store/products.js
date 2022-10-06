import { createSlice } from "@reduxjs/toolkit";

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

  add(item) {
    const products = LocalStorage.get(ls.products, {});
    products[item.id] = {
      ...item,
      expire: new Date().getTime() + expire,
    };
    LocalStorage.set(ls.products, products);
  },
};

const productsSlice = createSlice({
  name: "products",

  initialState: {
    items: productsLS.load(),
  },

  reducers: {
    loadProduct: (state, action) => {
      const product = action.payload;
      state.items = {
        ...state.items,
        [product.id]: product,
      };
      productsLS.add(product);
    },
    loadProductsBasics: (state, action) => {
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
