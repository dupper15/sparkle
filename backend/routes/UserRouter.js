const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')
const  {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/sign-up', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/login-google', userController.loginGoogle)
router.post('/login-facebook', userController.loginFacebook)
router.post('/logout', userController.logoutUser)
router.get('/getAll', userController.getAllUser)
router.get('/get-detail/:id', authMiddleware, userController.getDetailUser)
router.put('/update-info/:id', authMiddleware, userController.updateInfoUser)
router.post('/refresh-token' , userController.refreshToken);
router.put('/change-password/:id', authMiddleware, userController.changePassword)
router.get('/verify-email', userController.verifyEmail);
router.post('/send-email', userController.sendEmail);
router.get('/verify-password', userController.verifyForgotPassword);
router.put('/forgot-password', userController.forgotPassword)

module.exports = router