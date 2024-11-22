const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')
const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("../services/JwtService")

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
        const checkUser = await User.findOne({
            email: email
        })
        if (!checkUser){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Account is not exist'
            })
        }
        const comparePassword = bcrypt.compareSync(password, checkUser.password)
        if (!comparePassword){
            return res.status(400).json({
                status: 'ERROR',
                message: 'The password is incorrect'
            })
        }
        const access_token =  await generalAccessToken({
            id: checkUser.id,
        })
        const refresh_token = await generalRefreshToken({
            id: checkUser.id,
        })
        res.cookie('refresh-token', refresh_token, {
            HttpOnly: true,
            Secure: true,
        })
        return res.status(200).json({
            status: "OK",
            message: "Login success !",
            access_token
        })
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

const refreshTokenJwt =  async (req, res) => {
    try {
        console.log("req.cookies", req.cookies)
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


module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getDetailUser,
    updateInfoUser,
    refreshTokenJwt
}