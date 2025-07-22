// models/galleryImage.model.js
import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
    },
    originalName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);
export default GalleryImage;
