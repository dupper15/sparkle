const Shape = require("../models/ShapeModel");

const createShape = (newShape) => {
  return new Promise(async (resolve, reject) => {
    const { x, y, shapeType, height, width, opacity, zIndex, rotate, color } =
      newShape;
    try {
      const createdShape = await Shape.create({
        x,
        y,
        shapeType,
        height,
        width,
        opacity,
        zIndex,
        rotate,
        color,
      });
      if (createdShape) {
        resolve({
          status: "OK",
          message: "Shape created successfully.",
          data: createdShape,
        });
      }
    } catch (e) {
      reject({
        status: "ERROR",
        message: "An error occurred while creating the shape.",
        error: e,
      });
    }
  });
};

const getDetailShape = (shapeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const shape = await Shape.findOne({
        _id: shapeId,
      });
      if (!Shape) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: shape,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Shape",
        error: error.message,
      });
    }
  });
};

const getAllShape = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allShape = await Shape.find();
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allShape,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to get all shape",
        error: error.message,
      });
    }
  });
};

const updateShape = (shapeId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkShape = await Shape.findOne({
        _id: shapeId,
      });
      if (!checkShape) {
        resolve({
          status: "ERROR",
          message: "Shape is not defined!",
        });
        return;
      }
      const updatedShape = await Shape.findByIdAndUpdate(shapeId, data, {
        new: true,
      });

      if (!updatedShape) {
        resolve({
          status: "ERROR",
          message: "Shape update failed or not found",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedShape,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to update Shape",
        error: error.message,
      });
    }
  });
};

const deleteShape = (shapeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const shape = await Shape.findOne({
        _id: shapeId,
      });
      if (!shape) {
        resolve({
          status: "ERROR",
          message: "Shape is not defined!",
        });
        return;
      }
      await Shape.findByIdAndDelete(shapeId);

      resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Shape",
        error: error.message,
      });
    }
  });
};

module.exports = {
  createShape,
  getDetailShape,
  getAllShape,
  updateShape,
  deleteShape,
};
