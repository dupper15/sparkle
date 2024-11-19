const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    userArr: { type: [String], default: [] },
    messArr: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const GroupChat = mongoose.model("GroupChat", groupChatSchema);
module.exports = GroupChat;
