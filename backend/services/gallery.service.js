// services/gallery.service.js
import mongoose from "mongoose";
import Gallery from "../models/gallery.model.js";
import GalleryImage from "../models/galleryimage.model.js";
import { BASE_URL } from "../config/env.js";
import path from 'path';
import fs from 'fs/promises'

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

const addImagesToGallery = async (galleryId, uploadedImages) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let transactionCommitted = false;
  try {
    const images = uploadedImages.map((image) => ({
      galleryId,
      fileName: image.filename,
      imageUrl: `${BASE_URL}/uploads/${image.filename}`,
      originalName: image.originalname,
      size: image.size,
    }));

    await GalleryImage.insertMany(images, { session });

    // Commit transaction
    await session.commitTransaction();
    transactionCommitted = true;

    return {
      images,
    };
  } catch (error) {
    if (!transactionCommitted) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
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

const getGalleryImagesList = async (id) => {
  try {
    return await GalleryImage.find({ galleryId: id }).populate("gallery");
  } catch (err) {
    throw err;
  }
};

const getGalleryById = async (id) => {
  return await Gallery.findOne({ _id: id });
};

const _deleteGallery = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const galleryImages = await GalleryImage.find({ galleryId: id });
    console.log("here", galleryImages)
    // proceed if the model has records
    if (galleryImages.length) {
      for (const img of galleryImages) {
        const filePath = path.join(
          process.cwd(),
          "backend",
          "public",
          "uploads",
          img.fileName
        );

        // remove file from directory
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.error(err);
          // log but don't throw — file may already be missing
          console.warn(`File not found or couldn't be deleted: ${filePath}`);
        }
      }

      //delete gallery images from database
      await GalleryImage.deleteMany({ galleryId: id }, { session });
    }

    //delete Gallery
    await Gallery.deleteOne({ _id: id }, { session });

    //commit transaction
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export {
  createGallery,
  addImagesToGallery,
  getGalleryList,
  getGalleryImagesList,
  getGalleryById,
  _deleteGallery,
};
