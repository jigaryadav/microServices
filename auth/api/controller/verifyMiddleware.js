var jwt = require('jsonwebtoken');
const privateKey = "TWITTER_CLONE_DATABASE@NODE_WITH_REACT";

const verifyMiddleware = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const userData = jwt.verify(token, privateKey, { expiresIn: "12h" })
        req.validUserData = userData
        next();
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: 'Unexpected token / token expired'
        })
    }
}

module.exports = verifyMiddleware;