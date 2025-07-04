// api/index.js
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import connectDB from '../config/db.js';
import app from '../app.js';

dotenv.config();
connectDB(); // ⚠️ 確保資料庫在部署時已連線

export const handler = serverless(app);
