import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  const token = req.cookies.token; // ✅ 從 cookie 取出
  
    if (!token) {
      return res.status(401).json({ message: '未提供認證令牌' });
    }

    console.log(token);
    

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Token 無效或過期' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token 無效或過期' });
  } 
};

export default protect;