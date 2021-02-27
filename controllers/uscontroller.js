const { User } = require('../models')

const { encryptThis } = require('../middleware/bcrypt.js')
const { decryptThis } = require('../middleware/bcrypt.js')

let nodemailer = require('nodemailer');

const se = require('../helpers/nodemailer.js')

class UsController {

    static register(req, res) {
        res.render('register.ejs')
    }

    static postRegister(req, res) {
        let body = req.body
        let obj = {
            name: body.name,
            email: body.email,
            password: encryptThis(body.password),
            gender: body.gender,
            age: +body.age
        }

        let transporter = nodemailer.createTransport(se) // isi di helpers nodemailer

        let receiveMail = {
            from: 'josfanbot@gmail.com',
            to: body.email,
            subject: 'Thank You for play with us ✔',
            text: `Congratulation ${body.name} your account was successfully created!, 
            its good to see you using our application,
            if you had any trouble you can reply this email`, 
        }

        User.create(obj)
            .then(() => {
                if (body) {
                    transporter.sendMail(receiveMail, (err, info) => {
                        if (err) throw err;
                        console.log('Email sent: ' + info.response);
                    });
                    res.redirect('/')
                } else {
                    res.redirect('/')
                }
                
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static login(req, res) {
        res.render('login')
    }

    static postLogin(req, res) {
        let body = req.body
        User.findOne({
            where: {
                email: body.email
            }
        })
            .then((usr) => {
                if (!usr) {
                    res.redirect('/login')
                } else {
                    if (decryptThis(body.password,usr.password)) {
                        req.session.isLogin = true
                        req.session.user = usr.id
                        req.session.name = usr.name
                        req.session.email = usr.email
                        req.session.password = usr.password
                        req.session.gender = usr.gender
                        req.session.age = usr.age
                        res.redirect('/profile')
                    } else {
                        console.log('wrong password')
                        req.session.isLogin = false
                        res.redirect('/login')
                    }
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.isLogin = false
        req.session.user = null
        req.session.name = null
        req.session.email = null
        req.session.password = null
        req.session.gender = null
        req.session.age = null
        res.redirect('/')
    }

    static delete(req, res) {
        let target = req.params.email
        User.destroy({
            where: {email: target}
        })
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static profile(req, res) {
        res.render('profile',{name: req.session.name,usr: req.session})
    }
}

module.exports = UsController