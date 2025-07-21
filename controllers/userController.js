import User from "../models/user.js";
import jwt from "jsonwebtoken";
// 取得全部使用者

const generateToken = (email, password) => {
  return jwt.sign(
    { email: email, password: password },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d", // Token 本身的過期時間
    }
  );
};

export async function getUsers(req, res, next) {
  try {
    const users = await User.find().select("-password"); // 避免回傳密碼
    res.json(users);
  } catch (error) {
    next(error);
  }
}

// 新增使用者
export async function createUser(req, res, next) {
  const { password, email } = req.body;

  try {
    const user = await User.create({ password, email });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

//登入使用者
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }

    const token = generateToken(user.email, user.password);

    // // ✅ 設定 httpOnly Cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "development" ? false : true,
      // sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true, // 生產環境使用 false

      // ⚡️ 關鍵修正 2: SameSite 屬性
      // 'None' 允許跨站點發送 Cookie。
      // 但如果 SameSite 是 'None'，則 `secure: true` 是強制要求。
      // 適用於前端和後端部署在不同域名 (即使是同一個 Vercel 帳號下的不同專案也算不同域名)。
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None", // 生產環境使用 'None'
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天
      path: "/",
    });

    console.log(process.env.NODE_ENV);
    

    res.json({
      message: "登入成功",
      // id: user.id,
      // token: token,
    });
  } catch (error) {
    next(error);
  }
};

//登出使用者

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? true : false,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });

  res.json({ message: "登出成功" });
};
