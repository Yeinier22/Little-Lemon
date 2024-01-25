import { max } from "date-fns";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({selectedDate, onChange}) => {
const today= new Date();
const maxDay=new Date(today);
const minDay=new Date(today);
maxDay.setMonth(maxDay.getMonth()+3);

if(minDay.getHours()>=21){
  minDay.setDate(minDay.getDate()+1)
  console.log("si lo es", minDay.getDate())
}

  return (
    <div  className="selector-container"  >
        {selectedDate && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => onChange(date)}
          minDate={minDay}
          maxDate={maxDay}
          dateFormat="MMM dd"
          withPortal 
          className="selector"   
        />
      )}
    </div>
  );
};

    
    export default DateSelector;


