const { Character, Relationship } = require('../models')

const { likeRespond, dislikeRespond } = require('../helpers/respond.js')

const { upHeart, downHeart } = require('../helpers/hearts.js')
const { upStatusM, upStatusWM, downStatus } = require('../helpers/status.js')

class ChController{

    static character(req, res) {
        let dataCH
        let dataREL
        Character.findAll({
            order: [['gender','DESC']]
        })
            .then((ch) => {
                dataCH = ch
                return Relationship.findAll()
            })
            .then((rel) => {
                dataREL = rel
                res.render('ch',{ch: dataCH,rel: dataREL,usr: req.session.user})
            })
    }

    static give(req, res) {
        let target = +req.params.id
        let dataCH
        let dataREL
        Character.findOne({
            where: {id: target}
        })
            .then((ch) => {
                dataCH = ch
                dataCH.likeRespond = likeRespond
                dataCH.dislikeRespond = dislikeRespond
                return Relationship.findOne({
                    where: {
                        UserId: req.session.user,
                        CharacterId: target
                    }
                })
            })
            .then((rel) => {
                dataREL = rel
                if (rel === null) {
                    return Relationship.create({
                                UserId: req.session.user,
                                CharacterId: target,
                            }, {
                                where: {
                                    UserId: req.session.user,
                                    CharacterId: target
                                }
                            })
                } else {
                    res.render('give',{ch: dataCH,rel: dataREL,usr: req.session.user})
                }
            })
            
            .then(() => {
                res.render('give',{ch: dataCH,rel: dataREL,usr: req.session.user})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static giveIC(req, res) {
        let target = +req.params.id
        let dataCH
        Character.findOne({
            where: {id: target}
        })
            .then((ch) => {
                dataCH = ch
                return Relationship.findOne({
                    where: {
                        UserId: req.session.user,
                        CharacterId: target
                    }
                })
            })
            .then((rel) => {
                if (dataCH.gender === 'man') {
                    return Relationship.update({
                        UserId: req.session.user,
                        CharacterId: target,
                        hearts: upHeart(rel.hearts),
                        status: upStatusM(rel.hearts)
                    }, {
                        where: {
                            UserId: req.session.user,
                            CharacterId: target
                        }
                    })
                } else if (dataCH.gender === 'woman') {
                    return Relationship.update({
                        UserId: req.session.user,
                        CharacterId: target,
                        hearts: upHeart(rel.hearts),
                        status: upStatusWM(rel.hearts)
                    }, {
                        where: {
                            UserId: req.session.user,
                            CharacterId: target
                        }
                    })
                }
            })
        
            .then(() => {
                res.redirect(`/character/give/${target}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static giveT(req, res) {
        let target = +req.params.id
        let dataCH
        Character.findOne({
            where: {id: target}
        })
            .then((ch) => {
                dataCH = ch
                return Relationship.findOne({
                    where: {
                        UserId: req.session.user,
                        CharacterId: target
                    }
                })
            })
                    
            .then((rel) => {
                return Relationship.update({
                    UserId: req.session.user,
                    CharacterId: target,
                    hearts: downHeart(rel.hearts),
                    status: downStatus(rel.hearts)
                }, {
                    where: {
                        UserId: req.session.user,
                        CharacterId: target
                    }
                })
            })
        
            .then(() => {
                res.redirect(`/character/give/${target}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = ChController