import path from "path";
import sharp from "sharp";
import { compressionPresets } from "../utils/constant.js";
import { promises as fsPromise } from "fs";
import fs from "fs";
import { BASE_URL } from "../config/env.js";
import helper from "../utils/helper.js";

const TEMP_DIR = path.join(process.cwd(), "backend", "public", "temp");

const ensureTempDir = async () => {
  try {
    await fsPromise.mkdir(TEMP_DIR, { recursive: true });
  } catch (err) {
    throw err;
  }
};

const resizeService = async ({ imageName, width, height, fit }) => {
  try {
    const originalPath = path.join(
      process.cwd(),
      "backend",
      "public",
      "uploads",
      imageName
    );
    const resizeOptions = {
      width: width,
      height: height,
      fit: fit,
      withoutEnable: true,
    };
    return sharp(originalPath).resize(resizeOptions).toBuffer();
  } catch (err) {
    throw err;
  }
};

const getImageSize = (imageName) => {
  const imagePath = path.join(
    process.cwd(),
    "backend",
    "public",
    "uploads",
    imageName
  );
  try {
    const stats = fs.statSync(imagePath);
    const sizeInBytes = stats.size;
    return {
      bytes: sizeInBytes,
      kilobytes: (sizeInBytes / 1024).toFixed(2),
      megabytes: (sizeInBytes / (1024 * 1024)).toFixed(2),
    };
  } catch (err) {
    throw err;
  }
};

const compressService = async (req) => {
  try {
    await ensureTempDir();
    const imagePath = path.join(
      process.cwd(),
      "backend",
      "public",
      "uploads",
      req.body.imageName
    );
    return await compressImage(imagePath, req.body);
    // const compressedSize = compressedBuffer.length;
    // const timestamp = Date.now(); // for fileName
    // const format = req.body.format || "jpeg"; // image format
    // const filename = `compressed_${timestamp}.${format}`;
    // const filePath = path.join(TEMP_DIR, filename);

    // // Save compressed image
    // await fsPromise.writeFile(filePath, compressedBuffer);
    // const compressionRatio = (
    //   ((originalSize - compressedSize) / originalSize) *
    //   100
    // ).toFixed(2);
    // res.json({
    //   success: true,
    //   data: {
    //     filename,
    //     originalSize: helper.byteToMb(originalSize) + ' Mb',
    //     compressedSize: helper.byteToMb(compressedSize) + ' Mb',
    //     compressionRatio: `${compressionRatio}%`,
    //     savings: helper.byteToMb(originalSize - compressedSize) + ' Mb',
    //     downloadUrl: BASE_URL + `/public/temp/${filename}`,
    //   },
    //   message: "Image Compressed Successfully",
    //});
  } catch (err) {
    throw err;
  }
};

// Advanced compression function
const compressImage = async (buffer, options = {}) => {
  const {
    format = "jpeg",
    quality = 80,
    width,
    height,
    fit = "cover",
    progressive = true,
    lossless = false,
    effort = 4,
    compressionLevel = 6,
    preset = null,
    blur,
    sharpen,
    brightness,
    contrast,
    saturation,
    gamma,
    grayscale = false,
    removeMetadata = true,
  } = options;

  let transformer = sharp(buffer);

  // Apply resize if dimensions provided
  if (width || height) {
    transformer = transformer.resize({
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      fit: fit,
      withoutEnlargement: true,
    });
  }

  // Apply image filters
  if (blur) transformer = transformer.blur(parseFloat(blur));
  if (sharpen) transformer = transformer.sharpen();
  if (brightness)
    transformer = transformer.modulate({ brightness: parseFloat(brightness) });
  if (contrast)
    transformer = transformer.modulate({ saturation: parseFloat(contrast) });
  if (saturation)
    transformer = transformer.modulate({ saturation: parseFloat(saturation) });
  if (gamma) transformer = transformer.gamma(parseFloat(gamma));
  if (grayscale) transformer = transformer.grayscale();

  // Remove metadata if requested
  if (removeMetadata) {
    transformer = transformer.withMetadata(false);
  }

  // Apply compression preset if specified
  const finalQuality = preset ? compressionPresets[preset].quality : quality;
  const finalProgressive = preset
    ? compressionPresets[preset].progressive
    : progressive;

  // Apply format-specific compression
  switch (format.toLowerCase()) {
    case "jpeg":
    case "jpg":
      transformer = transformer.jpeg({
        quality: parseInt(finalQuality),
        progressive: finalProgressive,
        mozjpeg: true,
      });
      break;

    case "png":
      transformer = transformer.png({
        compressionLevel: parseInt(compressionLevel),
        progressive: finalProgressive,
        effort: parseInt(effort),
      });
      break;

    case "webp":
      transformer = transformer.webp({
        quality: parseInt(finalQuality),
        lossless: lossless,
        effort: parseInt(effort),
      });
      break;

    case "avif":
      transformer = transformer.avif({
        quality: parseInt(finalQuality),
        effort: parseInt(effort),
      });
      break;

    case "tiff":
      transformer = transformer.tiff({
        quality: parseInt(finalQuality),
        compression: "jpeg",
      });
      break;

    default:
      transformer = transformer.jpeg({
        quality: parseInt(finalQuality),
        progressive: finalProgressive,
      });
  }
  return {
    buffer: await transformer.toBuffer(),
    format: format,
  };
};

export { resizeService, compressService };
