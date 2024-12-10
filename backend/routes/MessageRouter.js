const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");

router.post("/send-message", messageController.sendMessage);
router.get("/get-message/:groupId", messageController.getMessage);
router.post("/send-chat-bot", messageController.sendChatBot);
router.post("/send-image-bot", messageController.sendImageBot);

module.exports = router;
