import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Category } from '@/api/types';

const initialState: {
  ids: Category[];
  items: Record<Category, string[]>;
} = {
  ids: [],
  items: {},
};

const categorySlice = createSlice({
  name: 'category',

  initialState,

  reducers: {
    loadCategoriesList: (state, action: PayloadAction<Category[]>) => {
      state.ids = action.payload;
    },

    loadCategory: (state, action: PayloadAction<{ id: Category; productIds: string[] }>) => {
      const { id, productIds } = action.payload;
      state.items[id] = productIds;
    },
  },
});

export default categorySlice.reducer;

export const { loadCategoriesList, loadCategory } = categorySlice.actions;
