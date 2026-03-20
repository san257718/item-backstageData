import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"; // 確保你有 import helmet
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// 1. 基礎解析與紀錄
app.use(morgan("dev"));
app.use(json());
app.use(cookieParser());

// 2. 安全性設定 (必須放在路由之前)
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true, // 建議開啟基礎預設，再手動覆蓋
      directives: {
        "default-src": ["'self'"],
        "connect-src": [
          "'self'", 
          "https://item-backstage.vercel.app", 
          "https://item-frontend.vercel.app",
          "http://localhost:3000"
        ],
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"], // 增加圖片權限避免報錯
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" } // 解決跨域資源讀取問題
  })
);

// 3. CORS 設定
app.use(
  cors({
    origin: ["https://item-backstage.vercel.app", "http://localhost:3000", "https://item-frontend.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// 4. 路由設定
app.use("/api/", userRoutes);

// 5. 錯誤處理 (通常放在最後)
app.use(errorHandler);

export default app;