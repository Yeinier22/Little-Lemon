import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import menuHeroImg from '../images/Menu.jpg';
import menuData from '../data/menuData.json';

const Menu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('mainMenu');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderMenuSection = (title, items) => (
    <div className="menu-section">
      <h3 className="menu-section-title">{title}</h3>
      <div className="menu-items">
        {items.map((item) => (
          <div key={item.id} className="menu-item-card">
            <div className="menu-item-header">
              <h4 className="menu-item-name">{item.name}</h4>
              <span className="menu-item-price">${item.price}</span>
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
      {renderMenuSection('Entradas', menuData.mainMenu.entradas)}
      {renderMenuSection('Platos Principales', menuData.mainMenu.platosPrincipales)}
      {renderMenuSection('Postres', menuData.mainMenu.postres)}
    </div>
  );

  const renderBebidas = () => (
    <div className="menu-content">
      {renderMenuSection('Cocktails', menuData.bebidas.cocktails)}
      {renderMenuSection('Cervezas', menuData.bebidas.cervezas)}
      {renderMenuSection('Otras Bebidas', menuData.bebidas.otrasBebidas)}
    </div>
  );

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <div className="menu-hero">
        <div className="menu-hero-image">
          <img src={menuHeroImg} alt="Menu" />
          <div className="menu-hero-overlay"></div>
        </div>
        <div className="menu-hero-content">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            ← Volver
          </button>
          <h1 className="menu-hero-title">MENÚ</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="menu-nav">
        <div className="menu-nav-container">
          <button 
            className={`menu-nav-button ${activeCategory === 'mainMenu' ? 'active' : ''}`}
            onClick={() => setActiveCategory('mainMenu')}
          >
            Main Menu
          </button>
          <button 
            className={`menu-nav-button ${activeCategory === 'bebidas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('bebidas')}
          >
            Bebidas
          </button>
        </div>
      </div>

      {/* Menu Content */}
      <div className="menu-container">
        {activeCategory === 'mainMenu' ? renderMainMenu() : renderBebidas()}
      </div>
    </div>
  );
};

export default Menu;
