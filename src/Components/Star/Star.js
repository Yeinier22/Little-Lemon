import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {faStar as regularStar} from "@fortawesome/free-regular-svg-icons";

const Rating=({rating})=> {
    const fullStart= Math.floor(rating);
    const halfStart = rating-fullStart >= 0.5;
    
    return(
<div className="star-container">
    {[...Array(fullStart)].map((_, index) => (
        <FontAwesomeIcon icon={faStar} key={index} color="gold"/>
    ))}
    {halfStart && <FontAwesomeIcon icon={faStarHalfStroke} color="gold"/>}
    {[...Array(5-fullStart-(halfStart ? 1 :0))].map((_, index) =>(
        <FontAwesomeIcon icon={regularStar} color="gold"/>
    ))}
    </div>
    )
}

export default Rating;