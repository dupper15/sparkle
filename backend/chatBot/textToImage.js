const { fal } = require("@fal-ai/client");
require("dotenv").config();

const API_KEY = process.env.API_KEY_IMAGE;

fal.config({
  credentials: API_KEY,
});

async function textToImage(text) {
  let lastStatus = "";

  try {
    const result = await fal.subscribe("fal-ai/ideogram/v2/turbo", {
      input: {
        prompt: text,
        aspect_ratio: "1:1",
        expand_prompt: true,
        style: "auto",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status !== lastStatus) {
          console.log(`Trạng thái cập nhật: ${update.status}`);
          lastStatus = update.status;
        }

        if (update.status === "IN_PROGRESS") {
          update.logs
            .map((log) => log.message)
            .forEach((message) => console.log("Log:", message));
        }
      },
    });

    return result.data;
  } catch (error) {
    console.error("Error generating image:", error.message);
    throw error;
  }
}

module.exports = {
  textToImage,
};
