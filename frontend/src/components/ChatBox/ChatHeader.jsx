import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const ChatHeader = ({ toggleChatBox }) => {
  const project = useSelector((state) => state.project)
  return (
    <div className="w-full h-[50px] rounded-t-lg bg-gradient-to-r from-purple-900 to-blue-500 flex items-center justify-between px-4">
      <span className="text-lg text-white font-semibold">{project?.projectName}</span>
      <span
        className="text-2xl text-white cursor-pointer"
        onClick={toggleChatBox}
      >
        <IoCloseSharp />
      </span>
    </div>
  );
};

export default ChatHeader;
