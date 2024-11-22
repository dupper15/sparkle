const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded){
        if (err){
            return res.status(404).json({           
                status: 'ERROR',
                message: 'The authentication'
            })
        }
        const { payload } = decoded
        if (decoded?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'The authentication'
            })
        }
        
    })
}

module.exports = { authMiddleware}