import { getHours, getMinutes, setHours } from "date-fns";

const occupancyAvailability = {
  outside: 32,
  inside: 50,
};

const rangeSchedule = {
  firstSlot: {
    hourStart: "12:00",
    hourFinal: "2:30",
    occupancyPercent: 85,
  },
  secondSlot: {
    hourStart: "3:00",
    hourFinal: "6:30",
    occupancyPercent: 45,
  },
  thirdSlot: {
    hourStart: "7:00",
    hourFinal: "10:00",
    occupancyPercent: 95,
  },
};

//convert string in format hour, min and set
function convertStringHour(strhour) {
  var [hour, minutes] = strhour.split(":").map(Number);
  if (hour === 12) {
    hour = 0;
  }
  const dateReference = hour * 100 + minutes;
  return dateReference;
}

//Find hour in slot
function findTimeSlot(hour2, rangeSchedule) {
  let foundSlot = null;

  for (const slotKey in rangeSchedule) {
    const slot = rangeSchedule[slotKey];

    const startTime = convertStringHour(slot.hourStart);
    const endTime = convertStringHour(slot.hourFinal);

    const formattedHour2 = hour2.slice(0, -2);
    const currentTime = convertStringHour(formattedHour2);
    console.log("startTime:"+ startTime);
    console.log("endTime:"+endTime);
    console.log("currentTime:"+currentTime);

    if (currentTime >= startTime && currentTime <= endTime) {
      foundSlot = slotKey;
      break; // Stop de search when find a valid slot
    }
  }
  if (foundSlot === null) {
    foundSlot = "out of range";
  }
  
  console.log(foundSlot);
  return foundSlot;
}

//Calculate the difference in days between two dates
function finalPercent(date, hour) {

  let percentOccupation=null;

  const today = new Date().toLocaleString().slice(0, 10);
  const today1 = new Date(today);
  today1.setHours(0, 0, 0, 0);

  const converToday = new Date(date);
  converToday.setHours(0, 0, 0, 0);

  const timeSlot = findTimeSlot(hour, rangeSchedule);

  if(timeSlot==="out of range"){
    percentOccupation=100;
  } else {

  // Calculate difference in miliseconds
  const differenceMiliseconds = converToday - today1;
  // Calculate difference in days
  const differenceDays = differenceMiliseconds / (1000 * 60 * 60 * 24);
  percentOccupation = Math.max(
    0,
    rangeSchedule[timeSlot].occupancyPercent - 10 * differenceDays
  );
}

  return percentOccupation;
}



function calculateTableAssignment(people, hour, day) {

  const finalPercent1 = finalPercent(day, hour);
  const timeSlot1 = findTimeSlot(hour, rangeSchedule);
  console.log("timeSlot:"+ finalPercent1);

  const totalAvailavility =
    occupancyAvailability.outside + occupancyAvailability.inside;

  //Real capacity inside= total capacity inside - (%occupancy-80,40 or 90%- factor percent)*occupancy inside. Factor percent
  //is each day > today rest 10% until it reaches 0%. For example, same day(factor percent 0), 7:00pm, 44-(0.95)*44  =   2 inside
  const realInsideCapacity =
    occupancyAvailability.inside -
    Math.ceil((occupancyAvailability.inside * finalPercent1) / 100);

  //Real capacity outside = %occupancy*(total availability) - real capacity inside
  const realOutsideCapacity =
    Math.ceil(totalAvailavility * ((100 - finalPercent1) / 100)) -
    realInsideCapacity;

  const parts = people.split(" ");
  const people1 = parseInt(parts[0]);

  const isInsideAvailable = people1 <= realInsideCapacity;
  const isOutsideAvailable = people1 <= realOutsideCapacity;

  return {
    isInsideAvailable: isInsideAvailable,
    isOutsideAvailable: isOutsideAvailable,
    percent: finalPercent1,
    timeSlot: timeSlot1
  };
}


export default calculateTableAssignment;



