import CardReview from "../Card-review";
import React from "react";
import "../Styles/Review.css"


const reviews = [
  {
    name: "Zack A.",
    review: `"Fantastic food and great service. Juan Chipoco’s restaurants never disappoint. 
  The chicken and green rice were delicious and the sauces were amazing."`,
  getImageSrc: () => require("../images/Avatar/beach-418742_640.jpg"),
  rating: 3.5
  },
  {
    name: "Narish B.",
    review: `"Everything good service was great and the food also I will recommend this 
  restaurant for all of the people and the location is great"`,
  getImageSrc: () => require("../images/Avatar/mountains-1587287_640.jpg"),
  rating: 5
  },
  {
    name: "Frank E.",
    review: `"Wow, everything is so fresh and good. I will give them five stars!! Royer was a great server. 
  Very friendly and helpful. We’ll be back again."`,
  getImageSrc: () => require("../images/Avatar/sunset-1373171_640.jpg"),
  rating:5
  },
  {
    name: "Rick S.",
    review: `"Great casual place with delicious Peruvian BBQ, ceviches and more. 
    Mauricio was super helpful explain the menu and delivered top notch service!"`,
    getImageSrc: () => require("../images/Avatar/tree-736885_640.jpg"),
    rating:5
  },
];


const Testimonial = () => {
  return (
    <div className="container-review">
     <h2>Testimonials</h2>
      <div className="card-review">
        {reviews.map((project, index) => (
          <CardReview
            key={project.name}
            color={project.color}
            name={project.name}
            review={project.review}
            photo={project.getImageSrc()}
            rating={project.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
