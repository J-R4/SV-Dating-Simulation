const router = require('express').Router()

const Controller = require('../controllers/controller.js')
const ChController = require('../controllers/chcontroller.js')
const UsController = require('../controllers/uscontroller.js')

const authIn = require('../middleware/authIn.js');
const authOut = require('../middleware/authOut.js');

router.get('/', Controller.home)

// User

router.get('/register', UsController.register)
router.post('/register', UsController.postRegister)

router.get('/login', UsController.login)
router.post('/login', UsController.postLogin)

router.get('/logout', authOut, UsController.logout)

router.get('/profile', authIn, UsController.profile) 
router.get('/delete/:email', authIn, UsController.delete)

// Character
router.get('/character', authIn, ChController.character)

router.get('/character/give/:id', authIn, ChController.give)

router.get('/character/giveIC/:id', authIn, ChController.giveIC)
router.get('/character/giveT/:id', authIn, ChController.giveT)


module.exports = router