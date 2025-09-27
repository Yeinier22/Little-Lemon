import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FullScreenSlider.css';

// Importar las imágenes del home
import image1 from '../images/home/1diches.jpg';
import image2 from '../images/home/2diches.jpg';
import image3 from '../images/home/3dessert.jpg';
import image4 from '../images/home/4Cocktails.jpg';

const FullScreenSlider = () => {
  const navigate = useNavigate();
  
  const images = [
    {
      id: 1,
      src: image1,
      alt: 'Delicious Dishes'
    },
    {
      id: 2,
      src: image2,
      alt: 'Main Courses'
    },
    {
      id: 3,
      src: image3,
      alt: 'Sweet Desserts'
    },
    {
      id: 4,
      src: image4,
      alt: 'Refreshing Cocktails'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="fullscreen-slider">
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="slide-image"
            />
            <div className="slide-overlay">
              <div className="slide-content">
                <h1 className="slide-title">Little Lemon</h1>
                <h2 className="slide-subtitle">Mediterranean Restaurant</h2>
                <p className="slide-description">
                  Experience authentic Mediterranean flavors with a modern twist
                </p>
                <div className="slide-buttons">
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/booking')}
                  >
                    Reserve a Table
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => navigate('/menu')}
                  >
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de puntos */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Elementos decorativos como en Panchita */}
      <div className="decorative-elements">
        <div className="diamond diamond-1">◊</div>
        <div className="diamond diamond-2">◊</div>
        <div className="diamond diamond-3">◊</div>
      </div>
    </div>
  );
};

export default FullScreenSlider;