import { useEffect, useState } from "react";

import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../api/bookingApi";

import type { Booking } from "../types";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import {
  setBookings,
  updateBookingStatusInStore,
  removeBooking,
} from "../features/booking/bookingSlice";

const Bookings = () => {
  const dispatch = useAppDispatch();

  const bookings = useAppSelector(
    (state) => state.booking.bookings
  );

  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getBookings();

        dispatch(setBookings(data));
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [dispatch]);

  const handleStatusChange = async (
    id: number,
    status: Booking["status"]
  ) => {
    setUpdatingId(id);

    try {
      const updatedBooking = await updateBookingStatus(
        id,
        status
      );

      dispatch(
        updateBookingStatusInStore({
          id,
          status: updatedBooking.status,
        })
      );
    } catch (error) {
      console.error("Failed to update booking:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteBooking(id);

      dispatch(removeBooking(id));
    } catch (error) {
      console.error("Failed to delete booking:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <section className="bookings">
        <div className="container">
          <p>Loading bookings...</p>
        </div>
      </section>
    );
  }

  if (bookings.length === 0) {
    return (
      <section className="bookings">
        <div className="container">
          <h2>Bookings</h2>
          <p>No bookings yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bookings">
      <div className="container">
        <div className="section-heading">
          <p className="subtitle">ADMIN PANEL</p>

          <h2>Bookings</h2>

          <p>Manage appointment requests.</p>
        </div>

        <div className="bookings-list">
          {bookings.map((booking) => (
            <article
              className="booking-card"
              key={booking.id}
            >
              <h3>{booking.name}</h3>

              <p>
                <strong>Service:</strong>{" "}
                {booking.service}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.date}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {booking.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {booking.phone}
              </p>

              {booking.message && (
                <p>
                  <strong>Message:</strong>{" "}
                  {booking.message}
                </p>
              )}

              <span
                className={`booking-status booking-status-${booking.status}`}
              >
                {booking.status}
              </span>

              <div className="booking-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      booking.id,
                      "confirmed"
                    )
                  }
                  disabled={
                    updatingId === booking.id ||
                    deletingId === booking.id
                  }
                >
                  {updatingId === booking.id
                    ? "Updating..."
                    : "Confirm"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      booking.id,
                      "cancelled"
                    )
                  }
                  disabled={
                    updatingId === booking.id ||
                    deletingId === booking.id
                  }
                >
                  {updatingId === booking.id
                    ? "Updating..."
                    : "Cancel"}
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    handleDelete(booking.id)
                  }
                  disabled={
                    updatingId === booking.id ||
                    deletingId === booking.id
                  }
                >
                  {deletingId === booking.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bookings;