const express = require('express')
const analyticsControllers = require('../controllers/analytics')
const router = express.Router()

router.get('/analytics', analyticsControllers.analytics)
router.get('/overview', analyticsControllers.overview)

module.exports = router
