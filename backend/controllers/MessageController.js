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
      const prompt = `Hãy phân loại câu hỏi sau: "${text}". Nếu người dùng yêu cầu một hình ảnh (có từ khóa như 'vẽ', 'ảnh', 'hình', 'tấm hình', 'tạo hình', 'generate image', 'draw', 'show me a picture', 'give me an image'...), hãy trả lời là "sendImageBot". Nếu người dùng yêu cầu câu trả lời bằng văn bản, hãy trả lời là "sendChatBot". Chỉ trả lời một từ, không thêm bất kỳ nội dung nào khác.`;
      const typeOfAnswer = await messageService.sendChatBot(prompt);
      console.log("typeOfAnswer", typeOfAnswer.data.answer.trim());
      if (typeOfAnswer.data.answer.trim() === "sendImageBot") {
        const response = await messageService.sendImageBot(text);
        console.log("response", response);
        return res.status(200).json(response.data.answer);
      } else {
        const designPrompt = `Người dùng đặt câu hỏi: "${text}".  
        1. Nếu câu hỏi liên quan đến thiết kế đồ họa, UI/UX, nghệ thuật kỹ thuật số hoặc các lĩnh vực sáng tạo tương tự, hãy trả lời một cách chi tiết và hữu ích.  
        2. Nếu câu hỏi không liên quan đến thiết kế, hãy từ chối với một câu như: "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi liên quan đến thiết kế."  
        Chỉ trả lời theo đúng hướng dẫn trên.`;

        const response = await messageService.sendChatBot(
          designPrompt,
          imageUrl
        );

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
