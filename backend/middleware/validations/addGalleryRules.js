// validations/auth.validation.js
import { body } from "express-validator";
import Gallery from "../../models/gallery.model.js";
import { MAX_GALLERY_COUNT } from "../../controllers/gallery.controller.js";

export const addGalleryRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .custom(async (_, { req }) => {
      console.log("HIII", req.user.id)
      const userId = req.user?.id;
      if (!userId) throw new Error("Unauthorized");

      const galleryCount = await Gallery.countDocuments({ userId });
      console.log(galleryCount)

      if (galleryCount >= MAX_GALLERY_COUNT) {
        console.log("yes");
        throw new Error("You can only create up to 3 galleries");
      }

      return true;
    }),
];
