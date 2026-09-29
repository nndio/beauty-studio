const Header = () => {
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

        <a href="#booking" className="header-button">
          Book Now
        </a>
      </div>
    </header>
  );
};

export default Header;