import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import { BrowserRouter as Router} from "react-router-dom";

test('renders reservation title correctly',()=>{
    render(
        <Router>
            <App />
        </Router>
    )

    fireEvent.click(screen.getByText('Reserve a table'))

    const reservationButton=screen.getByText('Reservation at Little Lemon')
    expect(reservationButton).toBeInTheDocument();
})
