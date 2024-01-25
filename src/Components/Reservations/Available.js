import React, { useState } from "react";
import { useAvailable } from "./Context/availableContext";
import {calculateTableAssignment, fetchAPI} from "./Ocuppancy";
import bookings from "./Booking";
import "./Reservations.css";



const Available = ({ people, date, hour, occupation }) => {
  const { handleAvailabilityChange } = useAvailable();


  const calculate = () => {
   fetchAPI({ people, date, hour, occupation }).then((result)=>{
      const isTableAvailable = result.isInsideAvailable || result.isOutsideAvailable;
    
      if (isTableAvailable) {
        bookings(people, hour, date, occupation).then((calculatedResults) => {
          handleAvailabilityChange(isTableAvailable, calculatedResults, true);
        });
      } else {
        handleAvailabilityChange(false, [], true);
      }
    });
  };

  return (
    <div className="selector-container">
      <button className={"selector available"} type="submit" onClick={calculate}>
        Find a table
      </button>
    </div>
  );
};

export default Available;
