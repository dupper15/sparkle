import axios from "axios";

export const sendChatBot = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/message/send-chat-bot`,
      { data }
    );

    // Kiểm tra nếu API trả về dữ liệu hợp lệ
    if (response) {
      return response.data;
    } else {
      throw new Error("No data returned from API");
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data?.message || "API call failed"
      : error.message || "Unknown error";

    // Log lỗi để kiểm tra chi tiết hơn
    console.error("Error in sendChatBot:", errorMessage);
    throw new Error(errorMessage);
  }
};
