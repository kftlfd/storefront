import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/api/types';

export type ProductsMap = Record<Product['id'], Product>;

const initialState: {
  items: ProductsMap;
} = {
  items: {},
};

const productsSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {
    loadProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.items = {
        ...state.items,
        [product.id]: { ...product, loaded: true },
      };
    },

    loadProductsBasics: (state, action: PayloadAction<ProductsMap>) => {
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
