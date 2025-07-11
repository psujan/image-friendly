import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export { connectToMongoDb };
