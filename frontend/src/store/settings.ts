import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currency } from '@/api/types';
import { ThemeVariant } from '@/theme/theme';

import { LocalStorageValue } from './localStorage';

const lsTheme = new LocalStorageValue<ThemeVariant>('theme', 'light');
const lsCurrency = new LocalStorageValue<Currency | null>('currency', null);

const initialState: {
  theme: ThemeVariant;
  currencies: Currency[];
  selectedCurrency: Currency | null;
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
      state.currencies = currencies;

      if (currencies.length < 1) {
        state.selectedCurrency = null;
      }
      if (!currencies.find(({ label }) => label === state.selectedCurrency?.label)) {
        state.selectedCurrency = currencies[0] ?? null;
      }

      lsCurrency.set(state.selectedCurrency);
    },

    selectCurrency: (state, action: PayloadAction<Currency>) => {
      const currency = action.payload;
      state.selectedCurrency = currency;
      lsCurrency.set(currency);
    },
  },
});

export default settingsSlice.reducer;

export const { switchTheme, loadCurrencies, selectCurrency } = settingsSlice.actions;
