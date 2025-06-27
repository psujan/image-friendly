import { Router } from "express";
import imageRouter from "./image.routes.js";

const v1Router = Router();
v1Router.use("/image", imageRouter);

export default v1Router;
