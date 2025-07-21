import { Router } from "express";
import {
  getUsers,
  createUser,
  login,
  logout,
} from "../controllers/userController.js";
import {
  getTotalNumberOfProducts,
  getOrderPrices,
} from "../controllers/useDashboard.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, getUsers);
router.get("/total_number_of_products", protect, getTotalNumberOfProducts); // ✅ 修正
router.get("/order_price", protect, getOrderPrices); // ✅ 修正
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", logout);


export default router;
