import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const ButtonMessage = ({ toggleChatBox }) => {
  return (
    <div
      className="flex flex-col w-[60px] h-[60px] bg-orange-500 fixed bottom-3 right-3 rounded-full justify-center items-center cursor-pointer hover:bg-orange-400"
      onClick={toggleChatBox}>
      <button className="text-white text-3xl">
        <IoChatbubbleEllipsesOutline />
      </button>
    </div>
  );
};

export default ButtonMessage;
