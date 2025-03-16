import mongoose from "mongoose";
import { imageUploadUtilis } from "../middleware/cloudinary.js";
import hallModel from "./../modals/hallModel.js";

export const getAllHalls = async (req, res) => {
  try {
    const response = await hallModel.find();
    res.status(200).json(response);
  } catch (error) {
    console.log("error while fetching all halls", error);
    res
      .status(500)
      .json({ message: "error while fetching all halls", error: error });
  }
};

export const uploadHallImages = async (req, res) => {
  try {
    let id = req.body.id;

    if (!id) {
      return res.status(400).json({ error: "Hall ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let uploadedImage = await imageUploadUtilis(req.file);

    if (!uploadedImage || !uploadedImage.secure_url) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const updatedHall = await hallModel.findByIdAndUpdate(
      id,
      { $push: { images: uploadedImage.secure_url } }, // Append new image to the array
      { new: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ error: "Hall not found" });
    }

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: uploadedImage.secure_url, // Cloudinary URL
      updatedImages: updatedHall.images, // Return updated images array
    });
  } catch (error) {
    console.error("Error while uploading the image:", error);
    return res.status(500).json({
      error: "Image upload failed",
      details: error.message,
    });
  }
};

export const deleteHallImage = async (req, res) => {
  try {
    let { id, imageUrl } = req.body;
    if (!id || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Hall ID and image URL are required" });
    }

    const updatedHall = await hallModel.findByIdAndUpdate(
      id,
      { $pull: { images: imageUrl } }, // Remove specific image URL from array
      { new: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ error: "Hall not found" });
    }

    return res.status(200).json({
      message: "Image deleted successfully",
      updatedImages: updatedHall.images, // Return updated images array
    });
  } catch (error) {
    console.error("Error while deleting the image:", error);
    return res.status(500).json({
      error: "Image deletion failed",
      details: error.message,
    });
  }
};

export const addHall = async (req, res) => {
  try {
    const response = new hallModel(req.body);
    await response.save();
    res.status(201).json({ message: "Hall added succesfully", data: response });
  } catch (error) {
    console.log("error while adding hall", error);
    res.status(500).send({ message: "error while " });
  }
};
