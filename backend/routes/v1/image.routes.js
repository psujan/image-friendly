import {Router} from "express";
import {uploadImage, resizeImage, compressImage} from "../../controllers/image.controller.js";
import upload from "../../middleware/multer.middleware.js"
import {
    compressValidationRules,
    resizeValidationRules
} from "../../middleware/validations/imageValidationRules.js"
import {validateRequest} from "../../middleware/validationErrorHandler.middleware.js";

const imageRouter = Router();

imageRouter.post("/resize", resizeValidationRules, validateRequest, resizeImage);
imageRouter.post("/compress", compressValidationRules, validateRequest, compressImage);
imageRouter.post("/upload", upload.single("image"), uploadImage)
export default imageRouter;
