import { loginService, registerService } from "../services/auth.services.js";
import apiResponse from "../utils/response.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const register = async (req, res, next) => {
  try {
    const user = await registerService(req);
    return apiResponse.success(res, user, "User Registered Successfully", 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { token, user } = await loginService(req);
    return apiResponse.success(
      res,
      {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          role: user.role,
          avatar: user.avatar,
        },
      },
      "Login Successful"
    );
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error("Token not valid");
    }
    const user = await User.find({ email: decoded.email });
    return apiResponse.success(
      res,
      user ? user[0] : null,
      "User Fetched Successfully"
    );
  } catch (err) {
    next(err);
  }
};

export { register, login };
