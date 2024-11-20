const mongoose = require('mongoose')
const imageUploadSchema = new mongoose.Schema(
    {
        image: {type: String, required: true},
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        }
    },
    {
        timestamps: true
    }
)

const ImageUpload = mongoose.model('ImageUpload', imageUploadSchema)
module.exports = ImageUpload