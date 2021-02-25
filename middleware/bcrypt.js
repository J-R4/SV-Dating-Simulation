function encryptThis(pass, salt = 10) {
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}

function decryptThis(pass, hash) {
    let result = bcrypt.compareSync(pass, hash)
    return result // return true or false
}

module.exports = {encryptThis, decryptThis}