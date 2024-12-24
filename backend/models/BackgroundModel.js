const mongoose = require("mongoose");

const backgroundSchema = new mongoose.Schema(
  {
    background_url: { type: String, default: null },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Background = mongoose.model("Background", backgroundSchema);
module.exports = Background;
