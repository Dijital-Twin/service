/**
 * @swagger
 * tags:
 *   name: Dev
 *   description: API endpoints for developer spesific operations
 */

const express = require('express')
const router = express.Router()
const developerController = require('../controllers/developer.controller.js')

router.get('/health', developerController.health);
router.post('/login', developerController.login);
router.route("/audio_sample").get(developerController.audioSample);

module.exports = router

/**
 * @swagger
 * /dev/health:
 *   get:
 *     tags: [Dev]
 *     summary: Health Check
 *     description: Check the health of the API
 *     responses:
 *       200:
 *         description: OK - System is healthy
 *       500:
 *         description: Internal Server Error - System is not healthy
 */

/**
 * @swagger
 * /dev/login:
 *   post:
 *     tags: [Dev]
 *     summary: User Login
 *     description: Login with username and password to retrieve an authentication token. Used for testing authenticated endpoints.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             example:
 *               username: user
 *               password: pass
 *     responses:
 *       200:
 *         description: Authentication token retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 id_token:
 *                   type: string
 *                 scope:
 *                   type: string
 *                 expires_in:
 *                   type: number
 *                 token_type:
 *                   type: string
 *       500:
 *         description: Internal Server Error - Login failed
 */

/**
 * @swagger
 * /dev/audio_sample:
 *   get:
 *     tags: [Dev]
 *     summary: Get Audio Sample
 *     description: Downloads a sample audio file.
 *     responses:
 *       200:
 *         description: Audio file retrieved successfully
 *         content:
 *           audio/wav:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal Server Error - Unable to retrieve file
 */