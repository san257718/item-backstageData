import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

// 初始化 Express 和資料庫
dotenv.config();
connectDB();
const app = express();

// 中間件 (例如解析 JSON 或 CORS)
app.use(express.json());

// 生產環境強制 HTTPS
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// 你的其他 API 路由 (必須放在程式碼顯示路由之前!)
app.get("/api/total_number_of_products", (req, res) => {
  res.json({ message: "API 正常運作!" });
});

// 顯示程式碼的路由 (最後才處

// 兼容 Vercel (Serverless) 和本地開發
export default app;