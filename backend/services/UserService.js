const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser){
                resolve({
                    status: "ERROR",
                    message: "Email is already"
                })
                return;
            }

            const hash = bcrypt.hashSync(password, 10)
            
            const createdUser = await User.create({
                email, 
                password: hash,
            })

            if(createdUser){
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: createdUser
                })
                return;
            }

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create user",
                error: error.message,
            });
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (!checkUser){
                resolve({
                    status: "ERROR",
                    message: "Account not found!"
                })
                return;
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword){
                resolve({
                    status: "ERROR",
                    message: "The password or user is incorrect"
                })
                return;
            }
            
            const access_token =  await generalAccessToken({
                id: checkUser.id,
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
            })

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create user",
                error: error.message,
            });
        }
    })
}

const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: userId
            })
            if (!user){
                resolve({
                    status: "ERROR",
                    message: "Account is not defined!"
                })
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create user",
                error: error.message,
            });
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allUser
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to get all user",
                error: error.message,
            });
        }
    })
}

const updateInfoUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: userId
            })
            if (!checkUser){
                resolve({
                    status: "ERROR",
                    message: "Account is not defined!"
                })
                return;
            }
            const updatedUser = await User.findByIdAndUpdate(userId, data, {new: true});

            if (!updatedUser){
                resolve({
                    status: "ERROR",
                    message: "User update failed or not found"
                });
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to update user",
                error: error.message,
            });
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getDetailUser,
    updateInfoUser
}