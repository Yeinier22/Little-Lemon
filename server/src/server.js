import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import availabilityRoutes from './routes/availability.js';
import reservationRoutes from './routes/reservations.js';
import { pingDB } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req,res)=>{
  try {
    const ok = await pingDB();
    res.json({ status:'ok', db: ok });
  } catch(err){
    res.status(500).json({ status:'error', message: err.message });
  }
});

app.use('/api/availability', availabilityRoutes);
app.use('/api/reservations', reservationRoutes);

// Error handler
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({ error:'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
