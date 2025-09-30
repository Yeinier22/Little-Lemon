//import { getHours, getMinutes, getMonth, setHours } from "date-fns";
//import { useAvailable } from "./Context/availableContext";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//function to extract Month and day in format Janunary 16 to compare
function extractDate(date) {
  const month = monthNames[date.getMonth()];
  const gettingDay = date.getDate();

  const formatedDate = `${month} ${gettingDay}`;
  return formatedDate;
}


const effectiveBooking = (day, hour, occupation) => {
  let restOutside = 0;
let restInside = 0;
  if (occupation.length > 0) {
    const pickDate = extractDate(day);
    for (const occup of occupation) {
      const arrayDate = extractDate(occup.date);
      if (arrayDate === pickDate && occup.hour === hour) {
        if (occup.place === "inside") {
          restInside = restInside + occup.people;
        } else if (occup.place === "outside") {
          restOutside += occup.people;
        }
      }
    }
  }
  return { restInside, restOutside };
};

const occupancyAvailability = {
  outside: 20,
  inside: 28,
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
    occupancyPercent: 90,
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

    if (currentTime >= startTime && currentTime <= endTime) {
      foundSlot = slotKey;
      break; // Stop de search when find a valid slot
    }
  }
  if (foundSlot === null) {
    foundSlot = "out of range";
  }

  return foundSlot;
}

//Calculate the difference in days between two dates
function finalPercent(day, hour) {
  let percentOccupation = null;

  const today = new Date().toLocaleString().slice(0, 10);
  const today1 = new Date(today);
  today1.setHours(0, 0, 0, 0);

  const converToday = new Date(day);
  converToday.setHours(0, 0, 0, 0);

  const timeSlot = findTimeSlot(hour, rangeSchedule);
  if (timeSlot === "out of range") {
    percentOccupation = 100;
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

function calculateTableAssignment(people, hour, date, occupation) {
  const finalPercent1 = finalPercent(date, hour);
  const timeSlot1 = findTimeSlot(hour, rangeSchedule);
  const grabbedReser = effectiveBooking(date, hour, occupation);


  /*const totalAvailavility =
    occupancyAvailability.outside + occupancyAvailability.inside;*/

  //Real capacity inside= total capacity inside - (%occupancy-80,40 or 90%- factor percent)*occupancy inside. Factor percent
  //is each day > today rest 10% until it reaches 0%. For example, same day(factor percent 0), 7:00pm, 44-(0.95)*44  =   2 inside
  const realInsideCapacity =
    occupancyAvailability.inside -
    Math.ceil((occupancyAvailability.inside * finalPercent1) / 100) -(grabbedReser ? grabbedReser.restInside : 0);

  //Real capacity outside = %occupancy*(total availability) - real capacity inside
  const realOutsideCapacity =
    occupancyAvailability.outside -
    Math.ceil((occupancyAvailability.outside * finalPercent1) / 100) -(grabbedReser ? grabbedReser.restOutside : 0)
   

  const parts = people.split(" ");
  const people1 = parseInt(parts[0]);

  const isInsideAvailable = people1 <= realInsideCapacity;
  const isOutsideAvailable = people1 <= realOutsideCapacity;

  return {
    isInsideAvailable: isInsideAvailable,
    isOutsideAvailable: isOutsideAvailable,
    percent: finalPercent1,
    timeSlot: timeSlot1,
  };
}

// Deprecated simulation APIs kept temporarily for reference; real backend now in use.
// const fetchAPI = (...) => {...}
// const submitAPI = (...) => {...}

export { calculateTableAssignment };
