import { createSlice } from "@reduxjs/toolkit";

import { LocalStorage, ls, exp } from "./localStorage";

const expire = exp.seconds(1);

const categorySlice = createSlice({
  name: "category",

  initialState: {
    ids: LocalStorage.get(ls.categoryList, []),
    items: {},
    active: LocalStorage.get(ls.category, null),
  },

  reducers: {
    loadCategoriesList: (state, action) => {
      state.ids = action.payload;
      LocalStorage.set(ls.categoryList, action.payload, expire);
    },
    loadCategory: (state, action) => {
      const { id, productIds } = action.payload;
      state.items[id] = productIds;
    },
    setActiveCategory: (state, action) => {
      const categoryId = action.payload;
      state.active = categoryId;
      LocalStorage.set(ls.category, categoryId);
    },
  },
});

export default categorySlice.reducer;

export const { loadCategoriesList, loadCategory, setActiveCategory } =
  categorySlice.actions;
