const mongoose = require('mongoose')

const canvasSchema = new mongoose.Schema({
    background: {type: String, default: "#ffffff"}, 
    componentArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        default: null,
    }],
}, {
    timestamps: true
})

const Canvas = mongoose.model('Canvas', canvasSchema)
module.exports = Canvas