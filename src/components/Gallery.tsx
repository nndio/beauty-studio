const images = [
  {
    id: 1,
    src: "/images/gallery-1.jpg",
    alt: "Beauty treatment",
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    alt: "Hair styling",
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    alt: "Manicure",
  },
  {
    id: 4,
    src: "/images/gallery-4.jpg",
    alt: "Beauty products",
  },
  {
    id: 5,
    src: "/images/gallery-5.jpg",
    alt: "Makeup",
  },
  {
    id: 6,
    src: "/images/gallery-6.jpg",
    alt: "Beauty studio",
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-heading">
          <p className="subtitle">OUR WORK</p>

          <h2>Gallery</h2>

          <p>
            A glimpse of our work and studio.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image) => (
            <div className="gallery-item" key={image.id}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;