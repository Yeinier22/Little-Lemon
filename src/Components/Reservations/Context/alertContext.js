import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AvailableAlert = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <AlertContext.Provider value={{
      isOpen, setIsOpen,
      onClose: () => setIsOpen(false)}}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
