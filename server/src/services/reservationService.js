import { pool } from '../db.js';
// time helpers not currently needed here; reservation times are passed already normalized (HH:mm)

export async function createReservation({ name, email, people, date, time, location }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // select candidate tables
    const [tables] = await conn.execute(
      `SELECT t.id, t.seats FROM tables t
        LEFT JOIN reservations r ON t.id = r.table_number AND r.date = ? AND r.time = ?
       WHERE t.seats >= ? AND t.location = ? AND r.id IS NULL
       ORDER BY t.seats ASC LIMIT 1`,
       [date, time+':00', people, location]
    );
    if(tables.length===0){
      await conn.rollback();
      return { success:false, reason:'NO_TABLE_AVAILABLE' };
    }
    const tableId = tables[0].id;
    const [result] = await conn.execute(
      `INSERT INTO reservations (name,email,people,date,time,table_number) VALUES (?,?,?,?,?,?)`,
      [name,email,people,date,time+':00',tableId]
    );
    await conn.commit();
    return { success:true, id: result.insertId, table_number: tableId };
  } catch(err){
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function listReservations(date){
  const [rows] = await pool.execute(`SELECT * FROM reservations WHERE date=? ORDER BY time ASC`,[date]);
  return rows;
}
