const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');

const privateKey = "TWITTER_CLONE_DATABASE@NODE_WITH_REACT";

const login = async (req, res) => {
    const userCredential = {
        email : req.body.email,
        password: req.body.password
    }
    User.findOne({email:userCredential.email}).exec().then((user) => {
        if(user){
            let hashPassword = user.password;
            bcrypt.compare(userCredential.password, hashPassword, function(err, validPassword) {
                if(validPassword){
                    let tokenPayload = {
                        email: user.email,
                        _id: user._id
                    }
                    jwt.sign(tokenPayload, privateKey, { expiresIn: "12h" }, (error, token)=>{
                        if(error){
                            authFail(res)
                        }else{
                            res.status(200).json({
                                status:200,
                                token,
                                data:{
                                    email: user.email,
                                    _id: user._id
                                }
                            })
                        }
                    })
                } else {
                    authFail(res)
                }
            });
        }else{
            authFail(res);
        }
    })
}

const authFail = (res)=>{
    res.status(500).json({
        status: 500,
        message: 'Auth fail!'
    })
}

module.exports = login;