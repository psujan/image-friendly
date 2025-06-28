import {body} from "express-validator"
import path from 'path';
import fs from 'fs';
import {allowedImageExtensions} from "../../utils/constant.js";

const createResizeValidationRules = [
    body("imageName")
        .notEmpty()
        .withMessage("Please Provide Image Name")
        .custom((value) => {
            const ext = path.extname(value).toLowerCase();
            if (!allowedImageExtensions.includes(ext.substring(1))) {
                throw new Error('Unsupported Image Type. Accepted Format Are:' + allowedImageExtensions.join(','));
            }
            return true;
        })
        .custom((value) => {
            const fullPath = path.join(process.cwd(), 'backend', 'public', 'uploads', value);
            if (!fs.existsSync(fullPath)) {
                throw new Error("Image name '"+ value+"' does not exist");
            }
            return true;
        }),
    body("width")
        .notEmpty()
        .withMessage("Please Provide Resize Width")
        .isInt({ min: 1 })
        .withMessage("Please Provide Valid Width. It must be a number"),

    body("height")
        .notEmpty()
        .withMessage("Please Provide Resize Height")
        .isInt({ min: 1 })
        .withMessage("Please Provide Valid Height. It must be a number"),
]

export  {createResizeValidationRules}