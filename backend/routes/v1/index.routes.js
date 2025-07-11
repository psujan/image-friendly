import { Router } from "express";
import imageRouter from "./image.routes.js";
import authRouter from "./auth.routes.js";

const v1Router = Router();
v1Router.use("/image", imageRouter);
v1Router.use("/auth", authRouter);

export default v1Router;
