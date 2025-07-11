import multer from "multer";
import apiResponse from "../utils/response.js";

const errorMiddleware = (err, req, res, next) => {
  try {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errorType = "INTERNAL_ERROR"; // default
    let extra = {};

    console.error("Captured error:", err);

    // 🔍 Mongoose CastError (invalid ObjectId)
    if (err.name === "CastError") {
      statusCode = 404;
      message = "Resource not found";
      errorType = "RESOURCE_NOT_FOUND";
    }

    // 🔍 Duplicate key (unique fields)
    if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
      errorType = "DUPLICATE_FIELD";
    }

    // 🔍 Mongoose validation error
    if (err.name === "ValidationError") {
      statusCode = 400;
      const messages = Object.values(err.errors).map((val) => val.message);
      message = messages.join(", ");
      errorType = "VALIDATION_ERROR";
    }

    // 🔍 Multer file error
    if (err instanceof multer.MulterError) {
      statusCode = 400;
      message = err.message;
      errorType = "FILE_UPLOAD_ERROR";
    }

    // Optional: custom application-defined errorType
    if (err.errorType) {
      errorType = err.errorType;
    }

    return apiResponse.error(res, message, statusCode, {
      errorType,
      error: err,
    });
  } catch (internalError) {
    return apiResponse.error(res, "Something went wrong", 500, {
      errorType: "INTERNAL_ERROR",
      error: internalError,
    });
  }
};

export default errorMiddleware;
