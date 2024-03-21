import { configureStore } from '@reduxjs/toolkit';

import cart from './cart';
import products from './products';
import settings from './settings';

const store = configureStore({
  reducer: {
    products,
    cart,
    settings,
  },
});

export default store;
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
