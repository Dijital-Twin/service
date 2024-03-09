const express = require("express");
const router = express.Router();
const modelController = require("../controllers/model.controller");

// GET
router.route("/").get(modelController.getAllModels);
router.route("/:id").get(modelController.getModelById);

// POST
router.route("/").post(modelController.createModel);

// PUT
router.route("/:id").put(modelController.updateModel).delete(modelController.deleteModel);

// DELETE
router.route("/:id").delete(modelController.deleteModel);

module.exports = router;
