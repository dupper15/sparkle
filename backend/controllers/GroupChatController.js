const groupChatService = require("../services/GroupChatService");

const createGroupChat = async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!proejectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Something is wrong",
      });
    }

    const response = await groupChatService.createGroupChat(req.body);
    return res.status(201).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const getGroupChat = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing groupId",
      });
    }

    const response = await groupChatService.getGroupChat(groupId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const addUserToGroupChat = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!groupId || !userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing groupId or userId",
      });
    }

    const response = await groupChatService.addUserToGroupChat(groupId, userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const deleteGroupChat = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing groupId",
      });
    }

    const response = await groupChatService.deleteGroupChat(groupId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  createGroupChat,
  getGroupChat,
  addUserToGroupChat,
  deleteGroupChat,
};
