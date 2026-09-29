import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import BookingForm from "./components/BookingForm";
import Bookings from "./components/Bookings";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Reviews />
        <BookingForm />
        <Bookings />
      </main>
    </>
  );
}

export default App;