import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useSelector } from "react-redux";
import emptyAvatar from "../../assets/default-profile-icon.png";
import chatbotAvatar from "../../assets/chatbot.jpg"; // Kiểm tra đúng đường dẫn đến ảnh
const Message = ({ message }) => {
  const { isDarkMode } = useDarkMode();
  const user = useSelector((state) => state.user);

  return (
    <div className='px-2 pb-4'>
      <div
        className={`chat ${
          message.sender === user.id ? "chat-end" : "chat-start"
        }`}>
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
            {message.senderName !== "SparkleBot" ? (
              message.avatar ? (
                <img
                  alt={message.senderName || "Avatar"}
                  src={message.avatar}
                />
              ) : (
                <img alt={emptyAvatar || "Avatar"} src={emptyAvatar} />
              )
            ) : (
              <img
                alt={chatbotAvatar || "Avatar"}
                src={chatbotAvatar}
                className='rounded-full object-cover'
              />
            )}
          </div>
        </div>
        <div className='chat-header text-black'>
          {message.senderName || "Unknown"}
        </div>
        <div
          className={`chat-bubble my-1 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}>
          {message.content}
        </div>
        <div className='chat-footer text-black opacity-50'>
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
