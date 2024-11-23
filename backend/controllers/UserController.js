const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')
const User = require('../models/UserModel')
const bcrypt = require("bcrypt")

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

        const hash = bcrypt.hashSync(password, 10)
            
        const createdUser = await User.create({
            userName,
            email, 
            password: hash,
        })

        return res.status(200).json({
            status: 'OK',
            message: 'Sign up success',
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
    console.log("req.cookies", req.cookies)
    try {
        const token = req.cookies.refresh_token
        console.log("token", token)
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


module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getDetailUser,
    updateInfoUser,
    refreshToken
}