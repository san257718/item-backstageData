import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  const token = req.cookies.token; // ✅ 從 cookie 取出
  
  if (!token) {
    return res.status(401).json({ message: '未授權，缺少 token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token 無效或過期' });
  }
};

export default protect;