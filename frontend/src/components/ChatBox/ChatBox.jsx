import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import ChatHeader from "./ChatHeader";
import socket from "../../utils/socket";
import { useSelector } from "react-redux";

const ChatBox = ({ toggleChatBox }) => {
  const [messages, setMessages] = useState([]);
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!project?.id) return;
    const handleLoadMessages = (loadedMessages) => {
      setMessages(loadedMessages);
    };
    socket.emit("joinRoom", project.id);
    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on("loadMessages", handleLoadMessages);
    socket.on("chatMessage", handleNewMessage);

    return () => {
      socket.off("loadMessages", handleLoadMessages);
      socket.off("chatMessage", handleNewMessage);
    };
  }, [project?.id]);
  const sendMessage = (text) => {
    if (user?.id && project?.id && text) {
      socket.emit("chatMessage", {
        userId: user.id,
        roomId: project.id,
        text,
      });
    } else {
      console.error("Message or user/project data is missing!");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='flex flex-col w-[400px] h-[500px] bg-[#EEEAEA] fixed bottom-3 right-3 shadow-lg rounded-lg overflow-hidden'>
      <ChatHeader toggleChatBox={toggleChatBox} />
      <div className='flex-1 overflow-y-auto mt-2'>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <SendMessage addMessage={sendMessage} />
    </div>
  );
};

export default ChatBox;
