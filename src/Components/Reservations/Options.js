import React, { useEffect, useState } from "react";
import { useAvailable } from "./Context/availableContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import PickOption from "./pickOption";

const AvailableOptions = ({ showDetails, setShowDetails }) => {
  const { isTableAvailable, results, clicked } = useAvailable();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (index) => {
    const informationButton = results[index];
    setShowDetails(true);
    setSelectedButton(informationButton);
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
                      "button" + (isAvailable ? "Available" : "-NoAvailable")
                    }
                    key={index}
                    disabled={!isAvailable}
                    onClick={()=>handleClick(index)}
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
