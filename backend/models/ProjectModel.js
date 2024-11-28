const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    canvasArray: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Canvas",
        required: true,
      },
    ],
    projectName: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editorArray: [{ type: String, default: [] }],
    isPublic: { type: Boolean, default: false },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
