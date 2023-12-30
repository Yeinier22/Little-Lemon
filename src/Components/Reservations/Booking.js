import calculateTableAssignment from "./Ocuppancy";

function bookings(people, hour, day) {
    const results = [];
  
    // Calcular la disponibilidad actual
    const currentAvailability = calculateTableAssignment(people, hour, day);

      results.push({
        isInsideAvailable: currentAvailability.isInsideAvailable,
        isOutsideAvailable: currentAvailability.isOutsideAvailable,
        people: people,
        hour: hour,
        day: day,
        percent:currentAvailability.percent,
        timeSlot:currentAvailability.timeSlot
      });
      const dateB = new Date(`2000-01-01 ${hour}`);


      // Horas antes y después solo si hay disponibilidad actual
      const hoursToCheck = [-60, -30, 30, 60]; // 30 minutos antes, 1 hora antes, 30 minutos después, 1 hora después
  
      for (const offset of hoursToCheck) {
        const horaDate = new Date(`2000-01-01 ${hour}`);

        horaDate.setMinutes(horaDate.getMinutes() + offset);
       
         
          const newHour = horaDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
     
          const newAvailability = calculateTableAssignment(people, newHour, day);

          if (horaDate.getHours() < 12 || horaDate.getHours() > 22){
            newAvailability.isInsideAvailable=false;
            newAvailability.isOutsideAvailable=false;
          }
   

          results.push({
            isInsideAvailable: newAvailability.isInsideAvailable,
            isOutsideAvailable: newAvailability.isOutsideAvailable,
            people: people,
            hour: newHour,
            day: day,
            percent:newAvailability.percent,
            timeSlot: newAvailability.timeSlot
          });
        
      }

results.sort((a, b) => {
    const dateA = new Date(`2000-01-01 ${a.hour}`);
    const dateB = new Date(`2000-01-01 ${b.hour}`);
    return dateA - dateB;
  });
    return results;
  }

  export default bookings;