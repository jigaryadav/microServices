const bcrypt = require('bcrypt');
const { checkRequsterBody } = require('../helper');
const User = require('../models/user');

const saltRounds = 10;

const register = async (req, res) => {
    const userCredential = {
        email : req.body.email,
        password: req.body.password
    }
    const { status, message } = await checkRequsterBody(userCredential)
    if(status){
        bcrypt.hash(userCredential.password, saltRounds, (err, hash)=>{
            if(err){
                res.status(500).json({
                    status: 500,
                    message: err
                })
            }else{
                const user = new User({
                    email: userCredential.email,
                    password: hash
                })
                user.save().then((result)=>{
                    res.status(200).json({
                        status: 200,
                        message: 'user created!'
                    })
                }).catch((error)=>{
                    res.status(500).json({
                        status: 500,
                        message: error
                    })
                })  
            }
        })
    }else{
        res.status(401).json({
            status: 401,
            message : message
        })
    }
}

module.exports = register