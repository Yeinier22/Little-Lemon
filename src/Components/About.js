import React from "react";
import "../Styles/About.css";
import chef1 from "../images/About/Mario and Adrian b.jpg";
import chef2 from "../images/About/restaurant chef B.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-description">
        <h2>Little Lemon</h2>
        <h5>Chicago</h5>
        <p>
          Little Lemon is a family-owned Mediterranean restaurant, focused on
          traditional recipes served with a modern twist. The chefs draw
          inspiration from Italian, Greek, and Turkish culture. The restaurant
          has a rustic and relaxed atmosphere with moderate prices, making it a
          popular place for a meal any time of the day
        </p>
      </div>
      <div className="about-images">
        <img src={chef1} alt="chef1" className="chef1" />
        <img src={chef2} alt="chef2" className="chef2" />
      </div>
    </div>
  );
};

export default About;
