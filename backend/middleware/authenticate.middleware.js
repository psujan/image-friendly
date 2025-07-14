import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Should contain { id, email, roles, ... }
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Authentication Failed" });
  }
};

export default authenticate;
