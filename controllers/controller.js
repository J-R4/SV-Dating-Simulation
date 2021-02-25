class Controller{
    static home(req, res) {
        let name = req.session.name ? req.session.name : ''
        res.render('home',{data: name })
    }
}

module.exports = Controller