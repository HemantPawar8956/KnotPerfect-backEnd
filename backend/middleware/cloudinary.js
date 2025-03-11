import "dotenv/config";
import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.Cloud_Api_Key,
  api_secret: process.env.Cloud_Secret_Key,
});

const storage = new multer.memoryStorage();

async function imageUploadUtilis(file) {
  const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  const result = await cloudinary.uploader.upload(base64Image, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

export { imageUploadUtilis, upload };
