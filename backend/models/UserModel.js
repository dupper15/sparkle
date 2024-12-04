const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {type: String, default: null},
        email: { type: String, required: true, unique: true },
        password: { type: String},
        image: {type: String, default: null},
        isOnline: { type: Boolean, default: false },
        LinkedFB: { type: String, default: null },
        LinkedGG: { type: String, default: null },
        verify: {type: Boolean, default: false},
        verificationCode: { type: String, default: null },
    },
    { 
        timestamps: true 
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
