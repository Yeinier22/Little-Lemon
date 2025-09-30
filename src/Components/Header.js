import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TypographicLogo from "./TypographicLogo";
import "../Styles/Header.css";
import { faBars, faXmark, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useOrder } from './Order/OrderContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Consider both home and menu routes for initial transparent header over hero image
  const isHome = location.pathname === '/' || location.pathname === '/menu';
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 945 : false);
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
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 945);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
  <header>
  <div className={`header-container ${isScrolled ? 'scrolled' : ''} ${isHome && !isScrolled ? 'transparent' : ''} ${isOpen ? 'menu-open' : ''}`}>
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
        <div className="header-actions">
          <button
            className="order-now-btn order-inline"
            data-has-items={totalItems > 0 ? 'true' : 'false'}
            onClick={() => navigate(totalItems > 0 ? '/cart' : '/order')}
            title={totalItems > 0 ? 'View Cart' : 'Order'}
          >
            {totalItems > 0 ? (
              <>
                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '6px' }} />
                {totalItems}
              </>
            ) : (isMobile ? 'ORDER' : 'ORDER NOW')}
          </button>
          <FontAwesomeIcon icon={faBars} className={`icon-bars${isOpen ? "-open": ""}`} onClick={toggle}/>
          <FontAwesomeIcon icon={faXmark} className={`icon-mark${!isOpen ? "-open": ""}`} onClick={toggle}/>
        </div>
      <nav className={`nav${isOpen ? '-open' :""}`}>
        <ul>
          <li><a href="#menu" onClick={handleMenuClick}>MENU</a></li>
          <li><a href="#locations">LOCATIONS</a></li>
          <li><a href="#foodlosophy">FOODLOSOPHY</a></li>
          <li><a href="#bar">BAR</a></li>
          <li><a href="#catering">CATERING</a></li>
          <li><a href="#careers">CAREERS</a></li>
        </ul>
      </nav> 
      </div>

    </header>
  );
};

export default Header;

