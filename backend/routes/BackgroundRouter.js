const express = require("express");
const router = express.Router();
const backgroundController = require("../controllers/BackgroundController");

router.post("/create", backgroundController.createBackground);
router.get("/getAll/:id", backgroundController.getAllBackground);
router.delete("/delete/:id", backgroundController.deleteBackground);

module.exports = router;
