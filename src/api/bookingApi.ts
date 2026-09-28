import type { BookingFormData } from "../types";

export const createBooking = async (booking: BookingFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const success = Math.random() > 0.2;

  if (!success) {
    throw new Error("Something went wrong. Please try again.");
  }

  return {
    success: true,
    message: "Your appointment request has been received.",
    booking,
  };
};