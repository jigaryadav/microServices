const User = require('../models/user');

const checkUsername = (req, res) =>{
    let username = req.body.username
    let save = req.body.save;
    let currentUserData = req.validUserData
    if(!username){
        res.status(202).json({
            status:202,
            message: 'invalud username'
        })
    }
    User.findOne({username}).then((userData)=>{
        if(!userData){
            if(save){
                try {
                    User.updateOne({_id:currentUserData._id}, {$set:{username}}).exec()
                    res.status(200).json({
                        status: 200,
                        message:'username set successfully',
                        data:{
                            username
                        }
                    })
                } catch (error) {
                    
                }
            }else{
                res.status(200).json({
                    status:200,
                    message: 'username available',
                    data:{
                        available: true
                    }
                })
            }
        }else{
            res.status(202).json({
                status:202,
                message: 'username already exiest! try again'
            })
        }
    }).catch(()=>{
        res.status(200).json({
            status:200,
            message: 'invalud username'
        })
    })
}

module.exports = checkUsername;