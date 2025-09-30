import { pool } from '../db.js';
// time helpers not currently needed here; reservation times are passed already normalized (HH:mm)

const DEFAULT_DURATION = parseInt(process.env.RESERVATION_DURATION_MIN || '90',10);

export async function createReservation({ name, email, people, date, time, location, duration = DEFAULT_DURATION }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // We need to exclude tables whose existing reservations overlap the desired interval.
    // Overlap logic: existingStart < newEnd AND existingEnd > newStart
    const [tables] = await conn.execute(
      `SELECT t.id, t.seats
         FROM tables t
        WHERE t.location = ?
          AND t.seats >= ?
          AND NOT EXISTS (
            SELECT 1 FROM reservations r
             WHERE r.table_number = t.id
               AND r.date = ?
               AND (
                    r.time < ADDTIME(?, SEC_TO_TIME(?*60))
                AND ADDTIME(r.time, SEC_TO_TIME(r.duration_minutes*60)) > ?
               )
          )
        ORDER BY t.seats ASC
        LIMIT 1`,
        [location, people, date, time+':00', duration, time+':00']
    );
    if(tables.length===0){
      await conn.rollback();
      return { success:false, reason:'NO_TABLE_AVAILABLE' };
    }
    const tableId = tables[0].id;
    const [result] = await conn.execute(
      `INSERT INTO reservations (name,email,people,date,time,table_number,duration_minutes) VALUES (?,?,?,?,?,?,?)`,
      [name,email,people,date,time+':00',tableId,duration]
    );
    await conn.commit();
    return { success:true, id: result.insertId, table_number: tableId, duration_minutes: duration };
  } catch(err){
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function listReservations(date, location){
  let sql = `SELECT r.*, t.location, t.seats, t.label FROM reservations r JOIN tables t ON r.table_number = t.id WHERE r.date=?`;
  const params = [date];
  if(location){ sql += ' AND t.location=?'; params.push(location); }
  sql += ' ORDER BY r.time ASC';
  const [rows] = await pool.execute(sql, params);
  return rows;
}
