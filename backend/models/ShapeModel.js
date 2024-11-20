const mongoose = require('mongoose')

const shapeSchema = new mongoose.Schema(
    {
        left: {type: Number, required: true},
        top: {type: Number, required: true},
        height: {type: Number, required: true},
        width: {type: Number, required: true},
        opacity: {type: Number, required: true, default:1},
        z_index: {type: Number, required: true, default:1},
        rotate: {type: Number, required: true, default:0},
        type_shape: {type: String, required: true},
        color: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

const Shape = mongoose.model('Shape', shapeSchema)
module.exports = Shape