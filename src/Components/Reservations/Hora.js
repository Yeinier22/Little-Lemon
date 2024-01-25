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
    const date4 = new Date(currentDate)//current date
    const date5 = new Date(currentDate)
    date5.setHours(12,0,0,0);//12:00pm
    const differenceInMilliseconds = date4 - date5;
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    if(differenceInMinutes<-59){//at least 1h difference to 12:00pm
      hour=12;
      minutes=0;
    }else if(differenceInMinutes >= -59 && differenceInMinutes < 540){
      if(date4.getMinutes()<29){
        hour=(date4.getHours()+1);
        minutes=30;
      } else{
        hour=(date4.getHours()+2);
        minutes=0;
      }
    }
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

}






//HoursSelector use generateHours  component
const HoursSelector = ({selectedValue, onChange, date}) => {
  const hours = generateHours(date);


  const handlechange=(e)=>{
    const newValue=e.target.value;
    onChange(newValue);
}

  return (
    <div className="selector-container">
        <select className="selector" value={selectedValue} onChange={handlechange} data-testid="hours-selector">
          {hours.map((hour, index) => (
            <option key={index} value={hour} label={hour} />
          ))}
        </select>
    </div>
  );
};

export default HoursSelector;





