/**
 * @swagger
 * tags:
 *   name: Model
 */

const express = require("express");
const router = express.Router();
const modelController = require("../controllers/model.controller");
const { checkJwt, checkScopes } = require('../middleware/authorization.middleware');

/**
 * @swagger
 * /model:
 *   get:
 *     tags: [Model]
 *     security:    
 *     summary: Retrieves a list of models
 *     description: Retrieves a list of models
 *     responses:
 *       200:
 *         description: A list of models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Model'
 */
router.get("/", checkJwt, checkScopes(['read:models']), modelController.getAllModels);

/**
 * @swagger
 * /model:
 *   post:
 *     tags: [Model]
 *     summary: Creates a new model
 *     description: Creates a new model
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Model'
 *     responses:
 *       201:
 *         description: Model created
 */
router.post("/", checkJwt, checkScopes(['create:models']), modelController.createModel);

/**
 * @swagger
 * /model/{id}:
 *   get:
 *     tags: [Model]
 *     summary: Get a model by ID
 *     description: Returns a single model
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Model ID
 *     responses:
 *       200:
 *         description: A single model
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Model'
 */
router.get("/:id", checkJwt, checkScopes(['read:models']), modelController.getModelById);

/**
 * @swagger
 * /model/{id}:
 *   put:
 *     tags: [Model]
 *     summary: Updates a model by ID
 *     description: Updates a model's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Model ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Model'
 *     responses:
 *       200:
 *         description: Model updated
 */
router.put("/:id", checkJwt, checkScopes(['update:models']), modelController.updateModel);

/**
 * @swagger
 * /model/{id}:
 *   delete:
 *     tags: [Model]
 *     summary: Deletes a model by ID
 *     description: Deletes a model
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Model ID
 *     responses:
 *       204:
 *         description: Model deleted
 */
router.delete("/:id", checkJwt, checkScopes(['delete:models']), modelController.deleteModel);

/**
 * @swagger
 * components:
 *   schemas:
 *     Model:
 *       type: object
 *       required: [name, url, api_key]
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the model
 *         name:
 *           type: string
 *           description: The name of the model
 *         url:
 *           type: string
 *           description: The URL of the model
 *         api_key:
 *           type: string
 *           description: The API key of the model
 *       example:
 *         id: d5fE_asz
 *         name: ExampleModelName
 *         url: http://example.com/model
 *         api_key: ExampleApiKey
 */

module.exports = router;
