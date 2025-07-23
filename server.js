import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const SERVER_PORT = process.env.PORT || 5000;

// const PROT = process.env.NODE_ENV_DEV;

app.listen(SERVER_PORT, () => {
  // 使用修正後的 SERVER_PORT
  console.log(`✅ Server running on port ${SERVER_PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  // 如果你希望在後端日誌中顯示生產環境的 API URL，可以額外打印：
  // if (process.env.NODE_ENV === 'production') {
  //   console.log(`🚀 Production API URL: ${process.env.PROD_API_KEY}`);
  // }
});
