import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Booking, BookingFormData } from "../../types";

interface BookingState extends BookingFormData {
  bookings: Booking[];
}

const initialState: BookingState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  message: "",
  bookings: [],
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

    resetBooking: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.service = "";
      state.date = "";
      state.message = "";
    },

    setBookings: (
      state,
      action: PayloadAction<Booking[]>
    ) => {
      state.bookings = action.payload;
    },

    addBooking: (
      state,
      action: PayloadAction<Booking>
    ) => {
      state.bookings.push(action.payload);
    },

    updateBookingStatusInStore: (
      state,
      action: PayloadAction<{
        id: number;
        status: Booking["status"];
      }>
    ) => {
      const booking = state.bookings.find(
        (booking) => booking.id === action.payload.id
      );

      if (booking) {
        booking.status = action.payload.status;
      }
    },

    removeBooking: (
      state,
      action: PayloadAction<number>
    ) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
  },
});

export const {
  updateBooking,
  resetBooking,
  setBookings,
  addBooking,
  updateBookingStatusInStore,
  removeBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;