import express from "express";
import {
  allUserDetail,
  changePassword,
  forgotPassword,
  forgotPasswordToken,
  forgotUserPassword,
  getUserDetail,
  login,
  logout,
  refreshToken,
  register,
  updateUser,
  userDetail,
  verify,
} from "../controller/userController.js";
import upload from "../middleware/multer.js";
import { adminToken, authToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/logout", authToken, logout);
router.post("/token", refreshToken);
router.get("/:id/forgot/:token", forgotPasswordToken);
router.post("/:id/forgot/:token", forgotUserPassword);
router.post("/forgot", forgotPassword);
router.post("/change", authToken, changePassword);
router.get("/:id/verify/:token", verify);
router.get("/detail/:id", userDetail);
router.get("/all", adminToken, allUserDetail);
router.post("/info", authToken, getUserDetail);
router.put("/update", upload.single("image"), authToken, updateUser);

export default router;
