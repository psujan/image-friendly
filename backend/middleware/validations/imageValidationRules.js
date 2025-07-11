import { body } from "express-validator";
import path from "path";
import fs from "fs";
import { allowedImageExtensions } from "../../utils/constant.js";

const imageNameRule = body("imageName")
  .notEmpty()
  .withMessage("Please Provide Image Name")
  .custom((value) => {
    const ext = path.extname(value).toLowerCase();
    if (!allowedImageExtensions.includes(ext.substring(1))) {
      throw new Error(
        "Unsupported Image Type. Accepted Format Are:" +
          allowedImageExtensions.join(",")
      );
    }
    return true;
  })
  .custom((value) => {
    const fullPath = path.join(
      process.cwd(),
      "backend",
      "public",
      "uploads",
      value
    );
    if (!fs.existsSync(fullPath)) {
      throw new Error("Image name '" + value + "' does not exist");
    }
    return true;
  });

const resizeValidationRules = [
  imageNameRule,
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

  body("fit")
    .notEmpty()
    .withMessage("Please Provide Fit Type")
    .isIn(["cover", "contain", "fill", "inside", "outside"])
    .withMessage("Please Provide Valid Fit Type"),

  body("compression")
    .notEmpty()
    .withMessage("Please Provide Compression")
    .isIn(["no", "low", "medium", "high"])
    .withMessage("Please Provide Valid Compression"),

  body("format")
    .optional({ checkFalsy: true })
    .isIn([...allowedImageExtensions])
    .withMessage("Please Provide Valid Image Format"),
];

const compressValidationRules = [
  imageNameRule,
  body("width")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Please Provide Valid Width. It must be a number"),

  body("height")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Please Provide Valid Height. It must be a number"),

  body("format")
    .optional({ checkFalsy: true })
    .isIn([...allowedImageExtensions])
    .withMessage("Please Provide Image Format"),

  body("quality")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Please Provide Valid Quality. It must be a number"),

  // body("progressive")
  //     .exists()
  //     .isBoolean()
  //     .withMessage("Progressive field must be a boolean value")
  //     .toBoolean(),

  // body("removeMetadata")
  //     .exists()
  //     .isBoolean()
  //     .withMessage("Remove Metadata field must be a boolean value")
  //     .toBoolean(),
];

export { resizeValidationRules, compressValidationRules };
