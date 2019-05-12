const MyProfileFeed = require('../models/feed');
const User = require('../models/user');

const myProfileFeed = (req, res) => {
    MyProfileFeed.find({},{'__v':0})
        .populate({ path: 'user', select:{'_id': 1, 'email':1} })
        .populate({path: 'like.user', select:{'_id': 1, 'email':1}})
        .populate({path: 'originalTweet'})
        .populate({
            path: 'originalTweet',
            select:{'__v': 0, 'like':0, rePost:0},
            populate: {
                path: 'user',
                select:{'_id': 1, 'email':1}
              }
        })
        .sort([['_id', -1]])
        .exec()
        .then((data)=>{
        res.status(200).json({
            status:200,
            message: 'Feed fetched successfully!',
            data
        })
    })
}

module.exports = myProfileFeed

