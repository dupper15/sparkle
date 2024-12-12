const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const chatBot = require("../chatBot/chatbot");
const { textToImage } = require("../chatBot/textToImage.js");
const sendMessage = async (newMessage) => {
  const { content, sender, groupId, imageUrl } = newMessage;

  if (!sender || !groupId || (!content && !imageUrl)) {
    throw new Error(
      "All fields (sender, groupId, and either content or image) are required"
    );
  }

  try {
    const message = new Message({
      content,
      sender,
      groupId,
      imageUrl,
    });
    const savedMessage = await message.save();

    if (sender !== "SparkleBot") {
      const user = await User.findById(sender).select("image userName").lean();

      return {
        status: "SUCCESS",
        data: {
          ...savedMessage.toObject(),
          avatar: user ? user.image : null,
          senderName: user ? user.userName : "Unknown",
        },
      };
    } else {
      return {
        status: "SUCCESS",
        data: {
          ...savedMessage.toObject(),
          avatar: "bot",
          senderName: "SparkleBot",
        },
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMessage = async (groupId) => {
  try {
    const messages = await Message.find({ groupId, isDeleted: false })
      .sort({ createdAt: 1 })
      .lean();

    const messagesFinal = await Promise.all(
      messages.map(async (message) => {
        if (message.sender === "SparkleBot") {
          return {
            ...message,
            avatar: "bot_avatar_path",
            senderName: "SparkleBot",
          };
        } else {
          const user = await User.findById(message.sender)
            .select("image userName")
            .lean();
          return {
            ...message,
            avatar: user ? user.image : null,
            senderName: user ? user.userName : "Unknown",
          };
        }
      })
    );

    return { status: "SUCCESS", data: messagesFinal };
  } catch (error) {
    throw new Error(error.message);
  }
};
const sendChatBot = async (text, imageUrl) => {
  try {
    if (!text && !imageUrl) {
      throw new Error("Missing or empty message content.");
    }
    let botReply;
    if (text && !imageUrl) {
      botReply = await chatBot.generateText(text);
    } else if (!text && imageUrl) {
      botReply = await chatBot.generateTextFromImage(imageUrl);
    } else {
      botReply = await chatBot.generateTextFromImage(imageUrl, text);
    }
    return {
      status: "SUCCESS",
      data: {
        answer: botReply,
      },
    };
  } catch (error) {
    console.error("Error in sendChatBot2:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
const sendImageBot = async (text) => {
  try {
    if (!text) {
      throw new Error("Missing or empty message content.");
    }
    const botReply = await textToImage(text);
    return {
      status: "SUCCESS",
      data: {
        answer: botReply.images[0].url,
      },
    };
  } catch (error) {
    console.error("Error in sendChatBot2:", error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
const getUserName = async (userId) => {
  if (!userId) {
    return "";
  }
  try {
    const user = await User.findById(userId);
    return user.userName;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  sendMessage,
  getMessage,
  sendChatBot,
  sendImageBot,
  getUserName,
};
