// services/gallery.service.js
import mongoose from "mongoose";
import Gallery from "../models/gallery.model.js";
import GalleryImage from "../models/galleryimage.model.js";
import { BASE_URL } from "../config/env.js";

const createGallery = async (user, title) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const gallery = await Gallery.create(
      [
        {
          title: title,
          userId: user.id,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return gallery[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

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

const getGalleryList = async (user) => {
  try {
    const galleries = await Gallery.aggregate([
      // Match galleries for the specific user
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.id),
        },
      },
      // Lookup images from GalleryImage collection
      {
        $lookup: {
          from: "galleryimages", // MongoDB collection name (lowercase + pluralized)
          localField: "_id",
          foreignField: "galleryId",
          as: "images",
        },
      },
      // Add imageCount field
      {
        $addFields: {
          imageCount: { $size: "$images" },
        },
      },
      // Project only needed fields (optional)
      {
        $project: {
          title: 1,
          userId: 1,
          imageCount: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      // Sort by creation date (newest first)
      {
        $sort: { createdAt: -1 },
      },
    ]);
    return galleries;
  } catch (err) {
    throw err;
  }
};

export { createGallery, createGalleryWithImages, getGalleryList };
