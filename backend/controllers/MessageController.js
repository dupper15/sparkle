const messageService = require("../services/MessageService");

const sendMessage = async (req, res) => {
  try {
    const { content, sender, groupId } = req.body;
    if (!content || !sender || !groupdId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Something is wrong",
      });
    }
    const respone = await messageService.sendMessage(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getMessage = async (req, res) => {
  try {
    const { groupdId } = req.prams.id;
    if (!groupId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Something is wrong",
      });
    }
    const response = await messageService.getMessage(groupId);
    return res.status.json(response);
  } catch (e) {
    return res.status.json({
      message: e,
    });
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
