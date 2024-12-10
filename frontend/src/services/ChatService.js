import axios from "axios";

export const sendChatBot = async (text, imageUrl) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/message/send-chat-bot`,
      { text, imageUrl }
    );
    if (response) {
      return response.data;
    } else {
      throw new Error("No data returned from API");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data?.message || "API call failed"
      : error.message || "Unknown error";
    console.error("Error in sendChatBot:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const sendImageBot = async (text) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/message/send-image-bot`,
      { text }
    );
    if (response) {
      return response.data;
    } else {
      throw new Error("No data returned from API");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data?.message || "API call failed"
      : error.message || "Unknown error";
    console.error("Error in sendChatBot:", errorMessage);
    throw new Error(errorMessage);
  }
};
