import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Category } from '../api/types';
import { exp, LocalStorage, ls } from './localStorage';

const expire = exp.seconds(1);

const initialState: { ids: Category[]; items: { [id: Category]: string[] } } = {
  ids: LocalStorage.get(ls.categoryList, []),
  items: {},
};

const categorySlice = createSlice({
  name: 'category',

  initialState,

  reducers: {
    loadCategoriesList: (state, action: PayloadAction<Category[]>) => {
      state.ids = action.payload;
      LocalStorage.set(ls.categoryList, action.payload, expire);
    },

    loadCategory: (state, action: PayloadAction<{ id: Category; productIds: string[] }>) => {
      const { id, productIds } = action.payload;
      state.items[id] = productIds;
    },
  },
});

export default categorySlice.reducer;

export const { loadCategoriesList, loadCategory } = categorySlice.actions;
