import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

// 🔥 重要：必須先設定 CORS，再設定路由
app.use(
  cors({
    origin: ["https://item-backstage.vercel.app", "http://localhost:3000", 'https://item-frontend.vercel.app'], // 🔥 允許發送 credentials (cookies)
    credentials: true, // 🔥 允許發送 credentials (cookies)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"], // 允許前端讀取 set-cookie header
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(json());

// Routes
app.use("/api/", userRoutes);

// Error Handling
app.use(errorHandler);

export default app;
