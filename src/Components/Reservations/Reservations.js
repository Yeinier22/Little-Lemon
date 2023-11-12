import People from "./People";
import DateSelector from "./Date";
import HoursSelector from "./Hora";
import { generateHours } from "./Hora";
import Available from "./Available";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Reservations.css";
import AvailableOptions from "./Options";
import { AvailableProvider } from "./Context/availableContext";

const Reservation = () => {
  const [selectPeople, setSelectPeople] = useState("2 people");
  const [selectDate, setSelectedDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const hours = generateHours(selectDate); // Obtener la lista de horas
    if (hours && hours.length > 0) {
      setSelectHour(hours[0]); // Establecer la primera hora como hora inicial
    }
  }, [selectDate]); // Ejecutar cuando selectDate cambie

  const [selectHour, setSelectHour] = useState("12:00 pm");

  return (
    <div className="background-reservation-container">
      <div className="reservation-container">
        <div className="reservation-link">
          <button onClick={() => setShowDetails(false)}>&lt; Back</button>
          <Link to="/">HomePage</Link>
        </div>
        <div className={"title-reservation"+(!showDetails ? "" : "-details")}>
          <h2>Reservation at Little Lemon</h2>
        </div>
        {!showDetails && <div className="state-reservation">
          <ul>
            <li className="step1">
              <span>1.</span>
              <span>FIND A TABLE</span>
            </li>
            <li className="step">
              <span>2.</span>
              <span>YOUR DETAILS</span>
            </li>
          </ul>
        </div>}
        <AvailableProvider>
          <div className="reservation-option">
            {!showDetails && <div className="reservation-selector">
              <People selectedValue={selectPeople} onChange={setSelectPeople} />
              <DateSelector
                selectedDate={selectDate}
                onChange={setSelectedDate}
              />
              <HoursSelector
                selectedValue={selectHour}
                onChange={setSelectHour}
                date={selectDate}
              />
              <Available
                people={selectPeople}
                date={selectDate}
                hour={selectHour}
              />
            </div> }
            <div className="available-options">
              <AvailableOptions
                showDetails={showDetails}
                setShowDetails={setShowDetails}
              />
            </div>
          </div>
        </AvailableProvider>
      </div>
    </div>
  );
};

export default Reservation;
