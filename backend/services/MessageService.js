const Message = require("../models/MessageModel");

const sendMessage = async (newMessage) => {
  const { content, sender, groupId } = newMessage;

  try {
    const message = new Message({
      content,
      sender,
      groupId,
    });

    const savedMessage = await message.save();
    return { status: "SUCCESS", data: savedMessage };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMessage = async (groupId) => {
  try {
    const messages = await Message.find({ groupId, isDeleted: false }).sort({
      createdAt: 1,
    });
    return { status: "SUCCESS", data: messages };
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
