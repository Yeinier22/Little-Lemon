import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import { BrowserRouter as Router} from "react-router-dom";
import  "@testing-library/jest-dom/matchers";

test('renders reservation title correctly',()=>{
    render(
        <Router>
            <App />
        </Router>
    )

    fireEvent.click(screen.getByText('Reserve a table'));

    const hoursSelector =screen.getByTestId('hours-selector');
    fireEvent.change(hoursSelector, {target: {value:"5:30 PM"}});
    const updateHoursSelector =screen.getByTestId('hours-selector');
    
    expect(updateHoursSelector).toHaveValue("5:30 PM");
});
