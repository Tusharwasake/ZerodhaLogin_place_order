import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null; 
  }
};

const initialState = {
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userData", JSON.stringify(actions.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userData");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

