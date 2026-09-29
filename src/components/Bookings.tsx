import { useEffect, useState } from "react";
import { getBookings } from "../api/bookingApi";
import type { Booking } from "../types";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
            <article className="booking-card" key={booking.id}>
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

              <span className="booking-status">
                {booking.status}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bookings;