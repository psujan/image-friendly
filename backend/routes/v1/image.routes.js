import {Router} from "express";
import {uploadImage, resizeImage} from "../../controllers/image.controller.js";
import upload from "../../middleware/multer.middleware.js"
import {createResizeValidationRules} from "../../middleware/validations/resizeValidationRules.middleware.js"
import {validateRequest} from "../../middleware/validationErrorHandler.middleware.js";

const imageRouter = Router();

imageRouter.post("/resize", createResizeValidationRules, validateRequest, resizeImage);

imageRouter.post("/upload", upload.single("image"), uploadImage)
export default imageRouter;
