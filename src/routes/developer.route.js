/**
 * @swagger
 * tags:
 *   name: Dev
 */

const express = require('express')
const router = express.Router()
const developerController = require('../controllers/developer.controller.js')

/**
 * @swagger
 * /dev/health:
 *   get:
 *     tags: [Dev]
 *     summary: Checks if the API is healthy
 *     responses:
 *       200:
 *         description: API is up and running
 */
router.get('/health', developerController.health);


/**
 * @swagger
 * /dev/login:
 *   post:
 *     tags: [Dev]
 *     summary: Login to the API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', developerController.login);

module.exports = router
