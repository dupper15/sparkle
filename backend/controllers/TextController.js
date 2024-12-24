const TextService = require("../services/TextService");

const createText = async (req, res) => {
  try {
    const { x, y } = req.body;
    if (!x || !y) {
      return res.status(400).json({
        status: "ERROR",
        message: "All fields are required.",
      });
    }
    const response = await TextService.createText(req.body);
    return res.status(201).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "An error occurred while creating the text.",
    });
  }
};

const getDetailText = async (req, res) => {
  try {
    const textId = req.params.id;
    if (!textId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await TextService.getDetailText(textId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateText = async (req, res) => {
  try {
    const textId = req.params.id;
    const data = req.body;
    if (!textId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await TextService.updateText(textId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteText = async (req, res) => {
  try {
    const textId = req.params.id;
    if (!textId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await TextService.deleteText(textId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createText,
  getDetailText,
  updateText,
  deleteText,
};
