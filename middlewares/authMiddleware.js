// middleware/protect.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // 假設你的 User model 在這個路徑

const protect = async (req, res, next) => {
  let token;

  console.log('--- Inside protect middleware ---'); // 新增日誌
  console.log('Received req.cookies:', req.cookies); // 新增日誌：檢查是否收到任何 cookie

  // 1. 從 cookies 中獲取 token
  if (req.cookies && req.cookies.token) { // 確保 req.cookies 存在
    token = req.cookies.token;
    console.log('Token found in cookies:', token); // 新增日誌：如果找到 token 打印它
  } else {
    console.log('No "token" cookie found in req.cookies.'); // 新增日誌：如果沒找到 token
  }

  // 2. 如果沒有 token，返回 401
  if (!token) {
    console.log('No token for authentication. Sending 401.'); // 新增日誌
    return res.status(401).json({ message: '未授權，沒有Token' });
  }

  try {
    // 3. 驗證 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded); // 新增日誌

    // 4. 查找使用者 (可選，但推薦用於授權檢查)
    req.user = await User.findOne({ email: decoded.email }).select('-password');

    // 5. 如果找不到使用者，返回 401
    if (!req.user) {
      console.log('User not found for decoded token. Sending 401.'); // 新增日誌
      return res.status(401).json({ message: '未授權，使用者不存在' });
    }
    console.log('User authenticated:', req.user.email); // 新增日誌

    next(); // 繼續處理請求
  } catch (error) {
    // 這裡會捕獲 jwt.verify 失敗的情況 (例如 Token 過期、無效簽名)
    console.error('Token verification failed or other error in protect:', error.message); // 新增日誌
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '未授權，Token已過期' });
    }
    return res.status(401).json({ message: '未授權，Token無效' });
  }
};

export default protect;