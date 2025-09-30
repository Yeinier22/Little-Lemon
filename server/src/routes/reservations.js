import { Router } from 'express';
import { createReservation, listReservations } from '../services/reservationService.js';

function validateDate(date){ return /^\d{4}-\d{2}-\d{2}$/.test(date); }
function validateTime(time){ return /^\d{2}:\d{2}$/.test(time) && ['00','30'].includes(time.split(':')[1]); }
function validateEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validateName(name){ return /^[A-Za-zÁÉÍÓÚÜÑ'\- ]{2,100}$/.test(name); }

function validateFutureDate(date){
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(date+'T00:00:00');
  if(target < today) return false;
  const diffDays = (target - today)/(1000*60*60*24);
  return diffDays <= 90;
}

function validateBody(req,res,next){
  const errors = [];
  const { name, email, people, date, time, location, duration_minutes } = req.body;
  if(!name || !validateName(name)) errors.push({field:'name', message:'Invalid name'});
  if(!email || !validateEmail(email)) errors.push({field:'email', message:'Invalid email'});
  const p = Number(people);
  if(!p || p<1 || p>20) errors.push({field:'people', message:'People must be 1-20'});
  if(!date || !validateDate(date) || !validateFutureDate(date)) errors.push({field:'date', message:'Invalid date range'});
  if(!time || !validateTime(time)) errors.push({field:'time', message:'Time must be HH:MM 30-min increments'});
  if(!['inside','outside'].includes(location)) errors.push({field:'location', message:'Location invalid'});
  if(duration_minutes !== undefined){
    const d = Number(duration_minutes);
    if(!d || d<30 || d>240) errors.push({field:'duration_minutes', message:'Duration 30-240'});
  }
  if(errors.length) return res.status(422).json({ errors });
  next();
}

const router = Router();

router.get('/', async (req,res,next)=>{
  try {
    const { date, location } = req.query;
    if(!date || !validateDate(date)) return res.status(400).json({error:'Invalid or missing date'});
    const rows = await listReservations(date, location);
    res.json(rows);
  } catch(err){ next(err); }
});

router.post('/', validateBody, async (req,res,next)=>{
  try {
    const { name, email, people, date, time, location, duration_minutes } = req.body;
    const result = await createReservation({ name, email, people:Number(people), date, time, location, duration: duration_minutes });
    if(!result.success) return res.status(409).json(result);
    res.status(201).json(result);
  } catch(err){ next(err); }
});

export default router;
