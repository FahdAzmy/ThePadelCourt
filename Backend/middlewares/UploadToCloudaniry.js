const asynHandler = require("../middlewares/AsyncHandler");
const path = require("path");
const Court = require("../models/Court.Model");
const fs = require("fs");
const cloudinary = require("cloudinary");
// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Cloudinary Upload Image
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    return error;
  }
};
//Cloudinary remove Image
const cloudinaryRemoveImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destory(publicId);
    return result;
  } catch (error) {
    return error;
  }
};
exports.UploadPhotoToCloud = async (file) => {
  // 1. Get the Path to the Image
  const imagePath = path.join(__dirname, `../Images/${file.filename}`);
  // 2. Upload the Image To Cloud

  const result = await cloudinaryUploadImage(imagePath);
  // 3. Get teh User From DB

  // 5. Change the Profile Photo filed in the db

  // 6. Delete the Image from the server
  fs.unlinkSync(imagePath);
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};
