import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import { uploadPresentationImages } from "../../controllers/gallery.controller.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { downloadPresentation } from "../../controllers/presentation.controller.js";

const galleryRouter = Router();

galleryRouter.post(
  "/presentation-images",
  authenticate,
  upload.array("images", 10),
  uploadPresentationImages
);

galleryRouter.get("/ppt/:galleryId", authenticate, downloadPresentation)


export default galleryRouter;
