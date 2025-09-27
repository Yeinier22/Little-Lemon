import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OurStory.css';
import beginningImg from '../images/About/Our Beginning-story.jpg';
import kitchenStoryImg from '../images/About/kitchen-story.jpg';
import restaurantStoryImg from '../images/About/restaurant-story.jpg';

const OurStory = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="our-story-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => {
        navigate('/');
        // Wait a bit for the page to load, then scroll to About section
        setTimeout(() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }}>
        Volver
      </button>
      
      {/* Header Section */}
      <div className="story-header">
        <h1 className="story-main-title">Our Story</h1>
        <p className="story-intro">
          Discover the journey that brought Little Lemon to life and the passion that drives us every day.
        </p>
      </div>

      {/* Section 1: Our Beginning - Text Left, Image Right */}
      <section className="story-section">
        <div className="story-content">
          <div className="story-text">
            <h2 className="story-section-title">Our Beginning</h2>
            <p className="story-description">
              Little Lemon was born in Miami with a simple mission: to share the heart of Peruvian cuisine with the world. Inspired by Peru's rich culinary heritage and family traditions, we set out to create a restaurant that feels both authentic and unforgettable.
            </p>
          </div>
          <div className="story-image">
            <img src={beginningImg} alt="Our beginning - Little Lemon origins" />
            <div className="image-overlay">
              <span>Where it all began</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Philosophy - Image Left, Text Right */}
      <section className="story-section reverse">
        <div className="story-content">
          <div className="story-image">
            <img src={kitchenStoryImg} alt="Our philosophy - Kitchen excellence" />
            <div className="image-overlay">
              <span>Culinary Excellence</span>
            </div>
          </div>
          <div className="story-text">
            <h2 className="story-section-title">Our Philosophy</h2>
            <p className="story-description">
              We believe in food that celebrates culture. Our chefs draw inspiration from the diverse regions of Peru — from the coast to the Andes and the Amazon — blending classic recipes with a touch of modern creativity. Fresh ingredients, bold flavors, and a deep respect for tradition define every dish we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Experience - Text Left, Image Right */}
      <section className="story-section">
        <div className="story-content">
          <div className="story-text">
            <h2 className="story-section-title">The Experience</h2>
            <p className="story-description">
              At Little Lemon, dining is more than a meal — it's a journey through Peru. Whether you're enjoying a refreshing pisco sour at our bar, savoring a ceviche prepared with the freshest seafood, or gathering with loved ones over a plate of lomo saltado, our restaurant offers an atmosphere that is warm, vibrant, and full of character.
            </p>
          </div>
          <div className="story-image">
            <img src={restaurantStoryImg} alt="The experience - Restaurant atmosphere" />
            <div className="image-overlay">
              <span>Unforgettable Moments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="story-invitation">
        <div className="invitation-content">
          <h2 className="invitation-title">Join Our Story</h2>
          <p className="invitation-text">
            We want Little Lemon to be your place to gather, celebrate, and enjoy. Visit us in the 
            heart of Chicago and discover an authentic Mediterranean dining experience made for every occasion.
          </p>
          <div className="invitation-buttons">
            <button className="btn-primary" onClick={() => navigate('/booking')}>Reserve a Table</button>
            <button className="btn-secondary" onClick={() => navigate('/menu')}>View Menu</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;