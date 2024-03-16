const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

// POST
router.route("/").post(aiController.baseModel);
router.route("/qa").post(aiController.haystackModel);
router.route("/gpt").post(aiController.gptModel);
router.route("/pipeline").post(aiController.pipelineModel);

module.exports = router;
