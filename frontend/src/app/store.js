import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/auth/profileSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    portfolio: portfolioReducer,
  },
});
