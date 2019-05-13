const register = require('./register')
const login = require('./login')
const verify = require('./verify')
const verifyMiddleware = require('./verifyMiddleware')
const checkUsername = require('./checkUsername')

module.exports = {
    register,
    login,
    verify,
    verifyMiddleware,
    checkUsername
}