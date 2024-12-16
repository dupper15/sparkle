const mongoose = require('mongoose')
const Component = require('./ComponentModel');

const textSchema = new mongoose.Schema(
    {
        x: {type: Number, required: true},
        y: {type: Number, required: true},
        height: {type: Number, default: 40},
        width: {type: Number, default: 90},
        // opacity: {type: Number, default:1},
        // z_index: {type: Number, default:1},
        // rotate: {type: Number, default:0},
        content: {type: String, default: "Add a text"},
        color: {type: String, default: "#e5e5e5"},
        fontSize: {type: Number, default: 16},
        fontFamily: {type: String, default: "Times new Roman"},
        fontStyle: {type: String, default: "normal"},
        fontWeight: {type: String, default: "normal"},
        textDecorationLine: {type: String, default: "none"},
        justifyContent: {type: String, default: "center"},
    },
)

const Text = Component.discriminator('Text', textSchema)
module.exports = Text