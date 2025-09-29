import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './FullScreenSlider.css';

// Importar las imágenes del home
import image1 from '../images/home/1diches.jpg';
import image2 from '../images/home/2diches.jpg';
import image3 from '../images/home/3dessert.jpg';
import image4 from '../images/home/4Cocktails.jpg';

const DEFAULT_INTERVAL = 4000;

const FullScreenSlider = ({
  slides,
  autoRotate = true,
  interval = DEFAULT_INTERVAL,
  showDots = true,
  showDecorations = true,
  children,
  className = ''
}) => {
  const navigate = useNavigate();

  const defaultSlides = useMemo(() => ([
    {
      id: 1,
      src: image1,
      alt: 'Delicious Dishes',
      title: 'Little Lemon',
      subtitle: 'Peruvian Restaurant',
      description: 'Experience authentic Peruvian flavors with a modern twist',
      buttons: [
        {
          label: 'Reserve a table',
          variant: 'primary',
          onClick: () => navigate('/booking')
        },
        {
          label: 'View Menu',
          variant: 'secondary',
          onClick: () => navigate('/menu')
        }
      ]
    },
    {
      id: 2,
      src: image2,
      alt: 'Main Courses',
      title: 'Little Lemon',
      subtitle: 'Peruvian Restaurant',
      description: 'Experience authentic Peruvian flavors with a modern twist',
      buttons: [
        {
          label: 'Reserve a table',
          variant: 'primary',
          onClick: () => navigate('/booking')
        },
        {
          label: 'View Menu',
          variant: 'secondary',
          onClick: () => navigate('/menu')
        }
      ]
    },
    {
      id: 3,
      src: image3,
      alt: 'Sweet Desserts',
      title: 'Little Lemon',
      subtitle: 'Peruvian Restaurant',
      description: 'Experience authentic Peruvian flavors with a modern twist',
      buttons: [
        {
          label: 'Reserve a table',
          variant: 'primary',
          onClick: () => navigate('/booking')
        },
        {
          label: 'View Menu',
          variant: 'secondary',
          onClick: () => navigate('/menu')
        }
      ]
    },
    {
      id: 4,
      src: image4,
      alt: 'Refreshing Cocktails',
      title: 'Little Lemon',
      subtitle: 'Peruvian Restaurant',
      description: 'Experience authentic Peruvian flavors with a modern twist',
      buttons: [
        {
          label: 'Reserve a table',
          variant: 'primary',
          onClick: () => navigate('/booking')
        },
        {
          label: 'View Menu',
          variant: 'secondary',
          onClick: () => navigate('/menu')
        }
      ]
    }
  ]), [navigate]);

  const resolvedSlides = useMemo(() => {
    if (slides && slides.length > 0) {
      return slides.map((slide, index) => ({
        id: slide.id ?? `custom-slide-${index}`,
        src: slide.src,
        alt: slide.alt ?? slide.title ?? 'Slide image',
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        buttons: slide.buttons ?? []
      }));
    }
    return defaultSlides;
  }, [slides, defaultSlides]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= resolvedSlides.length) {
      setCurrentIndex(0);
    }
  }, [resolvedSlides.length, currentIndex]);

  useEffect(() => {
    if (!autoRotate || resolvedSlides.length <= 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === resolvedSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [autoRotate, interval, resolvedSlides.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [resolvedSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`fullscreen-slider ${className}`.trim()}>
      <div className="slider-container">
        {resolvedSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            aria-hidden={index === currentIndex ? 'false' : 'true'}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="slide-image"
            />
            <div className="slide-overlay">
              <div className="slide-content">
                {slide.title && (
                  <h1 className="slide-title">{slide.title}</h1>
                )}
                {slide.subtitle && (
                  <h2 className="slide-subtitle">{slide.subtitle}</h2>
                )}
                {slide.description && (
                  <p className="slide-description">{slide.description}</p>
                )}
                {slide.buttons && slide.buttons.length > 0 && (
                  <div className="slide-buttons">
                    {slide.buttons.map((button, buttonIndex) => (
                      <button
                        key={`${slide.id}-button-${buttonIndex}`}
                        className={button.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}
                        onClick={button.onClick}
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDots && resolvedSlides.length > 1 && (
        <div className="slider-dots">
          {resolvedSlides.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {showDecorations && (
        <div className="decorative-elements">
          <div className="diamond diamond-1">◊</div>
          <div className="diamond diamond-2">◊</div>
          <div className="diamond diamond-3">◊</div>
        </div>
      )}

      {children}
    </div>
  );
};

export default FullScreenSlider;