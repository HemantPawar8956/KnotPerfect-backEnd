import User from "../modals/userModel.js";
import { imageUploadUtilis } from "../middleware/cloudinary.js";
import bcrypt from "bcrypt";
import sendMail from "../middleware/mailVerification.js";

export const getAllUser = async (req, res) => {
  try {
    let response = await User.find();
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log("error while fetching all the users");
    res.status(500).send("error while fetching all the users");
  }
};

export const uploadUserImage = async (req, res) => {
  try {
    let id = req.body.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let uploadedImage = await imageUploadUtilis(req.file);
    await User.findByIdAndUpdate(
      id,
      { $set: { profileImage: uploadedImage.secure_url } },
      { new: true }
    );

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: uploadedImage.secure_url, // Cloudinary URL
    });
  } catch (error) {
    console.log("error while uploading the image", error);
    return res
      .status(500)
      .json({ error: "Image upload failed", details: error.message });
  }
};

export const addnewUser = async (req, res) => {
  let email = req.body.email;
  let data = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  };
  try {
    let alreadyUser = await User.find({ email });
    if (alreadyUser[0]) {
      res.status(201).send({ message: "already a User", data: alreadyUser });
    } else {
      let response = await User(data);
      let result = await response.save();
      res.status(200).send({
        message: "Sign-up successful! Welcome to Knot Perfect!",
        data: result,
      });
    }
  } catch (error) {
    console.log("error while adding the user", error);
    res
      .status(500)
      .send({ message: "error while adding the user", error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "user updated succesfully", data: response });
  } catch (error) {
    console.log("error while updating the user");
    res
      .status(500)
      .send({ message: "error while updating the user", error: error });
  }
};

export const sendVerificationMail = async (req, res) => {
  sendMail(req, res);
};
