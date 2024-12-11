const { fal } = require("@fal-ai/client");
require("dotenv").config();

const API_KEY = process.env.API_KEY_IMAGE;

// Cấu hình API Key cho fal.ai
fal.config({
  credentials: API_KEY,
});

// Hàm bất đồng bộ để tạo hình ảnh từ văn bản
async function textToImage(text) {
  let lastStatus = ""; // Biến để lưu trạng thái trước đó

  try {
    const result = await fal.subscribe("fal-ai/ideogram/v2/turbo", {
      input: {
        prompt: text, // Văn bản mô tả hình ảnh
        aspect_ratio: "1:1", // Tỉ lệ khung hình
        expand_prompt: true, // Mở rộng prompt nếu cần
        style: "auto", // Phong cách hình ảnh
      },
      logs: true,
      onQueueUpdate: (update) => {
        // Chỉ in log khi trạng thái thay đổi
        if (update.status !== lastStatus) {
          console.log(`Trạng thái cập nhật: ${update.status}`);
          lastStatus = update.status; // Cập nhật trạng thái cuối cùng
        }

        // In các log khi trạng thái là "IN_PROGRESS"
        if (update.status === "IN_PROGRESS") {
          update.logs
            .map((log) => log.message)
            .forEach((message) => console.log("Log:", message));
        }
      },
    });

    return result.data; // Trả về dữ liệu hình ảnh
  } catch (error) {
    console.error("Error generating image:", error.message);
    throw error; // Ném lỗi để xử lý thêm nếu cần
  }
}

module.exports = {
  textToImage,
};
