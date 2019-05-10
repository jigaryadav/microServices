var jwt = require('jsonwebtoken');
const privateKey = "TWITTER_CLONE_DATABASE@NODE_WITH_REACT";

const verify = async (req, res) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const userData = jwt.verify(token, privateKey, { expiresIn: "12h" })
        res.status(200).json({
            status: 200,
            valid: true,
            message: 'token is valid',
            data: userData
        })
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: 'Unexpected token / token expired'
        })
    }
}

module.exports = verify;