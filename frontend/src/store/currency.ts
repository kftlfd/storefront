import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Currency } from '@/api/types';

import { LocalStorageValue } from './localStorage';

const lsCurrency = new LocalStorageValue<string | null>('currency', null);

const initialState: {
  list: Currency[];
  selected: string | null;
} = {
  list: [],
  selected: lsCurrency.get(),
};

const currencySlice = createSlice({
  name: 'currency',

  initialState,

  reducers: {
    loadCurrencies: (state, action: PayloadAction<Currency[]>) => {
      const currencies = action.payload;

      const curr = state.selected;
      const label = curr && currencies.find((x) => x.label === curr) ? curr : currencies[0]?.label;

      state.list = currencies;
      state.selected = label ?? null;
      lsCurrency.set(state.selected);
    },

    selectCurrency: (state, action: PayloadAction<string>) => {
      const label = action.payload;
      state.selected = label;
      lsCurrency.set(state.selected);
    },
  },
});

export default currencySlice.reducer;

export const { loadCurrencies, selectCurrency } = currencySlice.actions;
