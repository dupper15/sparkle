const historyService = require("../services/HistoryService");

const createHistory = async (historyData) => {
  try {
    const { projectId, userId, content } = historyData;
    if (!projectId || !userId || !content) {
      return { status: "error", message: "Missing fields" };
    }
    const response = await historyService.createHistory(historyData);
    return { status: "success", message: "History saved" };
  } catch (e) {
    throw new Error(e.message);
  }
};
const createHistoryRoute = async (req, res) => {
  try {
    const { projectId, userId, content } = req.body;
    if (!projectId || !userId || !content) {
      return { status: "error", message: "Missing fields" };
    }
    const response = await historyService.createHistory(req.body);
    return res.status(200).json(response);
  } catch (e) {
    throw new Error(e.message);
  }
};
const getAllHistory = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log("projectId1", projectId);
    if (!projectId) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Missing projectId" });
    }
    const response = await historyService.getAllHistory(projectId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createHistory,
  getAllHistory,
  createHistoryRoute,
};
