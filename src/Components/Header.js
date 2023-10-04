import React, { useState } from "react";
import logo from "../images/logo.png";
import "../Styles/Header.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const [isOpen, setIsOpen]= useState(false);

    const toggle=()=>{
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

  return (
    <header>
        <div className="header-container">
        <img src={logo} alt="Logo" className="logo" />
        <FontAwesomeIcon icon={faBars} className={`icon-bars${isOpen ? "-open": ""}`} onClick={toggle}/>
        <FontAwesomeIcon icon={faXmark} className={`icon-mark${!isOpen ? "-open": ""}`} onClick={toggle}/>
      <nav className={`nav${isOpen ? '-open' :""}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Menu">Menu</a></li>
          <li><a href="#Reservations">Reservations</a></li>
          <li><a href="#Order online">Order online</a></li>
          <li><a href="#Login">Login</a></li>
        </ul>
      </nav> 
      </div>

    </header>
  );
};

export default Header;

