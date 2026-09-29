import { useEffect, useState } from "react";
import {
  getBookings,
  updateBookingStatus,
} from "../api/bookingApi";
import type { Booking } from "../types";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getBookings();

        setBookings(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

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

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === id ? updatedBooking : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p>No bookings yet.</p>;
  }

  return (
    <section className="bookings">
      <div className="container">
        <h2>Bookings</h2>

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
                  disabled={updatingId === booking.id}
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      booking.id,
                      "cancelled"
                    )
                  }
                  disabled={updatingId === booking.id}
                >
                  Cancel
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