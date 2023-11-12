import React from "react";


export const generateHours = (date) => {

  let hour = null; 
  let minutes = null;

  const currentDate =new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const date1=date;
  const date1Day=date1.getDate();
  const date1Mounth=date1.getMonth();
  

  const isSameDate=currentDay===date1Day && currentMonth===date1Mounth; //Same day and month than current date
  
  if(isSameDate)  {
    const date2 = new Date(currentDate);
    date2.setMinutes(date2.getMinutes() + 60);
    const hour1= date2.getHours();
    const date3= new Date(currentDate);
    date3.setHours(0,0,0,0);
    date3.setHours(hour1);
    date3.setMinutes(date3.getMinutes() + 30);
    
    if(date3 < date2){
      date3.setMinutes(date3.getMinutes()+30)
    }
    if(date3.getHours()<12){
      date3.setHours(12);
    }
    hour=date3.getHours();
    minutes=date3.getMinutes();
  } else {
    hour=12;
    minutes=0;
  }

 

  const startTime = new Date();
  startTime.setHours(hour, minutes, 0); // Set hour to start at 12:00 PM
  const endTime = new Date();
  endTime.setHours(22, 0, 0); // Set hour to finish at 10:00 PM
  const hoursOptions = [];

  while (startTime <= endTime) {
    const formattedHour = startTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    hoursOptions.push(formattedHour);
    startTime.setMinutes(startTime.getMinutes() + 30); // Add 30 minutes
  }

  return hoursOptions;
};

const HoursSelector = ({selectedValue, onChange, date}) => {
  const hours = generateHours(date);


  const handlechange=(e)=>{
    const newValue=e.target.value;
    onChange(newValue);
}

  return (
    <div className="selector-container">
        <select className="selector" value={selectedValue} onChange={handlechange}>
          {hours.map((hour, index) => (
            <option key={index} value={hour} label={hour} />
          ))}
        </select>
    </div>
  );
};

export default HoursSelector;






