
import { Link } from "react-router-dom";
import "../Styles/Hero.css";
import restaurantfood from "../images/restauranfood.jpg"

const Hero = () => {
  return (
      <div className="hero-container">
      <div className="hero-description">
        <h1>Little Lemon</h1>
        <p id="location">Chicago</p>
        <p id="description">We are a family owned <br/>Mediterranean restaurant, <br/>
        focused on traditional <br/>recipes served with a modern <br/>twist.
        </p>
       <Link to="/booking">
        <button type="submit">Reserve a table</button>
        </Link>
      </div>
      <div className="hero-image">
        <img src={restaurantfood} alt="litle restaurant"/>
      </div>
    </div>
  );
};

export default Hero;
