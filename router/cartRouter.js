import express from "express";
import {
  addProductToCart,
  getCartDetails,
  removeProductFromCart,
  removeUserCart,
} from "../controller/cartController.js";
import { authToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", authToken, addProductToCart);
router.post("/remove", authToken, removeProductFromCart);
router.delete("/delete", authToken, removeUserCart);
router.get("/", authToken, getCartDetails);

export default router;
