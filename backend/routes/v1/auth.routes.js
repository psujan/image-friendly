import { Router } from "express";
import { register, login } from "../../controllers/auth.controller.js";
import { loginValidationRules } from "../../middleware/validations/authValidationRules.js";
import { validateRequest } from "../../middleware/validationErrorHandler.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", loginValidationRules, validateRequest, login);

export default authRouter;
