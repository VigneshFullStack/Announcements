import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUpcomingHolidays } from "../services/upcomingHolidayService";

export const getUpcomingHolidays = createAsyncThunk(
  "holidays/getUpcomingHolidays",
  async () => await fetchUpcomingHolidays()
);

const upcomingHolidaySlice = createSlice({
  name: "holidays",
  initialState: {
    upcomingHolidays: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingHolidays = action.payload;
      })
      .addCase(getUpcomingHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default upcomingHolidaySlice.reducer;
