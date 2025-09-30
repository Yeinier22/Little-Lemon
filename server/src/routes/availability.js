import { Router } from 'express';
import { findAvailability, findAvailabilitySuggestions } from '../services/availabilityService.js';

const router = Router();

function validateQuery(req,res,next){
  const { date, time, people } = req.query;
  if(!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({error:'Invalid or missing date'});
  if(!time || !/^\d{2}:\d{2}$/.test(time)) return res.status(400).json({error:'Invalid or missing time (HH:MM)'});
  const p = Number(people);
  if(!p || p<1) return res.status(400).json({error:'Invalid people'});
  req.q = { date, time, people:p };
  next();
}

router.get('/', validateQuery, async (req,res,next)=>{
  try {
    const result = await findAvailability(req.q);
    res.json(result);
  } catch(err){ next(err); }
});

router.get('/suggestions', validateQuery, async (req,res,next)=>{
  try {
    const result = await findAvailabilitySuggestions(req.q);
    res.json(result);
  } catch(err){ next(err); }
});

export default router;
