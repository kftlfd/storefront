import { configureStore } from "@reduxjs/toolkit";

import currency from "./currency";
import category from "./category";
import products from "./products";
import cart from "./cart";
import settings from "./settings";

export default configureStore({
  reducer: {
    currency,
    category,
    products,
    cart,
    settings,
  },
});
