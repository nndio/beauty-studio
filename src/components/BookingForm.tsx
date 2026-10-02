import { useState } from "react";
import { services } from "../data/services";
import { createBooking } from "../api/bookingApi";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import {
  updateBooking,
  resetBooking,
} from "../features/booking/bookingSlice";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
}

interface BookingFormProps {
  onBookingCreated: () => void;
}

  const BookingForm = ({
    onBookingCreated,
  }: BookingFormProps) => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(
    (state) => state.booking
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const getToday = () => {
    const today = new Date();

    return today.toISOString().split("T")[0];
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    dispatch(
      updateBooking({
        [name]: value,
      })
    );

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSubmitError("");
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    } else if (formData.date < getToday()) {
      newErrors.date = "Please select today or a future date.";
    }

    return newErrors;
  };

  const selectedService = services.find(
    (service) => service.name === formData.service
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await createBooking(formData);

      console.log("API response:", response);

      onBookingCreated();
      setIsSubmitted(true);

      dispatch(resetBooking());

      setErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="booking">
        <div className="container">
          <div className="success-message">
            <h2>Thank you!</h2>

            <p>
              Your appointment request has been received.
              We will contact you shortly.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() => setIsSubmitted(false)}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="booking">
      <div className="container">
        <div className="section-heading">
          <p className="subtitle">BOOK YOUR VISIT</p>

          <h2>Make an Appointment</h2>

          <p>
            Fill out the form and we will contact you to confirm
            your appointment.
          </p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            {errors.name && (
              <span className="error-message">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            {errors.email && (
              <span className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+373 ..."
            />

            {errors.phone && (
              <span className="error-message">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="service">Service</label>

            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Select a service</option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.name}
                >
                  {service.name}
                </option>
              ))}
            </select>

            {errors.service && (
              <span className="error-message">
                {errors.service}
              </span>
            )}

            {selectedService && (
              <div className="selected-service-info">
                <span>
                  Price: €{selectedService.price}
                </span>

                <span>
                  Duration: {selectedService.duration} min
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Preferred date</label>

            <input
              id="date"
              name="date"
              type="date"
              min={getToday()}
              value={formData.date}
              onChange={handleChange}
            />

            {errors.date && (
              <span className="error-message">
                {errors.date}
              </span>
            )}
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us anything we should know..."
              rows={5}
            />
          </div>

          {submitError && (
            <p className="submit-error">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading
              ? "Sending..."
              : "Request Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;