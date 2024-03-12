const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

// POST
router.route("/").post(aiController.baseModel);
router.route("/qa").post(aiController.haystackModel)

module.exports = router;
