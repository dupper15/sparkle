const Image = require("../models/ImageModel");
const ImageUpload = require("../models/ImageUploadModel");
const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

require("dotenv").config();
const createImageUpload = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data", data);
      const createdImageUpload = await ImageUpload.create({
        image: data.image,
        creator: data.id,
      });

      if (createdImageUpload) {
        resolve({
          status: "OK",
          message: "Create success",
          data: createdImageUpload,
        });
      }
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Background",
        error: error.message,
      });
    }
  });
};

const createImage = (newImage) => {
  return new Promise(async (resolve, reject) => {
    const { x, y, height, width, image } = newImage;
    try {
      const createdImage = await Image.create({
        x,
        y,
        height,
        width,
        image,
      });

      if (createdImage) {
        resolve({
          status: "OK",
          message: "Create success",
          data: createdImage,
        });
      }
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Image",
        error: error.message,
      });
    }
  });
};

const getDetailImage = (imageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await Image.findOne({
        _id: imageId,
      });
      if (!Image) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: image,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Image",
        error: error.message,
      });
    }
  });
};

const getAllImage = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allImage = await ImageUpload.find({ creator: userId });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allImage,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to get all Image",
        error: error.message,
      });
    }
  });
};

const updateImage = (imageId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkImage = await Image.findOne({
        _id: imageId,
      });
      if (!checkImage) {
        resolve({
          status: "ERROR",
          message: "Image is not defined!",
        });
        return;
      }
      const updatedImage = await Image.findByIdAndUpdate(imageId, data, {
        new: true,
      });

      if (!updatedImage) {
        resolve({
          status: "ERROR",
          message: "Image update failed or not found",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedImage,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to update Image",
        error: error.message,
      });
    }
  });
};

const removeBackground = async (imageUrl) => {
  try {
    console.log("8", imageUrl);
    // Bước 1: Gửi yêu cầu tới API remove.bg để xóa nền
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", imageUrl); // URL ảnh từ yêu cầu

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": process.env.API_KEY_REMOVEBG },
      body: formData,
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Bước 2: Lưu ảnh PNG đã xóa nền vào ổ đĩa tạm thời
      const tempFilePath = path.join(__dirname, "temp_no_bg.png");
      fs.writeFileSync(tempFilePath, buffer);
      console.log("Image saved as temp_no_bg.png");

      // Bước 3: Upload ảnh lên Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(tempFilePath);

      // Bước 4: Xóa ảnh tạm thời khỏi hệ thống
      await unlinkAsync(tempFilePath);

      console.log("Image uploaded to Cloudinary:", cloudinaryUrl);

      return cloudinaryUrl; // Trả về URL ảnh trên Cloudinary
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Hàm upload ảnh lên Cloudinary
const uploadToCloudinary = async (filePath) => {
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload";
  const uploadPreset = "afh5sfc"; // Thay bằng preset của bạn trên Cloudinary

  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath)); // Đọc ảnh từ file
  formData.append("upload_preset", uploadPreset);

  const cloudinaryResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const cloudinaryResult = await cloudinaryResponse.json();
  if (!cloudinaryResponse.ok) {
    throw new Error(
      `Cloudinary upload failed: ${cloudinaryResult.error.message}`
    );
  }

  return cloudinaryResult.secure_url; // Trả về URL của ảnh đã upload
};

const deleteImage = (imageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await Image.findOne({
        _id: imageId,
      });
      if (!image) {
        resolve({
          status: "ERROR",
          message: "Image is not defined!",
        });
        return;
      }
      await Image.findByIdAndDelete(imageId);

      resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Image",
        error: error.message,
      });
    }
  });
};

module.exports = {
  createImageUpload,
  createImage,
  getAllImage,
  getDetailImage,
  updateImage,
  deleteImage,
  removeBackground,
};
