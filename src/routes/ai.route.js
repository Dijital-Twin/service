const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

// POST
router.route("/").post(aiController.baseModel);

module.exports = router;
