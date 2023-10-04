import "../Styles/Nav.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import BasicUsage from "./MenuModal";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#About">About</a>
        </li>
        <li>
          <a href="#Menu">Menu</a>
        </li>
        <li>
          <a href="#Reservations">Reservations</a>
        </li>
        <li>
          <a href="#Order online">Order online</a>
        </li>
        <li>
          <a href="#Login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1072) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="toggleBars" onClick={onOpen}>
        <FontAwesomeIcon icon={faBars} />
        <div className="container-modal">
          <BasicUsage isOpen={isOpen} onClose={onClose}>
            <Nav />
          </BasicUsage>
        </div>
      </div>      
      <div className="nav-menu">
        <Nav />
      </div>
    </div>
  );
};

export default NavMenu;
