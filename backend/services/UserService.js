const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  generalAccessToken,
  generalRefreshToken,
} = require("../services/JwtService");

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (!checkUser) {
        reject({
          status: "ERROR",
          message: "Account not found!",
        });
        return;
      } else if (!checkUser.verify) {
        reject({
          status: "ERROR",
          message:
            "You have not verify your email, please verify before logging in. ",
        });
        return;
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        reject({
          status: "ERROR",
          message: "The password or user is incorrect",
        });
        return;
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create user",
        error: error.message,
      });
    }
  });
};

const loginGoogle = (google) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await User.findOne({
        email: google.emailGoogle,
      });

      if (!checkUser) {
        checkUser = await User.create({
          email: google.emailGoogle,
          userName: google.name,
          image: google.image,
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create user",
        error: error.message,
      });
    }
  });
};

const loginFacebook = (facebook) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await User.findOne({
        LinkedFB: facebook.fb,
      });

      if (!checkUser) {
        checkUser = await User.create({
          email: facebook.emailFacebook,
          userName: facebook.name,
          image: facebook.image,
          LinkedFB: facebook.fb,
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create user",
        error: error.message,
      });
    }
  });
};

const getDetailUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: userId,
      });
      if (!user) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create user",
        error: error.message,
      });
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allUser,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to get all user",
        error: error.message,
      });
    }
  });
};

const updateInfoUser = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }
      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      if (!updatedUser) {
        resolve({
          status: "ERROR",
          message: "User update failed or not found",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "Update information success",
        data: updatedUser,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to update user",
        error: error.message,
      });
    }
  });
};

const changePassword = (userId, passwordNew) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      const hash = bcrypt.hashSync(passwordNew, 10);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { password: hash },
        { new: true }
      );

      if (!updatedUser) {
        resolve({
          status: "ERROR",
          message: "User update failed or not found",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "Password updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to update user",
        error: error.message,
      });
    }
  });
};

module.exports = {
  loginUser,
  loginGoogle,
  loginFacebook,
  getAllUser,
  getDetailUser,
  updateInfoUser,
  changePassword,
};
