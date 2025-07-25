import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import {
  addGallery,
  getGallery,
  getGalleryImages,
  uploadGalleryImages,
} from "../../controllers/gallery.controller.js";
import authenticate from "../../middleware/authenticate.middleware.js";
import { downloadPresentation } from "../../controllers/presentation.controller.js";

const galleryRouter = Router();

galleryRouter.post("/gallery", authenticate, addGallery);
galleryRouter.get("/gallery-user/", authenticate, getGallery);
galleryRouter.post("/ppt/:galleryId", authenticate, downloadPresentation);
galleryRouter.get("/gallery/:id/images", authenticate, getGalleryImages);
galleryRouter.post(
  "/gallery/:id/images",
  authenticate,
  upload.array("images", 10),
  uploadGalleryImages
);

export default galleryRouter;
