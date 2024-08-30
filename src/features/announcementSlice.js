import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnnouncements } from "../services/announcementService";

export const getAnnouncements = createAsyncThunk(
  "announcements/getAnnouncements",
  async () => await fetchAnnouncements()
);

const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    announcements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default announcementSlice.reducer;
