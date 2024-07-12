import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getAllProducts,
  getPaginatedProducts,
  getProduct,
  getProductById,
  getProductVarients,
  rateProduct,
  reviewProduct,
  updateProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";
import { adminToken, authToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/get", getAllProduct);
router.get("/get/:id", getProduct);
router.get("/paginate", getPaginatedProducts);
router.get("/:id", getProductVarients);
router.get("/user/:id", getProductById);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", upload.single("image"), updateProduct);
router.post("/review/:id", authToken, reviewProduct);
router.post("/rating/:id", authToken, rateProduct);

export default router;
