//import React, { useState } from "react";
import { useAvailable } from "./Context/availableContext";
import "./Reservations.css";
import { getAvailabilitySuggestions } from "../../api/reservations";
import { useState } from 'react';
import { findAvailableTables } from '../../storage/reservationStorage';
import { tables } from '../../storage/tables';



const Available = ({ people, date, hour }) => {
  const { handleAvailabilityChange } = useAvailable();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildLocalSuggestionSet = (peopleInt) => {
    // mimic 5 suggestion slots: current selected hour ± next two / previous two where possible
    // For simplicity we just replicate the chosen hour across list with different placeholder hours from UI context (not perfect but adequate for demo)
    const baseHour = hour; // display hour string already
    const list = [baseHour];
    // we won't recompute adjacent times here; generateHours already drives hour choices; fallback list repeats base hour
    const availableTables = findAvailableTables(date, baseHour, peopleInt, tables);
    const insideAvailable = availableTables.some(t => t.location.toLowerCase() !== 'terrace');
    const outsideAvailable = availableTables.some(t => t.location.toLowerCase() === 'terrace');
    return list.map(h => ({
      hour: h,
      isInsideAvailable: insideAvailable,
      isOutsideAvailable: outsideAvailable,
      people: people,
      day: date,
      insideTables: availableTables.filter(t => t.location.toLowerCase() !== 'terrace').map(t => t.id),
      outsideTables: availableTables.filter(t => t.location.toLowerCase() === 'terrace').map(t => t.id)
    }));
  };

  const calculate = async () => {
    const peopleInt = parseInt(people.split(' ')[0],10);
    setLoading(true); setError(null);
    try {
      const suggestions = await getAvailabilitySuggestions({ date, time: hour, people: peopleInt });
      const mapped = suggestions.map(s => ({
        hour: s.hour,
        isInsideAvailable: s.isInsideAvailable,
        isOutsideAvailable: s.isOutsideAvailable,
        people: people,
        day: date,
        insideTables: s.insideTables,
        outsideTables: s.outsideTables
      }));
      const base = mapped.find(m => m.hour === hour) || mapped[2] || mapped[0];
      const isTableAvailable = base ? (base.isInsideAvailable || base.isOutsideAvailable) : false;
      handleAvailabilityChange(isTableAvailable, mapped, true);
    } catch(err){
      console.warn('Backend availability failed, falling back to localStorage mode', err);
      const fallback = buildLocalSuggestionSet(peopleInt);
      const base = fallback[0];
      const isTableAvailable = base.isInsideAvailable || base.isOutsideAvailable;
      handleAvailabilityChange(isTableAvailable, fallback, true);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="selector-container selector-with-icon icon-available">
      <button className={"selector available"} type="button" onClick={calculate} disabled={loading}>
        {loading ? 'Loading...' : 'Find a table'}
      </button>
      {error && <span style={{display:'block', marginTop:6, color:'#b50d27', fontSize:'0.7rem'}}>{error}</span>}
    </div>
  );
};

export default Available;
