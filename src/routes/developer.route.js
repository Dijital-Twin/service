const express = require('express')
const router = express.Router()
const developerController = require('../controllers/developer.controller.js')

/* health check */
router.get('/health', developerController.health)

module.exports = router
