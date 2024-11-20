const express = require("express");
const router = express.Router()
const textController = require('../controllers/TextController')

router.post('/create', textController.createText)
router.get('/get-detail/:id', textController.getDetailText)
router.put('/update/:id', textController.updateText)
router.delete('/delete/:id', textController.deleteText)

module.exports = router