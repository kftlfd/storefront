import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Currency } from "../api/types";
import { LocalStorage, ls, exp } from "./localStorage";

const expire: number = exp.seconds(1);

const initialState: { list: Currency[]; selected: string } = {
  list: LocalStorage.get(ls.currencyList, []),
  selected: LocalStorage.get(ls.currency, null),
};

const currencySlice = createSlice({
  name: "currency",

  initialState,

  reducers: {
    loadCurrencies: (state, action: PayloadAction<Currency[]>) => {
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

    selectCurrency: (state, action: PayloadAction<string>) => {
      const label = action.payload;
      state.selected = label;
      LocalStorage.set(ls.currency, label);
    },
  },
});

export default currencySlice.reducer;

export const { loadCurrencies, selectCurrency } = currencySlice.actions;
