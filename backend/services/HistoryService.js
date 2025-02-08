const History = require("../models/HistoryModel");
const createHistory = async (newHistory) => {
  const { projectId, userId, content } = newHistory;
  console.log("newHistory", newHistory);

  if (!projectId || !userId || !content) {
    return { status: "ERROR", message: "Missing required fields" };
  }
  try {
    const history = new History({
      project: projectId,
      user: userId,
      content,
    });
    const savedHistory = await history.save();

    return { status: "SUCCESS", data: savedHistory };
  } catch (error) {
    console.error("Error saving history:", error);
    return { status: "ERROR", message: error.message };
  }
};

const getAllHistory = async (projectId) => {
  try {
    const history = await History.find({ project: projectId }) // Lấy tất cả các bản ghi có cùng projectId
      .populate("user", "userName image") // Lấy thông tin user
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo
      .lean(); // Giúp tối ưu hiệu suất
    return { status: "SUCCESS", data: history };
  } catch (error) {
    console.error("Error fetching history:", error);
    throw new Error(`Failed to fetch history: ${error.message}`);
  }
};
module.exports = {
  createHistory,
  getAllHistory,
};
