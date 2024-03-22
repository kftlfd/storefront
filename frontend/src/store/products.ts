import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/api/types';

export type ProductsMap = Record<Product['id'], Product>;

const initialState: {
  products: ProductsMap;
} = {
  products: {},
};

const productsSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {
    loadProduct: (state, action: PayloadAction<Product | Product[]>) => {
      const newProducts = Array.isArray(action.payload) ? action.payload : [action.payload];

      newProducts.forEach((p) => {
        state.products[p.id] = p;
      });
    },
  },
});

export default productsSlice.reducer;

export const { loadProduct } = productsSlice.actions;
