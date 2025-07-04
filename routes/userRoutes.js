import { Router } from "express";
import {
  getUsers,
  createUser,
  login,
  logout,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, getUsers);
router.post("/", protect, createUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
