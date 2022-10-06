import { createSlice } from "@reduxjs/toolkit";

import { LocalStorage, ls, exp } from "./localStorage";

const expire = exp.seconds(1);

const currencySlice = createSlice({
  name: "currency",

  initialState: {
    list: LocalStorage.get(ls.currencyList, []),
    selected: LocalStorage.get(ls.currency, null),
  },

  reducers: {
    loadCurrencies: (state, action) => {
      const currencies = action.payload;

      const curr = state.selected;
      const label =
        curr && currencies.find((x) => x.label === curr)
          ? curr
          : currencies[0].label;

      state.list = currencies;
      state.selected = label;
      LocalStorage.set(ls.currencyList, currencies, expire);
      LocalStorage.set(ls.currency, label);
    },
    selectCurrency: (state, action) => {
      const label = action.payload;
      state.selected = label;
      LocalStorage.set(ls.currency, label);
    },
  },
});

export default currencySlice.reducer;

export const { loadCurrencies, selectCurrency } = currencySlice.actions;
