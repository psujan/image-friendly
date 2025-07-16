import apiResponse from "../utils/response.js";
import {
  createGalleryWithImages,
  createGallery,
  getGalleryList,
} from "../services/gallery.service.js";

const addGallery = async (req, res, next) => {
  try {
    console.log(req.body);
    const gallery = await createGallery(req.user, req.body.title);
    return apiResponse.success(res, gallery, "Gallery Added Successfully");
  } catch (err) {
    next(err);
  }
};

const getGallery = async (req, res, next) => {
  try {
    const galleryList = await getGalleryList(req.user);
    return apiResponse.success(res, galleryList, "Gallery Fetched Successfully");
  } catch (err) {
    next(err);
  }
};

const uploadPresentationImages = async (req, res, next) => {
  // create default named gallery from request
  // upload images and save it to gallery image
  //return gallery
  try {
    const uploadedImages = req.files;
    console.log(uploadedImages);
    if (!uploadedImages || uploadedImages.length === 0) {
      return apiResponse.error(res, "No Images Uploaded", 400, {
        errorType: "VALIDATION_ERROR",
        error: null,
      });
    }
    const result = await createGalleryWithImages(req.user, uploadedImages);
    return apiResponse.success(res, "Gallery and images uploaded", result);
  } catch (err) {
    next(err);
  }
};

const uploadGalleryImages = async (req, res, next) => {};

export { addGallery, getGallery, uploadPresentationImages };
