const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        userArray: {type: Array, required: true},
        canvasArray: {type: Array, required: true},
        projectName: {type: String, required: true},
        owner: {type: String, required: true},
        editorArray: {type: Array, required: true},
        isPublic: {type: Boolean, required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
    },
    {
        timestamps: true
    }
)

const Project = mongoose.model('Project', projectSchema)
module.exports = Project