const { Character } = require('../models')

let likeRespond = Character.likeRespond()
let dislikeRespond = Character.dislikeRespond()

module.exports = {likeRespond,dislikeRespond}