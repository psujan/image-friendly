import { Router } from "express";
import {uploadImage} from "../../controllers/image.controller.js";
import upload from "../../middleware/multer.middleware.js"

const imageRouter = Router();

imageRouter.post("/resize", (req, res) => {
  res.status(201).json({
    data: null,
    success: true,
    message: "Image Resized Successfully",
  });
});

imageRouter.post("/upload", upload.single("image"), uploadImage)


export default imageRouter;
