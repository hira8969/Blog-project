import { createSlice } from "@reduxjs/toolkit";

const stored = JSON.parse(localStorage.getItem("lumina_user") || "null");
const token = localStorage.getItem("lumina_token");

const authSlice = createSlice({
  name: "auth",
  initialState: { user: stored, token },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("lumina_user", JSON.stringify(action.payload.user));
      localStorage.setItem("lumina_token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("lumina_user");
      localStorage.removeItem("lumina_token");
    },
    updateUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("lumina_user", JSON.stringify(action.payload));
    }
  }
});

export const { logout, setCredentials, updateUser } = authSlice.actions;
export default authSlice.reducer;
