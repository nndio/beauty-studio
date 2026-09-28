import { services } from "../data/services";

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-heading">
          <p className="subtitle">WHAT WE OFFER</p>

          <h2>Our Services</h2>

          <p>
            Professional beauty treatments tailored to you.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <h3>{service.name}</h3>

              <p>{service.description}</p>

              <div className="service-info">
                <span>€{service.price}</span>
                <span>{service.duration} min</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;