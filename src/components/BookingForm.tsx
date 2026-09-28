import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
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
    }

    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Booking data:", formData);

    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    });

    setErrors({});
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
              <option value="Hair Styling">Hair Styling</option>
              <option value="Manicure">Manicure</option>
              <option value="Makeup">Makeup</option>
              <option value="Facial">Facial</option>
            </select>

            {errors.service && (
              <span className="error-message">
                {errors.service}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Preferred date</label>

            <input
              id="date"
              name="date"
              type="date"
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

          <button type="submit" className="primary-button">
            Request Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;