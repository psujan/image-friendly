import { Router } from "express";
import { register, login , getUser} from "../../controllers/auth.controller.js";
import { loginValidationRules } from "../../middleware/validations/authValidationRules.js";
import { validateRequest } from "../../middleware/validationErrorHandler.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", loginValidationRules, validateRequest, login);
authRouter.get("/user/:token", getUser )

export default authRouter;
