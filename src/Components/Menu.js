import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Footer from './Footer';
import FullScreenSlider from './FullScreenSlider';
import './Menu.css';
import menuHeroImg from '../images/Menu.jpg';
import menuData from '../data/menuData.json';

const Menu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('mainMenu');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderMenuSection = (title, items) => (
    <div className="menu-section">
      <h3 className="menu-section-title">{title}</h3>
      <div className="menu-items">
        {items.map((item) => (
          <div key={item.id} className="menu-item-card">
            <div className="menu-item-header">
              <h4 className="menu-item-name">{item.name}</h4>
              <span className="menu-item-price">{item.price}</span>
            </div>
            {item.description && (
              <p className="menu-item-description">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div className="menu-content">
      {renderMenuSection('Appetizers', menuData.mainMenu.entradas)}
      {renderMenuSection('Main Courses', menuData.mainMenu.platosPrincipales)}
      {renderMenuSection('Desserts', menuData.mainMenu.postres)}
    </div>
  );

  const renderBebidas = () => (
    <div className="menu-content">
      {renderMenuSection('Cocktails', menuData.bebidas.cocktails)}
      {renderMenuSection('Beers', menuData.bebidas.cervezas)}
      {renderMenuSection('Other Beverages', menuData.bebidas.otrasBebidas)}
    </div>
  );

  const menuHeroSlides = [
    {
      id: 'menu-hero',
      src: menuHeroImg,
      alt: 'Menu',
      title: 'MENU',
      subtitle: 'Peruvian Restaurant',
      description: 'Discover our authentic Peruvian flavors with a modern twist'
    }
  ];

  return (
    <>
      <Header />
      <FullScreenSlider
        slides={menuHeroSlides}
        autoRotate={false}
        showDots={false}
        showDecorations={false}
        className="menu-hero-slider"
      >
        <button 
          className="menu-back-button"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
      </FullScreenSlider>

      <div className="menu-page">

      {/* Navigation Tabs */}
      <div className="menu-nav">
        <div className="menu-nav-container">
          <button 
            className={`menu-nav-button ${activeCategory === 'mainMenu' ? 'active' : ''}`}
            onClick={() => setActiveCategory('mainMenu')}
          >
            <span className="nav-button-text">Main Menu</span>
          </button>
          <button 
            className={`menu-nav-button ${activeCategory === 'bebidas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('bebidas')}
          >
            <span className="nav-button-text">Beverages</span>
          </button>
        </div>
      </div>

      {/* Menu Content */}
      <div className="menu-container">
        {activeCategory === 'mainMenu' ? renderMainMenu() : renderBebidas()}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
      </div>
      <Footer />
    </>
  );
};

export default Menu;
