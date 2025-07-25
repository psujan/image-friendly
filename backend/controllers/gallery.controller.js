import apiResponse from "../utils/response.js";
import {
  createGallery,
  getGalleryList,
  getGalleryImagesList,
  addImagesToGallery,
  getGalleryById,
  _deleteGallery,
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
    return apiResponse.success(
      res,
      galleryList,
      "Gallery Fetched Successfully"
    );
  } catch (err) {
    next(err);
  }
};

const getGalleryImages = async (req, res, next) => {
  try {
    const gallery = await getGalleryById(req.params.id);
    const galleryImages = await getGalleryImagesList(req.params.id);
    return apiResponse.success(
      res,
      { galleryImages, gallery },
      "Gallery Images Fetched Successfully"
    );
  } catch (err) {
    next(err);
  }
};

const uploadGalleryImages = async (req, res, next) => {
  try {
    const uploadedImages = req.files;
    if (!uploadedImages || uploadedImages.length === 0) {
      return apiResponse.error(res, "No Images Uploaded", 400, {
        errorType: "VALIDATION_ERROR",
        error: null,
      });
    }
    const result = await addImagesToGallery(req.params.id, uploadedImages);
    return apiResponse.success(
      res,
      result,
      `Successfully added ${uploadedImages.length} images to gallery`,
    );
  } catch (err) {
    next(err);
  }
};

const deleteGallery = async (req, res, next) => {
  try {
    await _deleteGallery(req.params.id);
    return apiResponse.success(res, null, `Gallery Deleted Successfully`);
  } catch (err) {
    next(err);
  }
};

export {
  addGallery,
  getGallery,
  getGalleryImages,
  uploadGalleryImages,
  deleteGallery,
};
