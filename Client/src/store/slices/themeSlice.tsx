// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // Default to light mode
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.theme = state.theme == "light" ? "dark" : "light";
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export const selectDarkMode = (state: any) => state.theme.darkMode;

export default themeSlice.reducer;
