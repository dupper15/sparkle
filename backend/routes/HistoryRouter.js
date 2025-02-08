const express = require("express");
const router = express.Router();
const historyController = require("../controllers/HistoryController");

router.post("/create", historyController.createHistoryRoute);
router.get("/getAll/:id", historyController.getAllHistory);

module.exports = router;
