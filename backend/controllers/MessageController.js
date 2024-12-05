const messageService = require("../services/MessageService");

const sendMessage = async (req, res) => {
  try {
    const { content, sender, groupId } = req.body;
    if (!content || !sender || !groupId) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Missing fields" });
    }
    const response = await messageService.sendMessage(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const groupId = req.params.id;
    if (!groupId) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Missing groupId" });
    }
    const response = await messageService.getMessage(groupId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.prams.id;
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        status: "ERROR",
        message: "Something is wrong",
      });
    }
    const response = await messageService.deleteMessage(messageId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const sendChatBot = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing message content1",
      });
    }
    const response = await messageService.sendChatBot(data);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in sendChatBot1:", e.message);
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal server error",
    });
  }
};

module.exports = {
  sendMessage,
  getMessage,
  deleteMessage,
  sendChatBot,
};
