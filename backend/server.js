import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});