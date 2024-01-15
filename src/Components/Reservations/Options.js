import React, { useEffect, useState, useContext } from "react";
import { useAvailable } from "./Context/availableContext";
import { useButton } from "./Context/SelectButtonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import PickOption from "./pickOption";
import { UserContext } from "./Reservations";

const AvailableOptions = ({ showDetails, setShowDetails }) => {
  const { isTableAvailable, results, clicked } = useAvailable();
  const {selectedButton, handleClick } = useButton();
  const {setShowStep, setShowBack} = useContext(UserContext);

  const handleClickButton = (index) => {
    const informationButton = results[index];
    setShowDetails(true);
    handleClick(informationButton);
    setShowStep(true);
    setShowBack(true);
  };

  useEffect(() => {
    // Puedes realizar alguna lógica adicional aquí si es necesario
    console.log('Available component updated with show:', showDetails);
  }, [showDetails]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

const getDate=()=>{

const month = monthNames[selectedButton.day.getMonth()];

const day = selectedButton.day.getDate();
let dayWithSuffix;
if (day >= 11 && day <= 13) {
  dayWithSuffix = `${day}th`;
} else {
  const suffixes = ["st", "nd", "rd"];
  dayWithSuffix = `${day}${suffixes[day % 10 - 1] || "th"}`;
}

const formatedDate = `${month} ${dayWithSuffix}`;
return formatedDate;
  }



  return (
    <div className="reservation-bookings">
      {
        clicked &&
          (isTableAvailable ? (
            !showDetails ? (
              results.map((result, index) => {
                const isAvailable =
                  result.isInsideAvailable || result.isOutsideAvailable;
                return (
                  <button
                    className={
                      "button" + (isAvailable ? "-Available" : "-NoAvailable")
                    }
                    key={index}
                    disabled={!isAvailable}
                    onClick={()=>handleClickButton(index)}
                  >
                    <FontAwesomeIcon icon={faUtensils} size="1.5x" />
                    {result.hour}
                  </button>
                );
              })
            ) : (
              <PickOption 
                    hour={selectedButton.hour}
                    date={getDate()}
              />
            )
          ) : (
            // ? (
            <div>Por favor, elija otros datos</div>
          )) 
      }{" "}
    </div>
  );
};

export default AvailableOptions;