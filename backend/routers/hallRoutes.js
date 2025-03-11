import express from "express";
import {
  addHall,
  deleteHallImage,
  getAllHalls,
  uploadHallImages,
} from "../controllers/hallController.js";
import { upload } from "../middleware/cloudinary.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";

const hallRoutes = express();

hallRoutes.get("/getAllHalls", getAllHalls);
hallRoutes.post("/addHallImages", upload.single("images"), uploadHallImages);
hallRoutes.delete(
  "/deleteHallImages",
  upload.single("images"),
  deleteHallImage
);
hallRoutes.post("/addNewHall", upload.single("images"), addHall);
hallRoutes.delete("/deleteHall/:id", )

export default hallRoutes;
