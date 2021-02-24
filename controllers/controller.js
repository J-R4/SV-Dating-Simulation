const { User, Character, Relationship } = require('../models')

class Controller{
    static home(req, res) {
        res.render('home',{data: ''})
    }
}

module.exports = Controller