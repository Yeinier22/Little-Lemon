import React from "react";
import logo from "../images/logo.png"
import Nav from "./Nav";
import "../Styles/Header.css"

const Header=()=>{
    return (
        <header>
             <img src={logo} alt="Logo" className="logo" />
             <Nav />
        </header>
    )
}

export default Header;