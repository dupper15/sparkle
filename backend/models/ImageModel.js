const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        left: {type: Number, required: true},
        top: {type: Number, required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        opacity: {type: Number, required: true, default:1},
        z_index: {type: Number, required: true, default:1},
        rotate: {type: Number, required: true, default:0},
        // image: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "ImageUpload",
        //     required: true
        // }
    },
    {
        timestamps: true
    }
)

const Image = mongoose.model('Image', imageSchema)
module.exports = Image