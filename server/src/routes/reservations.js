import { Router } from 'express';
import { createReservation, listReservations } from '../services/reservationService.js';

const router = Router();

router.get('/', async (req,res,next)=>{
  try {
    const { date } = req.query;
    if(!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({error:'Invalid or missing date'});
    const rows = await listReservations(date);
    res.json(rows);
  } catch(err){ next(err); }
});

router.post('/', async (req,res,next)=>{
  try {
    const { name, email, people, date, time, location } = req.body;
    if(!name || !email || !people || !date || !time || !location) return res.status(400).json({error:'Missing fields'});
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({error:'Bad date'});
    if(!/^\d{2}:\d{2}$/.test(time)) return res.status(400).json({error:'Bad time'});
    const p = Number(people);
    if(!p || p<1) return res.status(400).json({error:'Bad people'});
    if(!['inside','outside'].includes(location)) return res.status(400).json({error:'Bad location'});

    const result = await createReservation({ name, email, people:p, date, time, location });
    if(!result.success) return res.status(409).json(result);
    res.status(201).json(result);
  } catch(err){ next(err); }
});

export default router;
