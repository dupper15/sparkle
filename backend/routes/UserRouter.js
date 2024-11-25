const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')
const  {authMiddleware} = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer();

router.post('/sign-up', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.get('/getAll', userController.getAllUser)
router.get('/get-detail/:id', authMiddleware, userController.getDetailUser)
router.put('/update-info/:id', authMiddleware, userController.updateInfoUser)
router.post('/refresh-token' , userController.refreshToken);
router.put('/change-password/:id', authMiddleware, userController.changePassword)

module.exports = router