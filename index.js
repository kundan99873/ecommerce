import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import connection from "./config/dbconn.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import bannerRouter from "./router/bannerRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import cartRouter from "./router/cartRouter.js";
import addressRouter from "./router/addressRouter.js";
import paymentRouter from "./router/paymentRouter.js";
import wishlistRouter from "./router/wishlistRouter.js";
import errorMiddleware from "./middleware/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("tiny"));

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.static(path.resolve(__dirname, "front", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
  });

connection();

app.listen(3000, () => {
  console.log("connected to backend successfully...");
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/banner", bannerRouter);
app.use("/category", categoryRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/payment", paymentRouter);

app.all("*", (req, res) => {
  return res.status(404).send("OOPS!!! 404 Page Not Found");
});

app.use(errorMiddleware);
