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

module.exports = {
  sendMessage,
  getMessage,
  deleteMessage,
};
