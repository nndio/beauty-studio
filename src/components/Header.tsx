import { useAppSelector } from "../app/hooks";

const Header = () => {
  const favoriteCount = useAppSelector(
    (state) => state.favorites.serviceIds.length
  );

  return (
    <header className="header">
      <div className="container">
        <a href="#" className="logo">
          Beauty Studio
        </a>

        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
        </nav>

        <div className="header-actions">
          <a
            href="#services"
            className="favorites-link"
            aria-label={`Favorites: ${favoriteCount}`}
          >
            <span aria-hidden="true">
              {favoriteCount > 0 ? "♥" : "♡"}
            </span>

            {favoriteCount > 0 && (
              <span className="favorites-count">
                {favoriteCount}
              </span>
            )}
          </a>

          <a href="#booking" className="header-button">
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;