const express = require("express");
const router = express.Router();
const imageController = require("../controllers/ImageController");

router.post("/create-upload", imageController.createImageUpload);
router.get("/getAll/:id", imageController.getAllImage);
router.post("/create", imageController.createImage);
router.get("/get-detail/:id", imageController.getDetailImage);
router.put("/update/:id", imageController.updateImage);
router.post("/remove-background", imageController.removeBackground);
router.delete("/delete/:id", imageController.deleteImage);

module.exports = router;
