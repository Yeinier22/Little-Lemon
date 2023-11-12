import React from "react";
import { useAvailable } from "./Context/availableContext";
import calculateTableAssignment from "./Ocuppancy";
import bookings from "./Booking";
import "./Reservations.css";

const Available = ({ people, date, hour }) => {
  const { handleAvailabilityChange } = useAvailable();

  const calculate = () => {
    const availability = calculateTableAssignment(people, hour, date);
    const isTableAvailable = availability.isInsideAvailable || availability.isOutsideAvailable;

    if (isTableAvailable) {
      const calculatedResults = bookings(people, hour, date);
      handleAvailabilityChange(isTableAvailable, calculatedResults, true);
    } else {
      handleAvailabilityChange(false, [], true);
    }
  };

  return (
    <div>
      <button className={"selector available"} type="submit" onClick={calculate}>
        Find a table
      </button>
    </div>
  );
};

export default Available;
