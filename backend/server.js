import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js'

connectDB();

const app = express();
app.use(cors({
    origin: 'https://shopzy-e-commerce-website.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());

//test route
app.get('/api/test',(req, res)=>{
    res.send('API is working!');
});

//auth route
app.use('/api/auth', authRoutes);

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});