const express = require("express");
const router = express.Router()
const imageController = require('../controllers/ImageController')
// const upload = require('../middlewares/multer')

router.post('/upload/:id', imageController.uploadImage)
router.get('/getAll/:id', imageController.getAllImage)
router.post('/create', imageController.createImage)
router.get('/get-detail/:id', imageController.getDetailImage)
router.put('/update/:id', imageController.updateImage)
router.delete('/delete/:id', imageController.deleteImage)


module.exports = router