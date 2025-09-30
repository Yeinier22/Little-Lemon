import React from 'react';
import '../Styles/ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMapsClick = () => {
    window.open('https://maps.google.com/?q=1234+Collins+Ave,+Miami,+FL+33139', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/13051234567', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@littlelemonmiami.com', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+13051234567', '_blank');
  };

  return (
    <div className="contact-modal-overlay" onClick={handleOverlayClick}>
      <div className="contact-modal-content">
        <button className="contact-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="contact-modal-header">
          <h2>Contact Us</h2>
        </div>

        <div className="contact-modal-body">
          <div className="contact-info-section">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span className="contact-text">
                1234 Collins Ave, Miami, FL 33139{' '}
                <button 
                  className="contact-link" 
                  onClick={handleMapsClick}
                  title="View on Maps"
                >
                  [View on Maps]
                </button>
              </span>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <button 
                className="contact-link" 
                onClick={handlePhoneClick}
                title="Call us"
              >
                (305) 123-4567
              </button>
            </div>

            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <button 
                className="contact-link" 
                onClick={handleEmailClick}
                title="Send email"
              >
                info@littlelemonmiami.com
              </button>
            </div>

            <div className="contact-item">
              <span className="contact-icon">💬</span>
              <button 
                className="contact-link whatsapp-link" 
                onClick={handleWhatsAppClick}
                title="Contact via WhatsApp"
              >
                WhatsApp
              </button>
            </div>
          </div>

          <div className="opening-hours-section">
            <h3>Opening Hours</h3>
            <div className="hours-list">
              <div className="hours-item">
                <span className="days">Mon–Thu:</span>
                <span className="time">12 pm – 10 pm</span>
              </div>
              <div className="hours-item">
                <span className="days">Fri–Sun:</span>
                <span className="time">12 pm – 12 am</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;