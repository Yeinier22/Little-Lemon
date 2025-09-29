import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypographicLogo from "./TypographicLogo";
import "../Styles/Header.css";
import { faBars, faXmark, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useOrder } from './Order/OrderContext';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useOrder() || { totalItems: 0 };

    const toggle = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    const handleMenuClick = (e) => {
        e.preventDefault();
        navigate('/menu');
        setIsOpen(false); // Close mobile menu
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50); // Cambia el estado después de 50px de scroll
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <header>
        <div className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
        <div 
          className="header-logo-button"
          onClick={() => window.location.href = '/'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.location.href = '/';
            }
          }}
        >
          <TypographicLogo />
        </div>
        <FontAwesomeIcon icon={faBars} className={`icon-bars${isOpen ? "-open": ""}`} onClick={toggle}/>
        <FontAwesomeIcon icon={faXmark} className={`icon-mark${!isOpen ? "-open": ""}`} onClick={toggle}/>
      <nav className={`nav${isOpen ? '-open' :""}`}>
        <ul>
          <li><a href="#menu" onClick={handleMenuClick}>MENU</a></li>
          <li><a href="#locations">LOCATIONS</a></li>
          <li><a href="#foodlosophy">FOODLOSOPHY</a></li>
          <li><a href="#bar">BAR</a></li>
          <li><a href="#catering">CATERING</a></li>
          <li><a href="#careers">CAREERS</a></li>
        </ul>
         <button
           className="order-now-btn"
           data-has-items={totalItems > 0 ? 'true' : 'false'}
           onClick={() => navigate(totalItems > 0 ? '/cart' : '/order')}
           title={totalItems > 0 ? 'View Cart' : 'Order Now'}
         >
           {totalItems > 0 ? (
             <>
               <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '6px' }} />
               {totalItems}
             </>
           ) : 'ORDER NOW'}
         </button>
      </nav> 
      </div>

    </header>
  );
};

export default Header;

