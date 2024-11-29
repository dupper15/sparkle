const express = require("express");
const router = express.Router();
const projectController = require("../controllers/ProjectController");

router.post("/:id/create", projectController.createProject);
router.get("/get-detail/:id", projectController.getDetailProject);
router.get("/getAll/:id", projectController.getAllProject);
router.get("/get-teamProject/:id", projectController.getAllTeamProject);
router.put("/update/:id", projectController.updateProject);
router.delete("/delete/:id", projectController.deleteProject);
router.put("/:id/add-editor", projectController.addEditor);
module.exports = router;
