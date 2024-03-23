import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, Currency } from '@/api/types';
import { ThemeVariant } from '@/theme/theme';

import { LocalStorageValue } from './localStorage';

const lsTheme = new LocalStorageValue<ThemeVariant>('theme', 'light');
const lsCurrency = new LocalStorageValue<Currency | null>('currency', null);

const initialState: {
  theme: ThemeVariant;
  categories: Category[];
  currencies: Currency[];
  selectedCurrency: Currency | null;
} = {
  theme: lsTheme.get(),
  categories: [],
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

    loadCategoriesList: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    loadCurrencies: (state, action: PayloadAction<Currency[]>) => {
      const currencies = action.payload;
      state.currencies = currencies;

      const selectedCurrencyFound = currencies.find(({ label, symbol }) => {
        return label === state.selectedCurrency?.label && symbol === state.selectedCurrency?.symbol;
      });

      if (!selectedCurrencyFound) {
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

export const { switchTheme, loadCategoriesList, loadCurrencies, selectCurrency } =
  settingsSlice.actions;
