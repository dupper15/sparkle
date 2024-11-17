const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {type: String, default: null},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: {type: String, default: null},
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
