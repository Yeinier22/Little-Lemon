import { fetchAPI } from "./Ocuppancy";

async function bookings(people, hour, day) {
  const results = [];

  try {
    // Obtener la disponibilidad actual utilizando la API
    const currentAvailability = await fetchAPI({ people, date: day, hour });

    results.push({
      isInsideAvailable: currentAvailability.isInsideAvailable,
      isOutsideAvailable: currentAvailability.isOutsideAvailable,
      people: people,
      hour: hour,
      day: day,
      percent: currentAvailability.percent,
      timeSlot: currentAvailability.timeSlot
    });


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

      // Obtener la disponibilidad para cada hora utilizando la API
      const newAvailability = await fetchAPI({ people, date: day, hour: newHour });

      if (horaDate.getHours() < 12 || horaDate.getHours() > 22) {
        newAvailability.isInsideAvailable = false;
        newAvailability.isOutsideAvailable = false;
      }

      results.push({
        isInsideAvailable: newAvailability.isInsideAvailable,
        isOutsideAvailable: newAvailability.isOutsideAvailable,
        people: people,
        hour: newHour,
        day: day,
        percent: newAvailability.percent,
        timeSlot: newAvailability.timeSlot
      });
    }

    results.sort((a, b) => {
      const dateA = new Date(`2000-01-01 ${a.hour}`);
      const dateB = new Date(`2000-01-01 ${b.hour}`);
      return dateA - dateB;
    });

    return results;
  } catch (error) {
    console.error("Error fetching API in bookings:", error);
    return results; // O manejar el error según sea necesario
  }
}

export default bookings;