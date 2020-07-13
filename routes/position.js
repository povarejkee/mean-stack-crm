const express = require('express')
const positionControllers = require('../controllers/position')
const passport = require('passport')
const router = express.Router()

router.get('/:categoryId', passport.authenticate('jwt', { session: false }), positionControllers.getAllByCategory)
router.post('/', passport.authenticate('jwt', { session: false }), positionControllers.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), positionControllers.edit)
router.delete('/:id', passport.authenticate('jwt', { session: false }), positionControllers.remove)

module.exports = router
