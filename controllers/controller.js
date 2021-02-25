const { User, Character, Relationship } = require('../models')

class Controller{
    static home(req, res) {
        let name = req.session.name ? req.session.name : ''
        res.render('home',{data: name })
    }

    static character(req, res) {
        let dataCH
        let dataREL
        Character.findAll({
            order: [['gender','DESC']]
        })
            .then((ch) => {
                dataCH = ch
                dataCH.forEach(el => {
                    el.likeRespond = Character.likeRespond()
                    el.dislikeRespond = Character.dislikeRespond()
                })
                console.log(dataCH)
                return Relationship.findAll()
            })
            .then((rel) => {
                console.log(rel)
                dataREL = rel
                res.render('ch',{ch: dataCH,rel: dataREL,usr: req.session.id})
            })
    }

    static giveIC(req, res) {
        let target = +req.params.id
        let data = req.body
        let obj = {
            UserId: req.session.id,
            CharacterId: target,
            hearts: data.hearts++,
        }
        Relationship.update(obj, {
            where: {
                UserId: req.session.id,
                CharacterId: target
            }
        })
            .then(() => {
                res.redirect('/character')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller