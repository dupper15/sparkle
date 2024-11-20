const express = require("express");
const router = express.Router()
const componentController = require('../controllers/ComponentController')

router.post('/create', componentController.createComponent)
router.get('/getAll', componentController.getAllComponent)
router.get('/get-detail/:id', componentController.getDetailComponent)
router.put('/update/:id', componentController.updateComponent)
router.delete('/delete/:id', componentController.deleteComponent)

module.exports = router