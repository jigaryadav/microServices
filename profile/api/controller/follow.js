const UserFollowing = require('../models/userFollowings');


const follow = (req, res) => {
    let currentUser = req.validUserData;
    let followingID = req.body.id
    if(!followingID){
        res.status(202).json({
            status: 202,
            message: 'id require',
            data:{
                follow: false
            }
        })
        return 
    }
    if(currentUser._id == followingID){
        res.status(202).json({
            status: 202,
            message: 'you cant follow yourself',
            data:{
                follow: false
            }
        })
    }else{
        UserFollowing.findOne({ $and:[ { follower: currentUser._id }, { following: followingID } ] })
        .exec()
        .then((userData)=>{
            if(userData){
                res.status(202).json({
                    status: 202,
                    message: 'you are already following',
                    data:{
                        follow: false
                    }
                })
            }else{
                followRequest = new UserFollowing({
                    follower: currentUser._id,
                    following: followingID
                })
                followRequest.save().then((result)=>{
                    res.status(200).json({
                        status: 200,
                        message: 'follow success',
                        data:{
                            ...result,
                            follow: true
                        }
                    })
                })
            }
        }).catch(()=>{
            res.status(500).json({
                    status: 500,
                    message: 'internal server error',
                    data:{
                        follow: false
                    }
                })
        })
    }
}

module.exports = follow;
