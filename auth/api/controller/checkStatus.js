const User = require('../models/user');

const checkStatus = (req, res) =>{
    let userData = req.validUserData;
    User.findOne({_id: userData._id},{password:0, __v:0}).exec().then((data)=>{
        if(data){
            if(data.active){
                if(data.emailVerify){
                    if(data.username){
                        res.status(200).json({
                            status: 200,
                            message: 'profile fetch successfully',
                            data
                        })
                    }else{
                        error(res, 'please set your username first', {
                            username: false
                        })
                    }
                }else{
                    error(res, 'please verify your email', {
                        emailVerify: false
                    })
                }
            }else{
                error(res, 'account deactivated', {
                    active: false
                })
            }
        }else{
            error(res, 'user not found', {
                user: false
            })
        }
    })
}

const error = (res, message, data)=>{
    res.status(202).json({
        status: 202,
        message,
        data
    })
}

module.exports = checkStatus;