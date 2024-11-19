const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");

router.post("/send-message", messageController.sendMessage);
router.get("/get-message/:groupId", messageController.getMessage);
router.put("/deleted-message/:id", messageController.deleteMessage);

module.exports = router;
