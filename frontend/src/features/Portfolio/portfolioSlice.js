import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holdings: [],
  positions: [],
  isLoading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHoldings: (state, action) => {
      state.holdings = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setHoldings,
  setPositions,
  setError,
  clearError,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
