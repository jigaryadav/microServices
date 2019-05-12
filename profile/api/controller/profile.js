const User = require('../models/user');

const profile = async (req, res) => {
    let userData  = req.validUserData;
    User.findOne({_id:userData._id}, {password:0, __v:0}).exec().then((user)=>{
        if(user){
            res.status(200).json({
                status: 200, 
                message: 'profile fetch success',
                data: user
            });
        }else{
            notFound(res)
        }
    }).catch((error)=>{
        console.warn('controller > profile ', error)
        notFound(res)
    })
}

const notFound = (res)=>{
    res.status(404).json({
        status: 404,
        message: 'No data found'
    })
}

module.exports = profile;