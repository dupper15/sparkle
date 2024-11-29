const mongoose = require('mongoose')

const textSchema = new mongoose.Schema(
    {
        left: {type: Number, required: true},
        top: {type: Number, required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        opacity: {type: Number, default:1},
        z_index: {type: Number, default:1},
        rotate: {type: Number, default:0},
        content: {type: String, required: true, default: "Add a text"},
        color: {type: String, default: "#000000"},
        fontSize: {type: Number, default: 16},
        fontFamily: {type: String, default: "Times new Roman"},
        fontStyle: {type: String, default: null},
    },
    {
        timestamps: true
    }
)

const Text = mongoose.model('Text', textSchema)
module.exports = Text