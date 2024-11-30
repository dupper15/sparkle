const express = require("express");
const router = express.Router()
const canvasController = require('../controllers/CanvasController')

router.post('/create', canvasController.createCanvas)
router.get('/getAll/:id', canvasController.getAllCanvas)
router.put('/update/:id', canvasController.updateCanvas)
router.delete('/delete/:id', canvasController.deleteCanvas)
router.post('/addComponent/:id', canvasController.addComponentToCanvas);
router.get('/get-detail/:id', canvasController.getDetailCanvas);
router.get('/get-components/:id', canvasController.getComponentsByCanvasId);

module.exports = router