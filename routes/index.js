const router = require('express').Router()

const Controller = require('../controllers/controller.js')

// User
router.get('/', Controller.home)
router.get('/login', Controller.login)
router.get('/register', Controller.register)
router.get('/logout', Controller.logout)

router.get('/status', Controller.status)
router.get('/delete', Controller.delete)

// Character
router.get('/character', Controller.character)

router.get('/character/give/:id', Controller.give)
router.get('/character/give/:id', Controller.postGive)


module.exports = router