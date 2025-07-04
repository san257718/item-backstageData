import User from "../models/user.js";
import jwt from "jsonwebtoken";
// 取得全部使用者

const generateToken = (email, password) => {
  return jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
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
      secure: true, // 開發環境下為 false
      sameSite: "lax", // 開發環境下為 "none"
      maxAge: 10000, // 7 天
      path: "/",
    });

    res.json({
      message: "登入成功",
      id: user.id,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

//登出使用者

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // 開發環境下為 false
    sameSite: "lax", // 開發環境下為 "none"
  });
  res.json({ message: "登出成功" });
};
