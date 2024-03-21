import { createSlice } from '@reduxjs/toolkit';

import { ThemeVariant } from '@/theme/theme';

import { LocalStorageValue } from './localStorage';

const lsTheme = new LocalStorageValue<ThemeVariant>('theme', 'light');

const initialState: {
  theme: ThemeVariant;
} = {
  theme: lsTheme.get(),
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
  },
});

export default settingsSlice.reducer;

export const { switchTheme } = settingsSlice.actions;
