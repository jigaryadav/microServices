const User = require('../models/user');
const UserFollowing = require('../models/userFollowings');


const profile = async (req, res) => {
    let userData  = req.validUserData;
    User.findOne({_id:userData._id}, {password:0, __v:0}).lean().exec().then(async (user)=>{
        if(user){
            let followerCount = 0 
            let followingCount = 0
            followingCount = await UserFollowing.find({ follower: userData._id }).countDocuments().exec();
            followerCount = await UserFollowing.find({ following: userData._id }).countDocuments().exec();

            res.status(200).json({
                status: 200, 
                message: 'profile fetch success',
                data: {
                    ...user,
                    followerCount,
                    followingCount
                }
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