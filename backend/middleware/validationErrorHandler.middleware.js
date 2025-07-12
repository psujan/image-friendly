import { validationResult } from "express-validator";
import apiResponse from "../utils/response.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  const groupedErrors = {};
  errors.array().forEach((err) => {
    if (!groupedErrors[err.path]) {
      groupedErrors[err.path] = [];
    }
    groupedErrors[err.path].push(err.msg);
  });
  if (!errors.isEmpty()) {
    return apiResponse.error(res, "Validation Failed", 500, {
      errorType: "VAlIDATION_ERROR",
      error: groupedErrors,
    });
  }

  next();
};

export { validateRequest };
