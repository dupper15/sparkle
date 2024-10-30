import React from "react";
import Message from "./Message";
import Avatar from "../../assets/default-profile-icon.png";
import SendMessage from "./SendMessage";
import ChatHeader from "./ChatHeader";
import { useState, useRef, useEffect } from "react";

const ChatBox = ({ toggleChatBox }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello",
      name: "Lam",
      avatar: Avatar,
    },
    {
      id: 2,
      text: "Hi",
      name: "Nghia",
      avatar: Avatar,
    },
    {
      id: 3,
      text: "Hi",
      name: "Nghia",
      avatar: Avatar,
    },
    {
      id: 4,
      text: "Hi",
      name: "Nghia",
      avatar: Avatar,
    },
    {
      id: 5,
      text: "Hi",
      name: "Nghia",
      avatar: Avatar,
    },
  ]);

  const messageEndRef = useRef(null);

  const addMessage = (newMessage) => {
    const message = {
      id: messages.length + 1,
      text: newMessage,
      name: "You",
      avatar: Avatar,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-[400px] h-[500px] bg-[#EEEAEA] fixed bottom-3 right-3 shadow-lg rounded-lg overflow-hidden">
      <ChatHeader toggleChatBox={toggleChatBox} />
      <div className="flex-1 overflow-y-auto mt-2">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <SendMessage addMessage={addMessage} />
    </div>
  );
};

export default ChatBox;
