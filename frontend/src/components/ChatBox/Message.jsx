import React from "react";

const Message = ({ message }) => {
  return (
    <div className="px-2 pb-4">
      <div
        className={`chat ${message.name === "You" ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.avatar}
            />
          </div>
        </div>
        <div className="chat-header">{message.name}</div>
        <div className="chat-bubble my-1">{message.text}</div>
        <div className="chat-footer opacity-50">12:45</div>
      </div>
    </div>
  );
};

export default Message;
