const mongoose = require('mongoose')

const shapeSchema = new mongoose.Schema(
    {
        x: {type: Number, required: true},
        y: {type: Number, required: true},
        shapeType: {type: String, required: true},
        height: {type: Number, default: 90},
        width: {type: Number, default: 90},
        opacity: {type: Number, default:1},
        z_index: {type: Number, default:1},
        rotate: {type: Number, default:0},
        color: {type: String, default:"#e5e5e5"}
    },
    {
        timestamps: true
    }
)

const Shape = mongoose.model('Shape', shapeSchema)
module.exports = Shape