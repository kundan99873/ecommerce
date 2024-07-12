import express from "express";
import {
  cancelOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  getOrders,
  newOrder,
  updateOrder,
} from "../controller/orderController.js";
import { adminToken, authToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", authToken, newOrder);
router.get("/all", adminToken, getAllOrder);
router.get("/:id", authToken, getOrder);
router.get("/", authToken, getOrders);
router.delete("/delete/:id", adminToken, deleteOrder);
router.put("/update/:id", adminToken, updateOrder);
router.post("/cancel/:id", authToken, cancelOrder);

export default router;
