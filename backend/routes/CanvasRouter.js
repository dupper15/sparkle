const express = require("express");
const router = express.Router()
const canvasController = require('../controllers/CanvasController')

router.post('/create', canvasController.createCanvas)
router.get('/get-detail/:id', canvasController.getDetailCanvas)
router.put('/update/:id', canvasController.updateCanvas)
router.delete('/delete/:id', canvasController.deleteCanvas)

module.exports = router