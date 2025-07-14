// services/gallery.service.js
import mongoose from "mongoose";
import Gallery from "../models/gallery.model.js";
import GalleryImage from "../models/galleryimage.model.js";
import { BASE_URL } from "../config/env.js";

const createGalleryWithImages = async (user, uploadedImages) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // 1. Create gallery
    const gallery = await Gallery.create(
      [
        {
          title: "Gallery-" + Date.now(),
          userId: user.id,
        },
      ],
      { session }
    );

    // 2. Prepare gallery images
    const images = uploadedImages.map((image) => ({
      galleryId: gallery[0]._id,
      fileName: image.filename,
      imageUrl: `${BASE_URL}/uploads/${image.filename}`,
    }));

    await GalleryImage.insertMany(images, { session });

    // 3. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return {
      gallery: gallery[0],
      images,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export { createGalleryWithImages };
