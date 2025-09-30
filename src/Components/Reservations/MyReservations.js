import React, { useEffect, useState } from 'react';
import { getReservations } from '../../storage/reservationStorage';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setReservations(getReservations());
  }, []);

  if (!reservations.length) {
    return <div style={{padding:'2rem'}}>No reservations stored locally yet.</div>;
  }

  return (
    <div style={{maxWidth: '800px', margin: '2rem auto', padding: '1rem 2rem'}}>
      <h2 style={{marginBottom:'1rem'}}>My Reservations (Local)</h2>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'2px solid #ccc'}}>
            <th style={{padding:'8px'}}>Date</th>
            <th style={{padding:'8px'}}>Time</th>
            <th style={{padding:'8px'}}>People</th>
            <th style={{padding:'8px'}}>Location</th>
            <th style={{padding:'8px'}}>Name</th>
            <th style={{padding:'8px'}}>Email</th>
            <th style={{padding:'8px'}}>Table</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r, i) => (
            <tr key={i} style={{borderBottom:'1px solid #eee'}}>
              <td style={{padding:'6px'}}>{r.date}</td>
              <td style={{padding:'6px'}}>{r.time}</td>
              <td style={{padding:'6px'}}>{r.people}</td>
              <td style={{padding:'6px'}}>{r.location}</td>
              <td style={{padding:'6px'}}>{r.name}</td>
              <td style={{padding:'6px'}}>{r.email}</td>
              <td style={{padding:'6px'}}>{r.tableId || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReservations;
