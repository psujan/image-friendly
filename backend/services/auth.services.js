import User from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

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

const loginService = async (req) => {
  try {
    const user = req.user;
    user.password = undefined; // exclude password in response
    // prepare roles
    const roles = user.role;
    // generate JWT Token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, roles: roles },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      user,
      token,
    };
    return;
  } catch (err) {
    throw err;
  }
};

export { registerService, loginService };
