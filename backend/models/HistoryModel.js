const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      require: true,
    },
    content: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);
module.exports = History;
