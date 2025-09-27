import React from "react";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import ReserApp from "./Components/Reservations/ReservationApp";
import Menu from "./Components/Menu";
import OurStory from "./Components/OurStory";


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/booking" element={<ReserApp />} />
      <Route path="menu" element={<Menu />} />
      <Route path="/story" element={<OurStory />} />
      </Routes>
  );
}

export default App;

