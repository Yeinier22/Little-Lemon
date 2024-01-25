import React, { createContext, useState, useContext } from "react";

const AvailableContext = createContext();

export const useAvailable = () => {
  return useContext(AvailableContext);
};

export const AvailableProvider = ({ children }) => {
  const [isTableAvailable, setIsTableAvailable] = useState(false);
  const [results, setResults] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [showStep, setShowStep] = useState(false);


  const handleAvailabilityChange = (tableAvailable, calculatedResults, isClicked) => {
    setIsTableAvailable(tableAvailable);
    setResults(calculatedResults);
    setClicked(isClicked);
  };

  return (
    <AvailableContext.Provider
      value={{
        isTableAvailable,
        results,
        clicked,
        showStep,
        handleAvailabilityChange,
      }}
    >
      {children}
    </AvailableContext.Provider>
  );
};