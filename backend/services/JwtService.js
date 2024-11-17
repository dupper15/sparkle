const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config()

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '24h' })

    return access_token
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwt = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
            const { payload } = decoded;

            const access_token = generateAccessToken({
                id: payload?.id
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token
            });
        } catch (err) {
            resolve({
                status: "ERROR",
                message: "The authentication failed"
            });
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwt,
}