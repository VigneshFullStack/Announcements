import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from '../features/announcementSlice.js';
import upcomingHolidayReducer from "../features/upcomingHolidaySlice.js";
import holidayReducer from "../features/holidaySlice.js";
import tickerReducer from "../features/tickerSlice.js";
import slideReducer from "../features/slideSlice.js";

export const store = configureStore({
  reducer: {
    announcements: announcementReducer,
    upcomingHolidays: upcomingHolidayReducer,
    holidays: holidayReducer,
    tickers: tickerReducer,
    slides: slideReducer,
  },
});
