import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Category, Product } from '@/api/types';

export type ProductsMap = Record<Product['id'], Product>;

const initialState: {
  products: ProductsMap;
  categories: Category[];
  productIdsByCategory: Record<Category, string[]>;
} = {
  products: {},
  categories: [],
  productIdsByCategory: {},
};

const productsSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {
    loadProduct: (state, action: PayloadAction<Product | Product[]>) => {
      const newProducts = Array.isArray(action.payload) ? action.payload : [action.payload];

      const newProductsMap = newProducts.reduce(
        (acc, p) => ({ ...acc, [p.id]: { ...p, loaded: true } }),
        {} as ProductsMap,
      );

      state.products = {
        ...state.products,
        ...newProductsMap,
      };
    },

    loadProductsBasics: (state, action: PayloadAction<ProductsMap>) => {
      const productItems = action.payload;
      state.products = {
        ...productItems,
        ...state.products,
      };
    },

    loadCategoriesList: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    loadProductIdsByCategory: (
      state,
      action: PayloadAction<{ categoryId: Category; productIds: string[] }>,
    ) => {
      const { categoryId, productIds } = action.payload;
      state.productIdsByCategory[categoryId] = productIds;
    },
  },
});

export default productsSlice.reducer;

export const { loadProduct, loadProductsBasics, loadCategoriesList, loadProductIdsByCategory } =
  productsSlice.actions;
