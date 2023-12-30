import React from "react";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import Reservation from "./Components/Reservations/Reservations";
import ReserApp from "./Components/Reservations/ReservationApp";


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/booking" element={<ReserApp />} />
      </Routes>
  );
}

export default App;

