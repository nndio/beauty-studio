const About = () => {
  return (
    <section id="about" className="about">
      <div className="container about-content">
        <div className="about-image">
          <img
            src="/images/about.jpg"
            alt="Beauty studio interior"
          />
        </div>

        <div className="about-text">
          <p className="subtitle">ABOUT US</p>

          <h2>Beauty is about feeling good in your own skin.</h2>

          <p>
            At Beauty Studio, we believe that beauty is personal.
            Our goal is to create a relaxing experience where
            every client feels comfortable, confident and cared for.
          </p>

          <p>
            We provide professional beauty services using quality
            products and techniques tailored to each client.
          </p>

          <a href="#booking" className="primary-button">
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;