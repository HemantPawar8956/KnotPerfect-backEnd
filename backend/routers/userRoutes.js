import express from "express";
import { upload } from "../middleware/cloudinary.js";
import {
  addnewUser,
  getAllUser,
  sendVerificationMail,
  uploadUserImage,
} from "./../controllers/userConroller.js";
import { userAuth } from "../middleware/auth.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";
const userRoutes = express();

userRoutes.get("/getAllUser", authMiddleware, adminMiddleware, getAllUser);
userRoutes.post("/userLogin", userAuth);
userRoutes.post("/uploadImage", upload.single("profileImage"), uploadUserImage);
userRoutes.post("/addnewUser", upload.single("profileImage"), addnewUser);
userRoutes.post(
  "/verifyMail",
  upload.single("profileImage"),
  sendVerificationMail
);

export default userRoutes;
