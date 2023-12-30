import React, { useState, useContext } from "react";
import "./PickOption.css";
import FormSection from "./DetailsReservation/DetailsReservation";
import { UserContext } from "./Reservations";

const PickOption = ({ date, hour }) => {
  const [showForm, setShowForm] = useState(false);
  const [place, setPlace] = useState();
  const {setShowStep, setFirstRed} = useContext(UserContext);

  const handleSelectIndoor = () => {
    setPlace("inside");
    setShowForm(true);
    setShowStep(false);
    setFirstRed(false);
  };

  const handleSelectOutdoor = () => {
    setPlace("outside");
    setShowForm(true);
    setShowStep(false);
    setFirstRed(false)
  };

  return (
    <div>
      {!showForm && (<div className="pickOption-container">
        
          <div className="pickOption-container-text">
            <h3>Select a seating type</h3>
            <p>{`The following options are available for a reservation on ${date}, ${hour}`}</p>
          </div>
        <div className="pick-options">
          <div className="pick-indoor">
            <p>Indoor</p>
            <button onClick={handleSelectIndoor}>Select</button>
          </div>
          <div className="pick-outdoor">
            <p>Outdoor</p>
            <button onClick={handleSelectOutdoor}>Select</button>
          </div>
        </div>
      </div> )}
      {showForm && <FormSection place={place} />}
    </div>
  );
};

export default PickOption;
