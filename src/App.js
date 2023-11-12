import React from "react";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import Reservation from "./Components/Reservations/Reservations";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/booking" element={<Reservation />} />
      </Routes>
  );
}

export default App;

