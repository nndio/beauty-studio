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

type BookingFilter =
  | "all"
  | "pending"
  | "confirmed"
  | "cancelled";

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

  const [filter, setFilter] =
    useState<BookingFilter>("all");

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

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === filter
        );

  if (isLoading) {
    return (
      <section className="bookings">
        <div className="container">
          <p>Loading bookings...</p>
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

        <div className="booking-stats">
          <div className="stat-card">
            <span className="stat-label">Total</span>

            <strong className="stat-value">
              {totalBookings}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Pending</span>

            <strong className="stat-value">
              {pendingBookings}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Confirmed</span>

            <strong className="stat-value">
              {confirmedBookings}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Cancelled</span>

            <strong className="stat-value">
              {cancelledBookings}
            </strong>
          </div>
        </div>

        <div className="booking-filters">
          <button
            type="button"
            className={
              filter === "all"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={
              filter === "pending"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            type="button"
            className={
              filter === "confirmed"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("confirmed")}
          >
            Confirmed
          </button>

          <button
            type="button"
            className={
              filter === "cancelled"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <h3>No bookings yet</h3>

            <p>
              Appointment requests will appear here.
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-bookings">
            <h3>
              No {filter} bookings
            </h3>

            <p>
              There are currently no bookings with this
              status.
            </p>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
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
        )}
      </div>
    </section>
  );
};

export default Bookings;