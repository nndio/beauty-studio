import type { Booking, BookingFormData } from "../types";

const STORAGE_KEY = "beauty-studio-bookings";

const getStoredBookings = (): Booking[] => {
  const storedBookings = localStorage.getItem(STORAGE_KEY);

  if (!storedBookings) {
    return [];
  }

  return JSON.parse(storedBookings);
};

const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(bookings)
  );
};

export const createBooking = async (
  bookingData: BookingFormData
): Promise<Booking> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const success = Math.random() > 0.2;

  if (!success) {
    throw new Error(
      "Something went wrong. Please try again."
    );
  }

  const bookings = getStoredBookings();

  const newBooking: Booking = {
    ...bookingData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  const updatedBookings = [...bookings, newBooking];

  saveBookings(updatedBookings);

  return newBooking;
};

export const getBookings = async (): Promise<Booking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return getStoredBookings();
};

export const updateBookingStatus = async (
  id: number,
  status: Booking["status"]
): Promise<Booking> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const bookings = getStoredBookings();

  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === id
  );

  if (bookingIndex === -1) {
    throw new Error("Booking not found.");
  }

  const updatedBooking = {
    ...bookings[bookingIndex],
    status,
  };

  bookings[bookingIndex] = updatedBooking;

  saveBookings(bookings);

  return updatedBooking;
};