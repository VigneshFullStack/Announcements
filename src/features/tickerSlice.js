import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickers } from "../services/tickerService";

export const getTickers = createAsyncThunk(
  "tickers/getTickers",
  async () => await fetchTickers()
);

const tickerSlice = createSlice({
  name: "tickers",
  initialState: {
    tickers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickers.fulfilled, (state, action) => {
        state.loading = false;
        state.tickers = action.payload;
      })
      .addCase(getTickers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tickerSlice.reducer;
