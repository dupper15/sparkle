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

const sendChatBot = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;

    if (!text && !imageUrl) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing message content1",
      });
    }
    if (text) {
      const prompt = `Cho tôi biết ở câu hỏi "${text}" người dùng muốn câu trả lời là văn bản hay hình ảnh? nếu là hình ảnh thì bạn trả lời là sendImageBot và không nói thêm gì, nếu là văn bản thì bạn trả lời là sendChatBot`;
      const typeOfAnswer = await messageService.sendChatBot(prompt);
      console.log("typeOfAnswer", typeOfAnswer.data.answer.trim());
      if (typeOfAnswer.data.answer.trim() === "sendImageBot") {
        const response = await messageService.sendImageBot(text);
        console.log("response", response);
        return res.status(200).json(response.data.answer);
      } else {
        const response = await messageService.sendChatBot(text, imageUrl);
        console.log("response", response);
        return res.status(200).json(response.data.answer);
      }
    } else {
      const response = await messageService.sendImageBot(text, imageUrl);
      return res.status(200).json(response.data.answer);
    }
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: e.message || "Internal server error",
    });
  }
};
const sendImageBot = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing message content1",
      });
    }
    const response = await messageService.sendImageBot(text);
    return res.status(200).json(response.data.answer);
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
  sendChatBot,
  sendImageBot,
};
