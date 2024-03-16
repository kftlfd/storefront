import { createSlice } from '@reduxjs/toolkit';

import { LocalStorage, ls } from './localStorage';

const initialState: { theme: 'light' | 'dark' } = {
  theme: LocalStorage.get(ls.theme, 'light'),
};

const settingsSlice = createSlice({
  name: 'settings',

  initialState,

  reducers: {
    switchTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      LocalStorage.set(ls.theme, newTheme);
    },
  },
});

export default settingsSlice.reducer;

export const { switchTheme } = settingsSlice.actions;
