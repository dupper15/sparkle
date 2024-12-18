const mongoose = require('mongoose')
const Component = require('./ComponentModel');

const textSchema = new mongoose.Schema(
    {
        x: {type: Number, required: true},
        y: {type: Number, required: true},
        height: {type: Number, default: 40},
        width: {type: Number, default: 120},
        content: {type: String, default: "Add a text"},
        color: {type: String, default: "#000000"},
        fontSize: {type: Number, default: 16},
        fontFamily: {type: String, default: "Arial"},
        fontStyle: {type: String, default: "normal"},
        fontWeight: {type: String, default: "normal"},
        textDecorationLine: {type: String, default: "none"},
        textAlign: {type: String, default: "left"},
    },
)

const Text = Component.discriminator('Text', textSchema)
module.exports = Text