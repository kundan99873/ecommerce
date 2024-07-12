import express from "express";
import {
  addWishlist,
  getAllUserWishlist,
  getWishlist,
  removeWishlist,
} from "../controller/wishlistController.js";
import { authToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", authToken, addWishlist);
router.post("/remove", authToken, removeWishlist);
router.post("/:id", authToken, getWishlist);
router.get("/all", authToken, getAllUserWishlist);

export default router;
