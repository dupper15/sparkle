const express = require("express");
const router = express.Router();
const groupChatController = require("../controllers/GroupChatController");

router.post("/create", groupChatController.createGroupChat);
router.get("/:groupId", groupChatController.getGroupChat);
router.put("/add-user/:groupId", groupChatController.addUserToGroupChat);
router.delete("/:groupId", groupChatController.deleteGroupChat);

module.exports = router;
