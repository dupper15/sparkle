const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const chatBot = require("../chatBot/chatbot");
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

const deleteMessage = async (messageId) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedMessage) {
      throw new Error("Message not found");
    }

    return { status: "SUCCESS", data: updatedMessage };
  } catch (error) {
    throw new Error(error.message);
  }
};
const sendChatBot = async (data) => {
  try {
    if (!data) {
      throw new Error("Missing or empty message content.");
    }
    const botReply = await chatBot.generateText(data);
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

module.exports = {
  sendMessage,
  getMessage,
  deleteMessage,
  sendChatBot,
};
