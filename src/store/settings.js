import { createSlice } from "@reduxjs/toolkit";

import { LocalStorage, ls } from "./localStorage";

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    theme: LocalStorage.get(ls.theme, "light"),
  },

  reducers: {
    switchTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      LocalStorage.set(ls.theme, newTheme);
    },
  },
});

export default settingsSlice.reducer;

export const { switchTheme } = settingsSlice.actions;
