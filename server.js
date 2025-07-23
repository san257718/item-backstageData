import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const SERVER_PORT = process.env.PORT || 5000;

// 根據環境動態設定 CORS 和 Cookie 選項
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // 生產環境：強制使用 HTTPS、嚴格安全標頭
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

app.listen(SERVER_PORT, () => {
  console.log(`✅ Server running on port ${SERVER_PORT} in ${isProduction ? "production" : "development"} mode`);
  
  // 開發環境專用日誌（例如資料庫連線字串遮罩）
  if (!isProduction) {
    console.log("🔧 Debug mode enabled");
    console.log(`🔗 Local API: http://localhost:${SERVER_PORT}`);
  }
});