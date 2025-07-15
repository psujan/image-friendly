// services/presentation.service.js
import pptxgen from "pptxgenjs";
import fs from "fs";
import path from "path";
import GalleryImage from "../models/galleryimage.model.js";

const generatePresentationFromGallery = async (galleryId) => {
  const pptx = new pptxgen();

  const images = await GalleryImage.find({ galleryId });

  if (!images.length) {
    throw new Error("No images found in this gallery");
  }

  for (const img of images) {
    const imagePath = path.join(
      process.cwd(),
      "backend",
      "public",
      "uploads",
      img.fileName
    );

    if (!fs.existsSync(imagePath)) {
      continue; // or throw if critical
    }

    pptx.addSlide().addImage({
      path: imagePath,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });
  }

  // Save to buffer
  const pptxBuffer = await pptx.write("nodebuffer");
  return pptxBuffer;
};

export { generatePresentationFromGallery };
