import { loginService, registerService } from "../services/auth.services.js";
import apiResponse from "../utils/response.js";

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
    return apiResponse.success(res, { token, user }, "Login Successful");
  } catch (err) {
    next(err);
  }
};

export { register, login };
