const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config()

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '24h' })

    return access_token
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwt = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err){
                    resolve({
                        status: "ERROR",
                        message: "The authentication",                   
                    })
                    return;
                }
                const {payload} = user
                const access_token = await generalAccessToken({
                    id: payload?.id
                })
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: access_token
                })   
            })
                     
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwt,
}