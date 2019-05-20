const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkEmail, checkUserAccountStatus } = require('../helper');

const privateKey = "TWITTER_CLONE_DATABASE@NODE_WITH_REACT";

const login = async (req, res) => {
    const userCredential = {
        email : req.body.email,
        password: req.body.password
    }
    if(!checkEmail(userCredential.email)){
        authFail(res);
    }else{
        User.findOne({ email: userCredential.email }).lean().then((user) => {
            if(user){
                let hashPassword = user.password;
                bcrypt.compare(userCredential.password, hashPassword, function(err, validPassword) {
                    if(validPassword){
                        let tokenPayload = {
                            email: user.email,
                            _id: user._id
                        }
                        jwt.sign(tokenPayload, privateKey, { expiresIn: "12h" }, (error, token) => {
                            if(error){
                                authFail(res)
                            }else{
                                let resData = {
                                    email: user.email,
                                    _id: user._id,
                                    usernameRequire: user.username ? false : true,
                                    ...user
                                }
                                delete resData.password;
                                delete resData.__v
                                if(!resData.usernameRequire){
                                    resData.username = user.username
                                }
                                const { status, message, data } = checkUserAccountStatus(user)
                                if(status != 200){
                                    if(!data.username && data.username != false){
                                        res.status(status).json({
                                            status,
                                            message,
                                            data: data
                                        })
                                    }else{
                                        res.status(200).json({
                                            status: 200,
                                            token,
                                            message,
                                            data: {
                                                ...resData,
                                            }
                                        })
                                    }
                                } else {
                                    res.status(200).json({
                                        status: 200,
                                        token,  
                                        data: resData
                                    })    
                                }
                            }
                        })
                    } else {
                        authFail(res)
                    }
                });
            }else{
                authFail(res);
            }
        }).catch(()=>{
            authFail(res);
        })
    }
}

const authFail = (res)=>{
    res.status(500).json({
        status: 500,
        message: 'Auth fail!'
    })
}

module.exports = login;