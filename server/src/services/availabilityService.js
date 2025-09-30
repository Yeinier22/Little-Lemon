import { pool } from '../db.js';
import { addMinutes, isBefore, isAfter, parse, format } from './time.js';

let HAS_DURATION_COLUMN = true;
// One-time detection of duration_minutes column
(async () => {
  try {
    const [rows] = await pool.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='reservations' AND COLUMN_NAME='duration_minutes' LIMIT 1`);
    if(rows.length === 0) {
      HAS_DURATION_COLUMN = false;
      console.warn('[availabilityService] duration_minutes column not found. Falling back to legacy availability logic (exact slot match). Consider running migration: ALTER TABLE reservations ADD COLUMN duration_minutes INT NOT NULL DEFAULT 90 AFTER table_number;');
    }
  } catch(err){
    console.error('[availabilityService] schema detection failed:', err.message);
  }
})();

const DEFAULT_DURATION = parseInt(process.env.RESERVATION_DURATION_MIN || '90',10);

const OPEN_TIME = '12:00';
const CLOSE_TIME = '22:00';

function toDisplay(hhmm) {
  const date = parse(hhmm);
  return format(date, 'h:mm a');
}

export async function findAvailability({ date, time, people, duration = DEFAULT_DURATION }) {
  let rows;
  if(HAS_DURATION_COLUMN){
    // Overlap-aware query
    [rows] = await pool.execute(
      `SELECT t.id, t.seats, t.location
         FROM tables t
        WHERE t.seats >= ?
          AND NOT EXISTS (
            SELECT 1 FROM reservations r
             WHERE r.table_number = t.id
               AND r.date = ?
               AND (
                    r.time < ADDTIME(?, SEC_TO_TIME(?*60))
                AND ADDTIME(r.time, SEC_TO_TIME(r.duration_minutes*60)) > ?
               )
          )
        ORDER BY t.seats ASC`,
      [people, date, time+':00', duration, time+':00']
    );
  } else {
    // Legacy exact-slot logic fallback
    [rows] = await pool.execute(
      `SELECT t.id, t.seats, t.location
         FROM tables t
    LEFT JOIN reservations r
           ON t.id = r.table_number
          AND r.date = ?
          AND r.time = ?
        WHERE t.seats >= ?
          AND r.id IS NULL
        ORDER BY t.seats ASC`,
      [date, time+':00', people]
    );
  }

  const inside = rows.filter(r => r.location === 'inside');
  const outside = rows.filter(r => r.location === 'outside');
  return {
    hour: toDisplay(time),
    isInsideAvailable: inside.length > 0,
    isOutsideAvailable: outside.length > 0,
    insideTables: inside,
    outsideTables: outside
  };
}

export async function findAvailabilitySuggestions({ date, time, people, duration = DEFAULT_DURATION }) {
  // offsets in minutes relative to base time (sorted final)
  const offsets = [-60, -30, 0, 30, 60];
  const baseDate = parse(time);
  const slots = await Promise.all(offsets.map(async off => {
    const candidate = addMinutes(baseDate, off);
    if (isBefore(candidate, parse(OPEN_TIME)) || isAfter(candidate, parse(CLOSE_TIME))) return null;
    const hhmm = format(candidate, 'HH:mm');
    return findAvailability({ date, time: hhmm, people, duration });
  }));
  return slots.filter(Boolean).sort((a,b) => parse(a.hour) - parse(b.hour));
}
