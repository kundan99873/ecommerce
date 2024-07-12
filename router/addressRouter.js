import express from "express";
import { authToken } from "../middleware/auth.js";
import {
  addAddress,
  deleteAddress,
  getAddress,
  getAddressById,
  updateAddress,
} from "../controller/addressController.js";

const router = express.Router();

router.post("/add", authToken, addAddress);
router.get("/", authToken, getAddress);
router.get("/:id", authToken, getAddressById);
router.put("/update/:id", authToken, updateAddress);
router.delete("/delete/:id", authToken, deleteAddress);

export default router;
