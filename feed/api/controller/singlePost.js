const Feed = require('../models/feed');

const singlePost = (req, res) => {
    let currentUser = req.validUserData
    let postId = req.params.postId;
    if(!postId){
        res.status(202).json({
            status: 202,
            message:'postId is missing'
        })
        return
    }
    Feed.findOne({ _id: postId })
        .populate({ path: 'user', select:{'_id': 1, 'email':1, 'username':1, 'displayName': 1} })
        .populate({path: 'like.user', select:{'_id': 1, 'email':1}})
        .populate({path: 'originalTweet'})
        .populate({
            path: 'originalTweet',
            select:{'__v': 0},
            populate: [{
                path: 'user',
                select:{'_id': 1, 'email':1, 'username':1, 'displayName': 1}
            },
            {
                path: 'originalTweet',
                select:{'__v': 0},
                populate: {
                    path: 'user',
                    select:{'_id': 1, 'email':1, 'username':1, 'displayName': 1}
                }
            }]
        })
        .sort([['_id', -1]])
        .exec()
        .then((data)=>{
        res.status(200).json({
            status:200,
            message: 'Feed fetched successfully!',
            data
        })
    }).catch(()=>{
        res.status(202).json({
            status: 202,
            message:'postId is missing'
        })
    })
}

module.exports = singlePost