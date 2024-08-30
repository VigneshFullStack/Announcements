import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHolidays } from "../services/holidayService";

export const getHolidays = createAsyncThunk(
  "holidays/getHolidays",
  async () => await fetchHolidays()
);

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    holidays: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays = action.payload;
      })
      .addCase(getHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default holidaySlice.reducer;
