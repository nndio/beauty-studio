# Beauty Studio

A modern and responsive beauty studio website built with **React, TypeScript and Vite**.

The project includes a client-facing booking form and a simple admin panel for managing appointment requests. It was built as a portfolio project to practice building a realistic frontend application with form handling, asynchronous operations, local data persistence and React state management.

## ✨ Features

### Client Side

* Responsive beauty studio landing page
* Hero section with call-to-action
* Services section
* About section
* Gallery
* Customer reviews
* Appointment booking form
* Form validation
* Service selection with price and duration information
* Date validation
* Loading state during form submission
* Success and error messages
* Booking data persistence using `localStorage`

### Admin Panel

* Display all appointment requests
* View client information
* View selected service and appointment date
* View optional client messages
* Booking status management:

  * Pending
  * Confirmed
  * Cancelled
* Delete bookings with confirmation
* Automatic refresh of the booking list after creating a new appointment

## 🛠️ Technologies

* **React**
* **TypeScript**
* **Vite**
* **CSS3**
* **HTML5**
* **React Hooks**
* **localStorage**
* **Async/Await**

## 📁 Project Structure

```text
src/
├── api/
│   └── bookingApi.ts
├── assets/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Gallery.tsx
│   ├── Reviews.tsx
│   ├── BookingForm.tsx
│   └── Bookings.tsx
├── data/
│   └── services.ts
├── types/
│   └── index.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🔌 Booking API

The project uses a small **fake API layer** to simulate communication with a backend.

The API provides functions for:

```text
createBooking()
getBookings()
updateBookingStatus()
deleteBooking()
```

Each operation uses `async/await` and simulated delays to reproduce the behavior of a real API.

The booking data is stored in the browser's `localStorage`, so appointments remain available after refreshing the page.

## 📝 Form Validation

The booking form validates:

* Required name
* Valid email format
* Required phone number
* Required service
* Valid appointment date
* Today or future dates only

Validation errors are displayed directly below the corresponding form fields.

## ⚡ Async States

The booking flow includes:

* Loading state while submitting
* Success state after a booking is created
* Error state when the simulated API request fails
* Disabled buttons during asynchronous operations

The fake API also simulates occasional request failures to reproduce a realistic error-handling scenario.

## 💾 Data Persistence

Bookings are stored in:

```text
localStorage
```

This allows the application to keep appointment data between page reloads without requiring a real backend.

The project also demonstrates how React state can be synchronized with persisted data after creating, updating or deleting bookings.

## 🎯 What I Practiced

This project helped me practice:

* Building reusable React components
* TypeScript interfaces and type-safe props
* Controlled form inputs
* Form validation
* React `useState`
* React `useEffect`
* Conditional rendering
* Event handling
* `async/await`
* Error handling with `try/catch`
* Simulating API requests
* Working with `localStorage`
* Updating and filtering arrays
* Managing UI loading states
* Responsive CSS
* Component communication through props

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nndio/beauty-studio.git
```

### 2. Navigate to the project

```bash
cd beauty-studio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔮 Possible Future Improvements

The current version intentionally uses a fake API and browser storage. Possible future improvements include:

* Connect the application to a real backend
* Add authentication for the admin panel
* Add real appointment availability
* Add email notifications
* Add booking time slots
* Add search and filtering in the admin panel
* Add deployment and production configuration

## 👩‍💻 Author

**Anastasia Vahnovan**

Junior Frontend Developer

* GitHub: https://github.com/nndio
* LinkedIn: https://linkedin.com/in/anastasia-vahnovan
