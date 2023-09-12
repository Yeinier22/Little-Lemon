import "../Styles/Hero.css";
import restaurantfood from "../images/restauranfood.jpg"

const Hero = () => {
  return (
    <div className="hero-background">
      <div className="hero-container">
      <div className="hero-description">
        <h1>Little Lemon</h1>
        <p id="location">Chicago</p>
        <p>We are a family owned <br/>Mediterranean restaurant, <br/>
        focused on traditional <br/>recipes served with a modern <br/>twist.
        </p>
        <button type="submit">Reserve a table</button>
      </div>
      <div className="hero-image">
        <img src={restaurantfood} alt="litle restaurant"/>
      </div>
    </div>
    </div>
  );
};

export default Hero;
