import React from "react";
import "./PickOption.css";

const PickOption = ({ date, hour }) => {
  return (
    <div className="pickOption-container">
      <div className="pickOption-container-text">
        <h3>Select a seating type</h3>
        <p>{`The following options are available for a reservation on ${date}, ${hour}`}</p>
      </div>
      <div className="pick-options">
        <div className="pick-indoor">
          <p>Indoor</p>
          <button>Select</button>
        </div>
        <div className="pick-outdoor">
          <p>Outdoor</p>
          <button>Select</button>
        </div>
      </div>
    </div>
  );
};

export default PickOption;
