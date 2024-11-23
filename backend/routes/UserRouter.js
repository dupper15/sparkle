const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')
const  {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/sign-up', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/getAll', userController.getAllUser)
router.get('/get-detail/:id', authMiddleware, userController.getDetailUser)
router.put('/update-info/:id', userController.updateInfoUser)
router.post('/refresh-token' , userController.refreshToken);


module.exports = router