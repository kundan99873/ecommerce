import express from "express";
import { adminToken } from "../middleware/auth.js";
import {
  addBanner,
  deleteBanner,
  getAllBanner,
  getBanner,
  updateBanner,
} from "../controller/bannerController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add", upload.single("image"), addBanner);
router.get("/", getAllBanner);
router.get("/:id", adminToken, getBanner);
router.put("/update/:id", adminToken, updateBanner);
router.delete("/delete/:id", adminToken, deleteBanner);

export default router;
