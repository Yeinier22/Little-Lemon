import CardReview from "../Card-review";
import React, { useState } from "react";
import "../Styles/Review.css";

const reviews = [
  {
    name: "Zack A.",
    review: `Fantastic Mediterranean food and exceptional service! The lamb dishes were perfectly seasoned and the atmosphere was warm and inviting. Little Lemon exceeded all expectations.`,
    getImageSrc: () => require("../images/Avatar/beach-418742_640.jpg"),
    rating: 4.5,
    featured: true
  },
  {
    name: "Narish B.",
    review: `Outstanding dining experience! Fresh ingredients, authentic flavors, and friendly staff. The location is perfect and the ambiance makes every meal special. Highly recommended!`,
    getImageSrc: () => require("../images/Avatar/mountains-1587287_640.jpg"),
    rating: 5,
    featured: true
  },
  {
    name: "Frank E.",
    review: `Everything is incredibly fresh and delicious! The Mediterranean cuisine here is authentic and flavorful. Our server was attentive and knowledgeable. We'll definitely return!`,
    getImageSrc: () => require("../images/Avatar/sunset-1373171_640.jpg"),
    rating: 4.5,
    featured: false
  },
  {
    name: "Rick S.",
    review: `Amazing Mediterranean dishes with a modern twist! The chef's attention to detail shows in every bite. Great wine selection and the staff provided excellent recommendations.`,
    getImageSrc: () => require("../images/Avatar/tree-736885_640.jpg"),
    rating: 5,
    featured: false
  },
  {
    name: "Maria L.",
    review: `Wonderful family dinner experience! The staff was incredibly accommodating and the Mediterranean flavors were authentic and delicious. Perfect for special occasions.`,
    getImageSrc: () => require("../images/Avatar/beach-418742_640.jpg"),
    rating: 4.5,
    featured: false
  },
  {
    name: "David K.",
    review: `Exceptional quality and presentation! Every dish was a masterpiece. The wine pairing suggestions were spot on. This is now our go-to restaurant for date nights.`,
    getImageSrc: () => require("../images/Avatar/mountains-1587287_640.jpg"),
    rating: 5,
    featured: false
  }
];

const Testimonial = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const initialReviewsCount = 3;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, initialReviewsCount);

  return (
    <div className="container-review">
      <h2>What Our Guests Say</h2>
      
      <div className="card-review">
        {displayedReviews.map((review, index) => (
          <CardReview
            key={review.name}
            color={review.color}
            name={review.name}
            review={review.review}
            photo={review.getImageSrc()}
            rating={review.rating}
            featured={false} // Todas las tarjetas con el mismo estilo
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > initialReviewsCount && (
        <div className="show-more-container">
          <button 
            className="show-more-btn"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews 
              ? `Show Less Reviews` 
              : `See All ${reviews.length} Reviews`
            }
            <span className="btn-icon">
              {showAllReviews ? '↑' : '↓'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonial;