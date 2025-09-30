//import React, { useState } from "react";
import { useAvailable } from "./Context/availableContext";
import "./Reservations.css";
import { getAvailabilitySuggestions } from "../../api/reservations";
import { useState } from 'react';



const Available = ({ people, date, hour }) => {
  const { handleAvailabilityChange } = useAvailable();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculate = async () => {
    try {
      setLoading(true); setError(null);
      const peopleInt = parseInt(people.split(' ')[0],10);
      const suggestions = await getAvailabilitySuggestions({ date, time: hour, people: peopleInt });
      const mapped = suggestions.map(s => ({
        hour: s.hour,
        isInsideAvailable: s.isInsideAvailable,
        isOutsideAvailable: s.isOutsideAvailable,
        // keep compatibility fields used downstream
        people: people,
        day: date,
        insideTables: s.insideTables,
        outsideTables: s.outsideTables
      }));
      const base = mapped.find(m => m.hour === hour) || mapped[2] || mapped[0];
      const isTableAvailable = base ? (base.isInsideAvailable || base.isOutsideAvailable) : false;
      handleAvailabilityChange(isTableAvailable, mapped, true);
    } catch(err){
      console.error(err);
      setError('Error loading availability');
      handleAvailabilityChange(false, [], true);
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
