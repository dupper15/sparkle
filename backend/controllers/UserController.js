const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')
const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')

const createUser = async (req, res) => {
    try {
        const {userName, email, password, confirmPassword} = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = emailRegex.test(email)
        if ( !userName ||!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Email invalid'
            })
        }
        else if ( password !== confirmPassword){
            return res.status(400).json({
                status: 'ERROR',
                message: 'The password is equal confirm password'
            })
        }
        const checkUser = await User.findOne({
            email: email
        })

        if (checkUser){
            return res.status(400).json({
                status: 'ERROR',
                message: 'The email is exist'
            })
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hash = bcrypt.hashSync(password, 10)
            
        const createdUser = await User.create({
            userName,
            email, 
            password: hash,
            verify: false,
            verificationCode,
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: '22520734@gm.uit.edu.vn',
                pass: 'kvfs inzl katz poyv'
            },
        });

        const mailOptions = {
            from: '"Sparkle" <22520734@gm.uit.edu.vn>',
            to: `${email}`,
            subject: 'Sparkle Email Verification',
            html: `
                <p>Hi ${userName},</p>
                <p>Please verify your email by entering the 6-digit code below:</p>
                <h3>${verificationCode}</h3>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            status: 'OK',
            message: 'Verification email sent. Please check your inbox.',
            data: createdUser
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = emailRegex.test(email)
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Email invalid'
            })
        }
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginGoogle = async (req, res) => {
    try {
        const { emailGoogle, name, image } = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = emailRegex.test(emailGoogle)
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Email invalid'
            })
        }
        const response = await UserService.loginGoogle(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginFacebook = async (req, res) => {
    try {
        const { emailFacebook, name, image, fb } = req.body
        const response = await UserService.loginFacebook(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await UserService.getDetailUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateInfoUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        console.log('data', data)
        if (!userId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await UserService.updateInfoUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken =  async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token){
            return res.status(200).json({
                status: 'ERROR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwt(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser =  async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: "OK",
            message: "Logout successfully"
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.params.id
        const {passwordCurrent, passwordNew, passwordConfirm} = req.body
        const user = await User.findById({_id: userId})
        const isMatch = bcrypt.compareSync(passwordCurrent, user.password);

        if (!passwordCurrent || !passwordNew || !passwordConfirm) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            });
        }

        if (!isMatch) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Current password is incorrect'
            });
        }
        else if (passwordNew !== passwordConfirm){
            return res.status(400).json({
                status: 'ERROR',
                message: 'The password is equal confirm password'
            })
        }
        const response = await UserService.changePassword(userId, passwordNew)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Verification code is required',
            });
        }

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
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const sendEmail = async (req, res) => {
    try {
        const data = req.body;
        // Kiểm tra xem email có tồn tại trong hệ thống hay không
        const user = await User.findOne({ email: data.email });
        console.log("user", user)
        if (!user) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Email is not register',
            });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: '22520734@gm.uit.edu.vn',
                pass: 'kvfs inzl katz poyv'
            },
        });

        const mailOptions = {
            from: '"Sparkle" <22520734@gm.uit.edu.vn>',
            to: `${data.email}`,
            subject: 'Sparkle Email Verification',
            html: `
                <p>Hi,</p>
                <p>Your password reset verification code is:</p>
                <h3>${verificationCode}</h3>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            status: 'OK',
            message: 'Send email verified successfully',
        });
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const verifyForgotPassword = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Verification code is required',
            });
        }

        // Tìm người dùng với mã xác minh
        const user = await User.findOne({ verificationCode: code.verificationCode });

        if (!user) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Invalid or expired verification code',
            });
        }
        // Cập nhật trạng thái xác minh
        user.verify = true;
        user.verificationCode = undefined; 
        await user.save();

        return res.status(200).json({
            status: 'OK',
            message: 'Email verified successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword} = req.body
        if (!password || !confirmPassword){
            return res.status(404).json({
                status: 'ERROR',
                message: 'The input is required',
            });
        } else if (password !== confirmPassword){
            return res.status(404).json({
                status: 'ERROR',
                message: 'The password is equal confirm password'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Invalid email or verification code',
            });
        }

        // Cập nhật mật khẩu mới
        user.password = bcrypt.hashSync(password, 10);
        await user.save();

        return res.status(200).json({
            status: 'OK',
            message: 'Password reset successfully',
        });
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    loginGoogle,
    loginFacebook,
    getAllUser,
    getDetailUser,
    updateInfoUser,
    refreshToken,
    logoutUser,
    changePassword,
    verifyEmail,
    sendEmail,
    verifyForgotPassword,
    forgotPassword
}