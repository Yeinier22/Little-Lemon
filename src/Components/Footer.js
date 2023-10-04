import "../Styles/Footer.css";
import logoFooter from "../images/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <img src={logoFooter} alt="logo-footer" className="footer-logo" />
        </div>
        <div className="footer-doormat">
          <h3>Doormat navigation</h3>
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
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <div className="address">
            <h5>Address:</h5>
            <a href="#google.page">15304 Biscayne Blvd, Aventura, Ch 33180</a>
          </div>
          <div className="email">
          <h5>Email:</h5>
            <a href="#email">example@gmail.com</a>
          </div>
          <div className="phone">
          <h5>Phone:</h5>
            <p>786 666 66 66</p>
          </div>
        </div>
        <div className="footer-social">
          <h3>Social Media</h3>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
