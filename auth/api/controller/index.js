const register = require('./register');
const login = require('./login');
const verify = require('./verify');
const verifyMiddleware = require('./verifyMiddleware');
const checkUsername = require('./checkUsername');
const checkStatus = require('./checkStatus');

module.exports = {
    register,
    login,
    verify,
    verifyMiddleware,
    checkUsername,
    checkStatus
}