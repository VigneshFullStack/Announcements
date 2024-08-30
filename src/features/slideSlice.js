import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSlides } from "../services/slideService";

export const getSlides = createAsyncThunk(
  "holidays/fetchSlides",
  async () => await fetchSlides()
);

const slidesSlice = createSlice({
  name: "slides",
  initialState: {
    slides: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload;
      })
      .addCase(getSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default slidesSlice.reducer;
