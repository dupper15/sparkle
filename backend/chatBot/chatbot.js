const { GoogleGenerativeAI } = require("@google/generative-ai");
const googleClientId = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(googleClientId);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
require("dotenv").config();
async function generateText(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Error generating content:", err);
  }
}

module.exports = {
  generateText,
};
