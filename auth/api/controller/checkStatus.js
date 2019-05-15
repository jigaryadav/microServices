const User = require('../models/user');
const { checkUserAccountStatus } = require('../helper')

const checkStatus = (req, res) =>{
    let userData = req.validUserData;
    User.findOne({_id: userData._id},{password:0, __v:0}).exec().then((userData)=>{
        let { status, message, data } = checkUserAccountStatus(userData)
        if(status!=200){
            res.status(status).json({
                status,
                message,
                data
            })
        }else{
            res.status(status).json({
                status,
                message:'user is active',
                data: userData
            })
        }
    })
}

module.exports = checkStatus;