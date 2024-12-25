import React, { useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useSelector } from "react-redux";
import emptyAvatar from "../../assets/default-profile-icon.png";
import chatbotAvatar from "../../assets/chatbot.jpg";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const Message = ({ message }) => {
  const { isDarkMode } = useDarkMode();
  const user = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [showTime, setShowTime] = useState(false);
  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };
  const handleShowTime = () => {
    setShowTime((prev) => !prev);
  };
  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: imageUrl.split("/").pop() || "image.jpg",
        types: [
          {
            description: "Image Files",
            accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
          },
        ],
      });

      const writableStream = await fileHandle.createWritable();
      await writableStream.write(blob);
      await writableStream.close();
      alert("Image saved successfully!");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

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
          className={`chat-bubble my-1 content-start ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}>
          {message.content && (
            <div
              onMouseDown={handleShowTime}
              className={`my-1 ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              } ${message.sender === user.id ? "text-right" : "text-left"}`}>
              {message.content}
            </div>
          )}
          {message.imageUrl && (
            <div
              className={`my-1 ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              }`}>
              <img
                src={message.imageUrl}
                alt='image'
                style={{ maxWidth: "200px", cursor: "pointer" }}
                onClick={() => openModal(message.imageUrl)}
              />
            </div>
          )}
        </div>

        {showTime && message.createdAt && (
          <div className='chat-footer text-black opacity-50'>
            {new Date(message.createdAt).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            -
            {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className='z-[9999]'>
          {/* Nền che mờ */}
          <div
            className='fixed inset-0 bg-black bg-opacity-75 z-[9998]'
            onClick={closeModal}></div>

          {/* Modal hiển thị hình */}
          <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[9999] animate-fade-in'>
            <div
              className={`relative flex items-center justify-center p-4 rounded-lg shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}>
              {/* Nút đóng */}
              <button
                className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-bold text-xl'
                onClick={closeModal}>
                ×
              </button>

              {/* Hình ảnh */}
              <img
                src={currentImage}
                alt='Preview'
                className='max-w-full max-h-[80vh] rounded-md'
              />

              {/* Nút tải hình */}
              <HiOutlineDocumentDownload
                className='absolute bottom-4 right-4 text-white text-3xl cursor-pointer hover:opacity-80'
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(currentImage);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
