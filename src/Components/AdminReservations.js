import { useEffect, useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001/api';

export default function AdminReservations(){
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async ()=>{
    try {
      setLoading(true); setError(null);
      const ymd = date.toISOString().slice(0,10);
      const locParam = location?`&location=${location}`:'';
      const res = await fetch(`${API_BASE}/reservations?date=${ymd}${locParam}`);
      if(!res.ok) throw new Error('Error fetching reservations');
      const json = await res.json();
      setData(json);
    } catch(err){
      setError(err.message);
    } finally { setLoading(false); }
  }, [date, location]);

  useEffect(()=>{ load(); }, [load]);

  return (
    <div className="background-reservation-container" style={{paddingTop: '140px'}}>
      <div className="reservation-container" style={{maxWidth:'1100px'}}>
        <div className="title-reservation"><h2>Admin Reservations</h2></div>
        <div style={{display:'flex', gap:'18px', flexWrap:'wrap', alignItems:'center'}}>
          <div>
            <label style={{fontSize:'.75rem', fontWeight:600, display:'block', marginBottom:4}}>Date</label>
            <DatePicker selected={date} onChange={setDate} className="selector" />
          </div>
          <div>
            <label style={{fontSize:'.75rem', fontWeight:600, display:'block', marginBottom:4}}>Location</label>
            <select className="selector" value={location} onChange={e=>setLocation(e.target.value)}>
              <option value="">All</option>
              <option value="inside">Inside</option>
              <option value="outside">Outside</option>
            </select>
          </div>
          <button className="selector available" style={{width:'180px'}} onClick={load} disabled={loading}>{loading? 'Loading...' : 'Refresh'}</button>
        </div>
        {error && <div style={{color:'#b50d27', marginTop:'12px'}}>{error}</div>}
        <div style={{overflowX:'auto', marginTop:'28px'}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:'.85rem'}}>
            <thead>
              <tr style={{background:'#faf8f6'}}>
                <th style={th}>Time</th>
                <th style={th}>Table</th>
                <th style={th}>Location</th>
                <th style={th}>Seats</th>
                <th style={th}>People</th>
                <th style={th}>Duration</th>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Created</th>
              </tr>
            </thead>
            <tbody>
              {data.length===0 && (
                <tr><td colSpan={9} style={{padding:'18px', textAlign:'center', color:'#6b5d57'}}>No reservations</td></tr>
              )}
              {data.map(r => (
                <tr key={r.id}>
                  <td style={td}>{r.time.slice(0,5)}</td>
                  <td style={td}>{r.table_number}{r.label?` (${r.label})`:''}</td>
                  <td style={td}>{r.location}</td>
                  <td style={td}>{r.seats}</td>
                  <td style={td}>{r.people}</td>
                  <td style={td}>{r.duration_minutes}m</td>
                  <td style={td}>{r.name}</td>
                  <td style={td}>{r.email}</td>
                  <td style={td}>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = { padding:'10px 12px', textAlign:'left', borderBottom:'1px solid #e7e2dd', fontWeight:600, color:'#3a241f'};
const td = { padding:'8px 10px', borderBottom:'1px solid #efe9e5', color:'#3a241f'};
