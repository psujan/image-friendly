import apiResponse from "../utils/response.js";
import { createGalleryWithImages } from "../services/gallery.service.js";

const createGallery = () => {};

const uploadPresentationImages = async (req, res, next) => {
  // create default named gallery from request
  // upload images and save it to gallery image
  //return gallery
  try {
    const uploadedImages = req.files;
    console.log(uploadedImages)
    if (!uploadedImages || uploadedImages.length === 0) {
      return apiResponse.error(res, "No Images Uploaded", 400, {
        errorType: "VALIDATION_ERROR",
        error: null,
      });
    }
    console.log(req.user)
    const result = await createGalleryWithImages(req.user, uploadedImages);
    return apiResponse.success(res, "Gallery and images uploaded", result);
  } catch (err) {
    next(err);
  }
};

const uploadGalleryImages = async (req, res, next) => {};

export { createGallery, uploadPresentationImages };
