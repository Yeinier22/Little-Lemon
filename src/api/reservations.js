const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001/api';

function to24Hour(display){
  // '2:30 PM' -> '14:30'
  const [time,ampm] = display.split(' ');
  let [h,m] = time.split(':').map(Number);
  if(ampm.toUpperCase()==='PM' && h!==12) h+=12;
  if(ampm.toUpperCase()==='AM' && h===12) h=0;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
}

export async function getAvailabilitySuggestions({ date, time, people }) {
  const t = to24Hour(time);
  const ymd = date.toISOString().slice(0,10);
  const url = `${API_BASE}/availability/suggestions?date=${ymd}&time=${t}&people=${people}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Failed availability');
  return res.json();
}

export async function createReservation({ name,email,people,date,time,location }) {
  const payload = { name,email,people,location, date: date.toISOString().slice(0,10), time: to24Hour(time) };
  const res = await fetch(`${API_BASE}/reservations`,{
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
  });
  if(!res.ok){
    const err = await res.json().catch(()=>({}));
    throw new Error(err.reason || err.error || 'Reservation failed');
  }
  return res.json();
}

export { to24Hour };
