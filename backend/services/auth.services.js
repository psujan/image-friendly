import User from "../models/user.model.js";
import mongoose from "mongoose";

const registerService = async (req) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const hasSameEmail = await User.emailExists(email);
    if (hasSameEmail) {
      const error = new Error("Email already taken");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create([{ name, email, password }], session);
    await session.commitTransaction();
    return user[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export { registerService };
