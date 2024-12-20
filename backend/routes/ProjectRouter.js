const express = require("express");
const router = express.Router();
const projectController = require("../controllers/ProjectController");

router.post("/:id/create", projectController.createProject);
router.get("/get-detail/:id", projectController.getDetailProject);
router.get("/getAll/:id", projectController.getAllProject);
router.get("/get-teamProject/:id", projectController.getAllTeamProject);
router.get("/get-projectPublic", projectController.getPublic);
router.put("/update/:id", projectController.updateProject);
router.put("/add-project/:id", projectController.addProject);
router.put("/update-public/:id", projectController.updatePublic);
router.put("/update-private/:id", projectController.updatePrivate);
router.delete("/delete/:id", projectController.deleteProject);
router.put("/:id/add-editor", projectController.addEditor);
router.post("/get-avatar", projectController.getAvatar);
router.put("/rename-project/:id", projectController.renameProject);

module.exports = router;
