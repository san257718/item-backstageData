import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// 中间件和其他路由配置
// app.use(...);

// 根据环境动态设置
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // 生产环境：强制使用 HTTPS、严格安全标头
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// 示例路由
app.get("/", (req, res) => {
  res.send(`
    <h1>Express 服务器运行中</h1>
    <h2>当前代码：</h2>
    <pre>${escapeHtml(`
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const SERVER_PORT = process.env.PORT || 5000;

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(\`https://\${req.headers.host}\${req.url}\`);
    }
    next();
  });
}

app.listen(SERVER_PORT, () => {
  console.log(\`✅ Server running on port \${SERVER_PORT} in \${isProduction ? "production" : "development"} mode\`);
  
  if (!isProduction) {
    console.log("🔧 Debug mode enabled");
    console.log(\`🔗 Local API: http://localhost:\${SERVER_PORT}\`);
  }
});`)}</pre>
  `);
});

// 用于Vercel Serverless的导出
export default app;

// 本地开发时直接启动服务器
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ 本地服务器运行在端口 ${PORT}`);
  });
}

// 简单的HTML转义函数
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}