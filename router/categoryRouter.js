import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controller/categoryController.js";

import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add", upload.single("image"), addCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
