import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faChevronUp 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faInstagram, 
  faFacebook, 
  faTiktok, 
  faTwitter 
} from "@fortawesome/free-brands-svg-icons";
import "../Styles/Footer.css";
import TypographicLogo from "./TypographicLogo";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  return (
    <footer>
      <div className="footer-top-border"></div>
      
      <div className="footer-container">
        <div className="logo-container">
          <TypographicLogo />
          <p className="logo-tagline">Authentic Peruvian Culinary Experience</p>
        </div>
        
        <div className="footer-navigation">
          <h3>Quick Links</h3>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/booking">Reservations</a></li>
              <li><a href="/menu">Order Online</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
            <a 
              href="https://maps.google.com/?q=15304+Biscayne+Blvd,+Aventura,+FL+33180" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              15304 Biscayne Blvd, Aventura, FL 33180
            </a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            <a href="tel:+17866666666">(786) 666-6666</a>
          </div>
        </div>
        
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/littlelemonrestaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a 
              href="https://www.facebook.com/littlelemonrestaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a 
              href="https://www.tiktok.com/@littlelemonrestaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link tiktok"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a 
              href="https://www.twitter.com/littlelemonrest" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>&copy; 2025 Little Lemon. All rights reserved.</p>
        </div>
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
    </footer>
  );
};

export default Footer;
