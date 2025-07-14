// models/presentation.model.js
import mongoose from "mongoose";

const presentationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ["pptx", "pdf"],
      default: "pptx",
    },
  },
  { timestamps: { createdAt: "generatedAt", updatedAt: false } }
);

const Presentation = mongoose.model("Presentation", presentationSchema);
export default Presentation;
