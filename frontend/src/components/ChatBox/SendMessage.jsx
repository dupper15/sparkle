import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { FaFaceGrinSquint } from "react-icons/fa6";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { FaRobot } from "react-icons/fa6";

const SendMessage = ({ addMessage }) => {
  const { isDarkMode } = useDarkMode();
  const [isChatBot, setIsChatBot] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(message, isChatBot);
      setMessage("");
    }
  };
  const chatBotClick = () => {
    setIsChatBot((prev) => !prev);
  };
  return (
    <div
      className={`w-full h-[60px] flex items-center justify-center px-4 ${
        isDarkMode ? "bg-[#282828] text-gray-300" : "bg-white"
      }`}>
      <form
        onSubmit={handleSubmit}
        className='flex w-full space-x-3 items-center'>
        <span
          className={`text-2xl cursor-pointer rounded-full p-2 ${
            isChatBot ? "bg-[#610BEF]" : ""
          }`}
          onClick={chatBotClick}>
          <FaRobot className={`${isChatBot ? "text-white" : ""}`} />
        </span>
        <span className='text-2xl cursor-pointer '>
          <FaFaceGrinSquint />
        </span>
        <input
          className='input w-full focus:outline-none bg-[#F2F2F2] text-black rounded-lg shadow px-4 py-2'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span onClick={handleSubmit} className='text-2xl cursor-pointer'>
          <LuSendHorizonal />
        </span>
      </form>
    </div>
  );
};

export default SendMessage;
