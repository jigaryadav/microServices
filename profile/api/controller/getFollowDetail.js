const UserFollowing = require('../models/userFollowings');

const getFollowDetail = async (req, res) =>{
    let userData  = req.validUserData;
    console.log(req.query)
    if(req.query.following) {
        following = await UserFollowing.find({ follower: userData._id }, {'following' : 1 }).lean()
        res.status(200).json({
            status:200,
            message:'following fetched',
            data: following.map(({following})=> following)
        })
    }else if(req.query.follower){
        let follower = await UserFollowing.find({ following: userData._id }, {'follower' :1 }).lean()
        res.status(200).json({
            status:200,
            message:'follower fetched',
            data: follower.map(({follower})=> follower)
        })
    }else{
        res.status(202).json({
            status:202,
            message:'following or follower query is missing '
        })
    }
}

module.exports = getFollowDetail;