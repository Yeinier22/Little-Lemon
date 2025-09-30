import React from "react";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import ReserApp from "./Components/Reservations/ReservationApp";
import Menu from "./Components/Menu";
import OurStory from "./Components/OurStory";
import OrderNowPage from './Components/Order/OrderNowPage';
import { OrderProvider } from './Components/Order/OrderContext';
import CartPage from './Components/Order/CartPage';
import AdminReservations from './Components/AdminReservations';
import MyReservations from './Components/Reservations/MyReservations';


function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/booking" element={<ReserApp />} />
        <Route path="menu" element={<Menu />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/order" element={<OrderNowPage />} />
        <Route path="/cart" element={<CartPage />} />
        {process.env.REACT_APP_SHOW_ADMIN !== 'false' && (
          <Route path="/admin/reservations" element={<AdminReservations />} />
        )}
        <Route path="/my-reservations" element={<MyReservations />} />
      </Routes>
    </OrderProvider>
  );
}

export default App;

