// services/presentation.service.js
import pptxgen from "pptxgenjs";
import fs from "fs";
import path from "path";
import GalleryImage from "../models/galleryimage.model.js";
import mongoose from "mongoose";

const generatePresentationFromGallery = async (galleryId, reorderedIds) => {
  const pptx = new pptxgen();

  // convert string ids to object ids
  const objectIds = reorderedIds.map((id) => new mongoose.Types.ObjectId(id));

  //fetch images with those ids (this will give unordered results)
  const galImages = await GalleryImage.find({ _id: { $in: reorderedIds } });

  if (!galImages.length) {
    throw new Error("No images found in this gallery");
  }

  // sort images to match the order of reorderedIds
  const images = reorderedIds.map((id) =>
    galImages.find((img) => img._id.toString() === id)
  );

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
