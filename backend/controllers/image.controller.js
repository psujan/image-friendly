import { uploadFile } from "../services/upload.services.js";
import { compressService, resizeService } from "../services/image.services.js";
import apiResponse from "../utils/response.js";

const mimeTypes = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  tiff: "image/tiff",
};

const uploadImage = (req, res, next) => {
  try {
    const fileInfo = uploadFile(req.file);
    return apiResponse.success(res, fileInfo, "File Uploaded Successfully");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const resizeImage = async (req, res, next) => {
  try {
    const { imageName, width, height, fit, compression, format } = req.body;
    const buffer = await resizeService({
      imageName,
      width,
      height,
      fit,
      compression,
      format,
    });
    const mimeType = mimeTypes[format] || "application/octet-stream";
    const filename = `resize_${Date.now()}.${format}`;
    res.set({
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Length": buffer.length,
    });

    res.send(buffer);
  } catch (err) {
    next(err);
  }
};

const compressImage = async (req, res, next) => {
  try {
    const { buffer, format } = await compressService(req);
    const mimeType = mimeTypes[format] || "application/octet-stream";
    const filename = `compressed_${Date.now()}.${format}`;
    res.set({
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Length": buffer.length,
    });

    res.send(buffer);
  } catch (err) {
    next(err);
  }
};

export { uploadImage, resizeImage, compressImage };
