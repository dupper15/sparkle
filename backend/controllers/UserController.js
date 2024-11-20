const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword} = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isCheckEmail = emailRegex.test(email)
        if (!email || !password || !confirmPassword) {
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
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
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
        return res.status(200).json(response)
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
        const token = req.headers.token.split(' ')[1]
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