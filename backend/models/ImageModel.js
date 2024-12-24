const mongoose = require("mongoose");
const Component = require("./ComponentModel");

const imageSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  height: { type: Number, default: 100 },
  width: { type: Number, default: 100 },
  image: {
    type: String,
    required: true,
  },
});

const Image = Component.discriminator("Image", imageSchema);
module.exports = Image;
