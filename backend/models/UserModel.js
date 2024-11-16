const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: String,
        isOnline: { type: Boolean, default: false },
        isLinkedFB: { type: Boolean, default: false },
        isLinkedGG: { type: Boolean, default: false }
    },
    { 
        timestamps: true 
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
