const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const sendMessage = async (newMessage) => {
  const { content, sender, groupId } = newMessage;

  if (!content || !sender || !groupId) {
    throw new Error("All fields (content, sender, groupId) are required");
  }

  try {
    const message = new Message({
      content,
      sender,
      groupId,
    });

    const savedMessage = await message.save();
    const user = await User.findById(sender).select("image userName").lean();
    return {
      status: "SUCCESS",
      data: {
        ...savedMessage.toObject(),
        avatar: user ? user.image : null,
        senderName: user ? user.userName : "Unknown",
      },
    };
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
        const user = await User.findById(message.sender)
          .select("image userName")
          .lean();
        return {
          ...message,
          avatar: user ? user.image : null,
          senderName: user ? user.userName : "Unknown",
        };
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

module.exports = {
  sendMessage,
  getMessage,
  deleteMessage,
};
