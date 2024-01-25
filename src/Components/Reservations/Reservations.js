import People from "./People";
import DateSelector from "./Date";
import HoursSelector from "./Hora";
import { generateHours } from "./Hora";
import Available from "./Available";
import { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import "./Reservations.css";
import AvailableOptions from "./Options";
import { AvailableProvider } from "./Context/availableContext";
import { AvailableButton } from "./Context/SelectButtonContext";
import { useAvailable } from "./Context/availableContext";

export const UserContext = createContext();

const Reservation = () => {
  const [selectPeople, setSelectPeople] = useState("2 people");
  const today=new Date();
  today.setDate(today.getHours()>21 ? today.getDate()+1: today.getDate())
  const [selectDate, setSelectedDate] = useState(today);
  const [showDetails, setShowDetails] = useState(false);
  const [showStep, setShowStep] = useState(false);
  const [firstRed, setFirstRed] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [occupation, setOccupation]=useState([]);
  

  useEffect(() => {
    const hours = generateHours(selectDate); // Obtener la lista de horas
    if (hours && hours.length > 0) {
      setSelectHour(hours[0]); // Establecer la primera hora como hora inicial
    }
  }, [selectDate]); // Ejecutar cuando selectDate cambie

  const [selectHour, setSelectHour] = useState("12:00 pm");

  const handleClick1 = () => {
    setShowDetails(false);
    setShowStep(false);
    setFirstRed(true);
    setShowBack(false);
  };

  return (
    <UserContext.Provider
      value={{ showStep, setShowStep, firstRed, setFirstRed, showBack, setShowBack, setOccupation}}
    >
      <div className="background-reservation-container">
        <div className="reservation-container">
          <div className="reservation-link">
            {showBack && <button onClick={handleClick1}>&lt; Back</button>}
            <Link to="/">HomePage</Link>
          </div>
          <div
            className={"title-reservation" + (!showDetails ? "" : "-details")}
          >
            <h2>Reservation at Little Lemon</h2>
          </div>
          <AvailableProvider>
            {!showStep && (
              <div className="state-reservation">
                <ul>
                  <li className={"step1" + (firstRed ? "-red" : "")}>
                    <span>1.</span>
                    <span>FIND A TABLE</span>
                  </li>
                  <li className={"step2" + (!firstRed ? "-red" : "")}>
                    <span>2.</span>
                    <span>YOUR DETAILS</span>
                  </li>
                </ul>
              </div>
            )}
            <div className="reservation-option">
              {!showDetails && (
                <div className="reservation-selector">
                  <People
                    selectedValue={selectPeople}
                    onChange={setSelectPeople}
                  />
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
                    occupation={occupation}
                  />
                </div>
              )}
              <div className="available-options">
                <AvailableButton>
                  <AvailableOptions
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                  />
                </AvailableButton>
              </div>
            </div>
          </AvailableProvider>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Reservation;
