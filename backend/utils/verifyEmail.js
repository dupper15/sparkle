const User = require("../models/UserModel");

const verifyEmail = async (req, res) => {
    try {
        const { code } = req.query;

        // Tìm người dùng với mã xác minh
        const user = await User.findOne({ verificationCode: code });

        if (!user) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Invalid or expired verification code',
            });
        }

        // Cập nhật trạng thái xác minh
        user.verify = true;
        user.verificationCode = undefined; // Xóa mã xác minh sau khi sử dụng
        await user.save();

        return res.status(200).json({
            status: 'OK',
            message: 'Email verified successfully',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal Server Error',
            error: e.message,
        });
    }
};

