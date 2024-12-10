import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { FaRobot } from "react-icons/fa6";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { FaPencil } from "react-icons/fa6";

const SendMessage = ({ addMessage }) => {
  const { isDarkMode } = useDarkMode();
  const [isChatBot, setIsChatBot] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [isImageBot, setIsImageBot] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;
    if (image) {
      imageUrl = await handleUploadImage(image);
    }
    if (message.trim() || imageUrl) {
      addMessage(message, imageUrl, isChatBot, isImageBot);
      setMessage("");
      setImage(null);
    }
  };

  const handleUploadImage = async (imageFile) => {
    try {
      const uploadPreset = "afh5sfc";
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image")) {
        const blob = items[i].getAsFile();
        if (blob) {
          const file = new File([blob], "pasted-image.png", {
            type: blob.type,
          });
          setImage(file);
        }
        break;
      }
    }
  };

  const chatBotClick = () => setIsChatBot((prev) => !prev);
  const chatImageClick = () => setIsImageBot((prev) => !prev);
  return (
    <div
      className={`w-full ${
        image ? "h-[150px]" : "h-[60px]"
      } flex items-center justify-center px-4 ${
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
        <span
          className={`text-2xl cursor-pointer rounded-full p-2 ${
            isImageBot ? "bg-[#610BEF]" : ""
          }`}
          onClick={chatImageClick}>
          <FaPencil className={`${isImageBot ? "text-white" : ""}`} />
        </span>
        <div className='w-full focus:outline-none bg-[#F2F2F2] text-black rounded-lg shadow px-4 py-2 flex flex-col'>
          <div className='flex-grow'>
            <input
              className='input w-full focus:outline-none bg-transparent text-black rounded-lg shadow px-4 py-2'
              placeholder='Type a message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPaste={handlePaste}
            />
          </div>
          {image && (
            <div className='flex-shrink-0 w-16 h-16 ml-2 relative'>
              <img
                src={URL.createObjectURL(image)}
                alt='Preview'
                className='w-full h-auto object-cover rounded-lg cursor-pointer'
              />
              <button
                onClick={() => setImage(null)}
                type='button'
                className='absolute top-0 right-0 text-red-500 bg-white rounded-full w-6 h-6 flex items-center justify-center border border-red-500 hover:bg-slate-200 text-sm'>
                ✕
              </button>
            </div>
          )}
        </div>
        <span
          onClick={handleSubmit}
          className='text-2xl cursor-pointer flex items-center hover:text-[#610BEF]'>
          <LuSendHorizonal />
        </span>
      </form>
    </div>
  );
};

export default SendMessage;
