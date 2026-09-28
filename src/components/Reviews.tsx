const reviews = [
  {
    id: 1,
    text: "Amazing experience. The staff was very professional and friendly.",
    name: "Anna M.",
  },
  {
    id: 2,
    text: "I loved the atmosphere and the quality of the service.",
    name: "Maria P.",
  },
  {
    id: 3,
    text: "Beautiful studio and excellent attention to detail.",
    name: "Elena R.",
  },
];

const Reviews = () => {
  return (
    <section className="reviews">
      <div className="container">
        <div className="section-heading">
          <p className="subtitle">CLIENT FEEDBACK</p>

          <h2>What Our Clients Say</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="stars">★★★★★</div>

              <p>"{review.text}"</p>

              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;