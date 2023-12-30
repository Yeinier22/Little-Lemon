import React, { createContext, useContext, useState } from 'react';

const AvailableContext = createContext();

export const AvailableButton = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  

  const handleClick = (informationButton) => {
    setSelectedButton(informationButton);
  };

  return (
    <AvailableContext.Provider value={{ selectedButton, handleClick}}>
      {children}
    </AvailableContext.Provider>
  );
};

export const useButton = () => {
  return useContext(AvailableContext);
};