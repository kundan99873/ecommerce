import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect.connect) {
      console.log("connected to mongoose successfully");
    } else {
      console.log("connection error");
      process.exit(1);
    }
  } catch (error) {
    console.log("connection error", error.message);
  }
};

export default connection;
