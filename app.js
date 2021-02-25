const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session');
const router = require('./routes/index.js')
const path = require('path');

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);
app.use('/', router, express.static(path.join(__dirname, 'views')));

app.listen(port, () => {
    console.log(`SVDS app is listening on https://localhost:${port}`)
})