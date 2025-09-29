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

    const reserveButtons = screen.getAllByRole('button', { name: /reserve a table/i });
    fireEvent.click(reserveButtons[0]);

    const reservationButton=screen.getByText('Reservation at Little Lemon')
    expect(reservationButton).toBeInTheDocument();
})
