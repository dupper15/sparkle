const ComponentService = require("../services/ComponentService");

const createComponent = async (req, res) => {
  try {
    console.log(req.body);
    const response = await ComponentService.createComponent(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllComponent = async (req, res) => {
  try {
    const response = await ComponentService.getAllComponent();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailComponent = async (req, res) => {
  try {
    const componentId = req.params.id;
    if (!componentId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ComponentService.getDetailComponent(componentId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateComponent = async (req, res) => {
  try {
    const ComponentId = req.params.id;
    const data = req.body;
    if (!ComponentId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ComponentService.updateComponent(ComponentId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteComponent = async (req, res) => {
  try {
    const componentId = req.params.id;
    if (!componentId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ComponentService.deleteComponent(componentId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createComponent,
  getAllComponent,
  getDetailComponent,
  updateComponent,
  deleteComponent,
};
