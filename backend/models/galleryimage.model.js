// models/galleryImage.model.js
import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery", // This must match the name of your Gallery model
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
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// In GalleryImage schema
galleryImageSchema.virtual("gallery", {
  ref: "Gallery",
  localField: "galleryId",
  foreignField: "_id",
  justOne: true,
});

galleryImageSchema.set("toObject", { virtuals: true });
galleryImageSchema.set("toJSON", { virtuals: true });

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);
export default GalleryImage;
