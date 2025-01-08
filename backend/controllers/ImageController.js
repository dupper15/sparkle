const ImageService = require("../services/ImageService");
const Image = require("../models/ImageModel");
const ImageUpload = require("../models/ImageUploadModel");
const createImageUpload = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const response = await ImageService.createImageUpload(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await ImageService.getAllImage(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const createImage = async (req, res) => {
  try {
    const response = await ImageService.createImage(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    if (!imageId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ImageService.getDetailImage(imageId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const data = req.body;
    if (!imageId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ImageService.updateImage(imageId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const removeBackground = async (req, res) => {
  try {
    const data = req.body.data;
    const response = await ImageService.removeBackground(data);
    console.log("response", response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    await ImageUpload.findByIdAndDelete(imageId);
    if (!imageId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ImageService.deleteImage(imageId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createImageUpload,
  createImage,
  getAllImage,
  getDetailImage,
  updateImage,
  removeBackground,
  deleteImage,
};
