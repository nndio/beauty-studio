import { services } from "../data/services";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import { toggleFavorite } from "../features/favorites/favoritesSlice";

const Services = () => {
  const dispatch = useAppDispatch();

  const favoriteServiceIds = useAppSelector(
    (state) => state.favorites.serviceIds
  );

  const handleToggleFavorite = (serviceId: number) => {
    dispatch(toggleFavorite(serviceId));
  };

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
          {services.map((service) => {
            const isFavorite = favoriteServiceIds.includes(
              service.id
            );

            return (
              <article
                className="service-card"
                key={service.id}
              >
                <button
                  type="button"
                  className="favorite-button"
                  onClick={() =>
                    handleToggleFavorite(service.id)
                  }
                  aria-label={
                    isFavorite
                      ? `Remove ${service.name} from favorites`
                      : `Add ${service.name} to favorites`
                  }
                  aria-pressed={isFavorite}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>

                <h3>{service.name}</h3>

                <p>{service.description}</p>

                <div className="service-info">
                  <span>€{service.price}</span>

                  <span>
                    {service.duration} min
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;