import React from "react";
import { fireEvent, render, screen} from "@testing-library/react";
import App from "../../App";
import { BrowserRouter as Router} from "react-router-dom";
import  "@testing-library/jest-dom/matchers";

test('renders reservation title correctly',async ()=>{
    render(
        <Router>
            <App />
        </Router>
    )

    fireEvent.click(screen.getByText('Reserve a table'));

    const hoursSelector =screen.getByTestId('hours-selector');
     fireEvent.click(hoursSelector);
    fireEvent.change(screen.getByTestId('hours-selector'), {
        target: { value: '9:00 PM' },
      });

    expect(hoursSelector).toHaveValue("9:00 PM");
});
