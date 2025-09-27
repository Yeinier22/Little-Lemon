import React from 'react';
import './TypographicLogo.css';

const TypographicLogo = () => {
  return (
    <div className="typographic-logo">
      <div className="logo-line">
        <span className="letter-l special">L</span>
        <span className="letter">I</span>
        <span className="letter">T</span>
        <span className="letter">T</span>
        <span className="letter">L</span>
        <span className="letter">E</span>
      </div>
      <div className="logo-line">
        <span className="letter">L</span>
        <span className="letter">E</span>
        <span className="letter">M</span>
        <span className="letter-o special">O</span>
        <span className="letter">N</span>
      </div>
    </div>
  );
};

export default TypographicLogo;