// validations/auth.validation.js
import { body } from "express-validator";
import User from "../../models/user.model.js";

export const loginValidationRules = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")

    .custom(async (password, { req }) => {
      const user = await User.findOne({ email: req.body.email }).select(
        "+password"
      );

      if (!user) {
        throw new Error("Invalid username or password");
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("Invalid username or password");
      }

      // Attach user to request for use in controller/service
      req.user = user;
    }),
];
