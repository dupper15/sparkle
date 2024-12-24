const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const componentSchema = new Schema(
  {
    type: { type: String, required: true, enum: ["Image", "Text", "Shape"] },
    opacity: { type: Number, required: true, default: 1 },
    zIndex: { type: Number, required: true, default: 1 },
    rotate: { type: Number, required: true, default: 0 },
    horizontalFlip: { type: Boolean, required: true, default: false },
    verticalFlip: { type: Boolean, required: true, default: false },
  },
  {
    discriminatorKey: "type",
    // _id: false,
  }
);

const Component = mongoose.model("Component", componentSchema);
module.exports = Component;
