const User = require('../models/UserModel')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password,  } = newUser
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
            
            const createdUser = await User.create({
                email, 
                password
            })

            if(createdUser){
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: createdUser
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser
}