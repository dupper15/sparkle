const express = require("express");
const router = express.Router()
const shapeController = require('../controllers/ShapeController')

router.post('/create', shapeController.createShape)
router.get('/get-detail/:id', shapeController.getDetailShape)
router.put('/update/:id', shapeController.updateShape)
router.delete('/delete/:id', shapeController.deleteShape)
router.get('/get-all', shapeController.getAllShape)

module.exports = router