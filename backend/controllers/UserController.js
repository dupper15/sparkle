const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

module.exports = {
    createUser
}