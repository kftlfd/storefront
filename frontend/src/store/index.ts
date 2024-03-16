import { configureStore } from '@reduxjs/toolkit';

import cart from './cart';
import category from './category';
import currency from './currency';
import products from './products';
import settings from './settings';

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
