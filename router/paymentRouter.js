import express from "express";
const router = express.Router();
import { payment } from "../controller/paymentController.js";

router.post("/create", payment);

export default router;
