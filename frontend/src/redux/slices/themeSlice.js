import { createSlice } from "@reduxjs/toolkit";

const preferred = localStorage.getItem("lumina_theme") || "dark";
document.documentElement.classList.toggle("dark", preferred === "dark");

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: preferred },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("lumina_theme", state.mode);
      document.documentElement.classList.toggle("dark", state.mode === "dark");
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
