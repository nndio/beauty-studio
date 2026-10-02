import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BookingFormData } from "../../types";

const initialState: BookingFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateBooking: (
      state,
      action: PayloadAction<Partial<BookingFormData>>
    ) => {
      Object.assign(state, action.payload);
    },

    resetBooking: () => initialState,
  },
});

export const { updateBooking, resetBooking } = bookingSlice.actions;

export default bookingSlice.reducer;