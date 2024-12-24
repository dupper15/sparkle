const mongoose = require("mongoose");
const Component = require("./ComponentModel");

const shapeSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  shapeType: { type: String, required: true },
  height: { type: Number, default: 90 },
  width: { type: Number, default: 90 },
  color: { type: String, default: "#e5e5e5" },
});

const Shape = Component.discriminator("Shape", shapeSchema);
module.exports = Shape;
