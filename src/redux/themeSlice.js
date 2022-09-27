import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.theme = 'dark';
    },
    setLightTheme: (state) => {
      state.theme = 'light';
    },
    getSystemTheme: (state, action) => {
      state.theme = action.payload ? 'dark' : 'light';
    },
  },
});

export const { setDarkTheme, setLightTheme, getSystemTheme } =
  themeSlice.actions;

export default themeSlice.reducer;
