const express = require("express");
const router = express.Router()
const projectController = require('../controllers/ProjectController')

router.post('/:id/create' , projectController.createProject)
router.get('/get-detail/:id', projectController.getDetailProject)
router.put('/update/:id', projectController.updateProject)
router.delete('/delete/:id', projectController.deleteProject)

module.exports = router