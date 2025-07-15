// controllers/presentation.controller.js
import { generatePresentationFromGallery } from "../services/presentation.service.js";

const downloadPresentation = async (req, res, next) => {
  try {
    const { galleryId } = req.params;

    if (!galleryId) {
      return res.status(400).json({ message: "Gallery ID is required" });
    }

    const pptxBuffer = await generatePresentationFromGallery(galleryId);

    res.set({
      "Content-Disposition": `attachment; filename=gallery-${galleryId}.pptx`,
      "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    res.send(pptxBuffer);
  } catch (err) {
    next(err);
  }
};

export { downloadPresentation };
