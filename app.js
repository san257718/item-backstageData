import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares

app.use(cors({
  origin: 'http://localhost:3000', // 前端網址
  credentials: true               // ✅ 允許跨域傳送 cookie
}));

app.use(morgan('dev'));
app.use(json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);


// Error Handling
app.use(errorHandler);

export default app;
