import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/api/types';

import { exp, LocalStorage, ls } from './localStorage';

export type Products = { [id: Product['id']]: Product };

const productsLS = {
  filterExpired() {
    const products = LocalStorage.get(ls.products, {} as Products);
    return products;
  },

  load() {
    const data = this.filterExpired();
    LocalStorage.set(ls.products, data);
    return data;
  },

  add(item: Product) {
    const products = LocalStorage.get(ls.products, {} as Products);
    products[item.id] = item;
    LocalStorage.set(ls.products, products, exp.seconds(2));
  },
};

const initialState: { items: Products } = {
  items: productsLS.load(),
};

const productsSlice = createSlice({
  name: 'products',

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
