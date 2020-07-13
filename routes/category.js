const express = require('express')
const passport = require('passport')
const categoryControllers = require('../controllers/category')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), categoryControllers.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), categoryControllers.getById)
router.delete('/:id', passport.authenticate('jwt', { session: false }), categoryControllers.remove)
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('imageSrc'), categoryControllers.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('imageSrc'), categoryControllers.edit)

module.exports = router
