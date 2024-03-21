import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currency } from '@/api/types';
import { ThemeVariant } from '@/theme/theme';

import { LocalStorageValue } from './localStorage';

const lsTheme = new LocalStorageValue<ThemeVariant>('theme', 'light');
const lsCurrency = new LocalStorageValue<string | null>('currency', null);

const initialState: {
  theme: ThemeVariant;
  currencies: Currency[];
  selectedCurrency: string | null;
} = {
  theme: lsTheme.get(),
  currencies: [],
  selectedCurrency: lsCurrency.get(),
};

const settingsSlice = createSlice({
  name: 'settings',

  initialState,

  reducers: {
    switchTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      lsTheme.set(newTheme);
    },

    loadCurrencies: (state, action: PayloadAction<Currency[]>) => {
      const currencies = action.payload;

      const curr = state.selectedCurrency;
      const label = curr && currencies.find((x) => x.label === curr) ? curr : currencies[0]?.label;

      state.currencies = currencies;
      state.selectedCurrency = label ?? null;
      lsCurrency.set(state.selectedCurrency);
    },

    selectCurrency: (state, action: PayloadAction<string>) => {
      const label = action.payload;
      state.selectedCurrency = label;
      lsCurrency.set(state.selectedCurrency);
    },
  },
});

export default settingsSlice.reducer;

export const { switchTheme, loadCurrencies, selectCurrency } = settingsSlice.actions;
