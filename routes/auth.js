const express = require('express')
const authControllers = require('../controllers/auth')
const router = express.Router()

router.post('/login', authControllers.login)
router.post('/registry', authControllers.registry)

module.exports = router
