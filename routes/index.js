const router = require('express').Router()

const Controller = require('../controllers/controller.js')

const authIn = require('../middleware/authIn.js');
const authOut = require('../middleware/authOut');

// User
router.get('/', Controller.home)
// router.get('/login', Controller.login)
// router.post('/login', Controller.postLogin)

// router.get('/register', Controller.register)
// router.get('/logout', authOut, Controller.logout)

// router.get('/status', authIn, Controller.status)
// router.get('/delete', Controller.delete)

// Character
router.get('/character', Controller.character)

router.post('/character/giveIC/:id/:UserId', Controller.giveIC)
// router.post('/character/giveT/:id/:UserId', Controller.giveT)


module.exports = router