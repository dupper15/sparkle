const ShapeService = require("../services/ShapeService");

const createShape = async (req, res) => {
  try {
    const { x, y, shapeType } = req.body;
    if (!x || !y || !shapeType) {
      return res.status(400).json({
        status: "ERROR",
        message: "All fields are required.",
      });
    }
     console.log(req.body);
    const response = await ShapeService.createShape(req.body);
    return res.status(201).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "An error occurred while creating the shape.",
    });
  }
};

const getDetailShape = async (req, res) => {
  try {
    const shapeId = req.params.id;
    if (!shapeId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Shape ID is required",
      });
    }
    const response = await ShapeService.getDetailShape(shapeId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};
const getAllShape = async (req, res) => {
  try {
    const response = await ShapeService.getAllShape();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateShape = async (req, res) => {
  try {
    const shapeId = req.params.id;
    const data = req.body;
    if (!shapeId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Shape ID is required",
      });
    }
    const response = await ShapeService.updateShape(shapeId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

const deleteShape = async (req, res) => {
  try {
    const shapeId = req.params.id;
    if (!shapeId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Shape ID is required",
      });
    }
    const response = await ShapeService.deleteShape(shapeId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

module.exports = {
  createShape,
  getDetailShape,
  getAllShape,
  updateShape,
  deleteShape,
};
