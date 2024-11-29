const Message = require("../models/MessageModel");
const User = require("../models/UserModel"); // Giả sử bạn đã có mô hình User
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

    // Lặp qua tất cả tin nhắn để lấy avatar người gửi
    const messagesWithAvatars = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findById(message.sender).select("image");
        return {
          ...message.toObject(),
          avatar: user ? user.image : null, // Thêm avatar vào mỗi tin nhắn
        };
      })
    );

    return { status: "SUCCESS", data: messagesWithAvatars };
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
