const Background = require("../models/BackgroundModel");

const createBackground = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdBackground = await Background.create({
        background_url: data.image,
        creator: data.id,
      });

      if (createdBackground) {
        resolve({
          status: "OK",
          message: "Create success",
          data: createdBackground,
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

const getAllBackground = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const backgroundArray = await Background.find({
        creator: userId,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: backgroundArray,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Background",
        error: error.message,
      });
    }
  });
};
const deleteBackground = (backgroundId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Background.findByIdAndDelete(backgroundId);
      resolve({
        status: "OK",
        message: "Delete background successfully",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Background",
        error: error.message,
      });
    }
  });
};
module.exports = {
  createBackground,
  getAllBackground,
  deleteBackground,
};
