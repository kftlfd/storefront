import { configureStore } from "@reduxjs/toolkit";

import currency from "./currency";
import category from "./category";
import products from "./products";
import cart from "./cart";
import settings from "./settings";

const store = configureStore({
  reducer: {
    currency,
    category,
    products,
    cart,
    settings,
  },
});

export default store;
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
