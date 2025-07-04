import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  try {
    // 從 cookie 中取得 token
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "未提供認證令牌" });
    }

    // 驗證 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 根據 token 中的 email 查找用戶
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({ message: "用戶不存在" });
    }

    // 將用戶資訊添加到 req 物件中
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "無效的認證令牌" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "認證令牌已過期" });
    }
    return res.status(500).json({ message: "伺服器錯誤" });
  }
};

export default protect;
