import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/About.css";
import kitchenImg from "../images/About/kitchen.jpg";
import barImg from "../images/About/bar.jpg";
import dishImg from "../images/About/diche.jpg";
import restaurantImg from "../images/About/restaurant.jpg";

const About = () => {
  const navigate = useNavigate();

  const handleStoryClick = () => {
    navigate('/story');
  };

  return (
    <div id="about" className="about-container">
      <div className="about-text-column">
        <h1 className="about-title">Little Lemon – Miami</h1>
        <h2 className="about-subtitle">Family-owned Peruvian restaurant</h2>
        <p className="about-description">
          We are a family-owned Peruvian restaurant, focused on traditional recipes 
          served with a modern twist. Our chefs draw inspiration from Peru's diverse regions — 
          from the coast to the Andes and the Amazon — creating an authentic dining experience in the heart of Miami.
        </p>
        <button className="about-cta-button" onClick={handleStoryClick}>Our Story</button>
      </div>
      
      <div className="about-images-column">
        <div className="image-mosaic">
          <div className="image-large">
            <img src={kitchenImg} alt="Kitchen in action" />
            <div className="image-overlay">
              <span>Kitchen Excellence</span>
            </div>
          </div>
          <div className="image-small-group">
            <div className="image-small">
              <img src={barImg} alt="Modern bar" />
              <div className="image-overlay">
                <span>Craft Bar</span>
              </div>
            </div>
            <div className="image-small">
              <img src={dishImg} alt="Elegant dish" />
              <div className="image-overlay">
                <span>Signature Dishes</span>
              </div>
            </div>
            <div className="image-small">
              <img src={restaurantImg} alt="Restaurant interior" />
              <div className="image-overlay">
                <span>Elegant Ambiance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
