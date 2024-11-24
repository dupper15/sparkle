const mongoose = require('mongoose')

const canvasSchema = new mongoose.Schema({
    background: {type: String, required: true}, //should be a URL, but for now it's a string; should be renamed to backgroundURL
    componentArray: {
        type: Array[{
            type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true
        }], required: true
    },
}, {
    timestamps: true
})

const Canvas = mongoose.model('Canvas', canvasSchema)
module.exports = Canvas