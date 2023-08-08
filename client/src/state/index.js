import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem(
        "mode",
        JSON.stringify(state.mode === "light" ? "dark" : "light")
      );
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;

export default globalSlice.reducer;
