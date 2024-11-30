const mongoose = require('mongoose')
const Component = require('./ComponentModel');

const imageSchema = new mongoose.Schema(
    {
        x: {type: Number, required: true},
        y: {type: Number, required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ImageUpload",
            required: true
        }
    },
)

const Image = Component.discriminator('Image', imageSchema)
module.exports = Image