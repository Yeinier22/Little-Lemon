import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

// Importar las imágenes del menú
import dishesImg from '../images/menu/dishes.jpg';
import dessertImg from '../images/menu/dessert.jpg';
import drinksImg from '../images/menu/drinks.jpg';

const Menu = () => {
  const navigate = useNavigate();

  const menuCategories = [
    {
      id: 1,
      title: 'Main Dishes',
      image: dishesImg,
      alt: 'Main Dishes'
    },
    {
      id: 2,
      title: 'Desserts',
      image: dessertImg,
      alt: 'Delicious Desserts'
    },
    {
      id: 3,
      title: 'Drinks & Cocktails',
      image: drinksImg,
      alt: 'Drinks and Cocktails'
    }
  ];

  const handleCategoryClick = (category) => {
    // Por ahora no hace nada, pero aquí se puede agregar la funcionalidad después
    console.log(`Clicked on: ${category.title}`);
  };

  return (
    <div className="menu-container">
      <header className="menu-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
        <h1>Our Menu</h1>
        <p>Discover our delicious options</p>
      </header>
      
      <div className="menu-grid">
        {menuCategories.map((category) => (
          <div 
            key={category.id} 
            className="menu-item"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="menu-item-image">
              <img 
                src={category.image} 
                alt={category.alt}
              />
              <div className="menu-item-overlay">
                <div className="menu-item-lines">
                  <div className="line-top"></div>
                  <h3>{category.title}</h3>
                  <div className="line-bottom"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
