const Feed = require('../models/feed');
const User = require('../models/user');


const timeLine = (req, res) => {
    let lastPostId = req.query.lastPostId;
    let latestPostId = req.query.latestPostId
    let limit = req.query.limit ? Number(req.query.limit) : 2
    if(isNaN(limit)){
        limit = 20;
    }

    console.log(limit)
    data = ['5cd5aaf8e5cacd05df34b677', '5cd5b7d2278270088decffd0', '5cd88b363c6b691ec4643cb9']


    // query string 
    let query = {'user' : { $in: data } } 
    if(lastPostId){
        query = {$and : [{ '_id' : {$lt: lastPostId} }, query ] }
    }
    if(latestPostId){
        query = {$and : [{ '_id' : {$gt: latestPostId} }, query ] }
    }



    Feed.find(query,{'__v':0})
        .sort([['_id', -1]])
        .limit(latestPostId? 0 : limit)
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
        .exec()
        .then((timelineData)=>{
        res.status(200).json({
            status: 'ok',
            message:'data fetched succesfully',
            data:timelineData
        })
    }).catch((e)=>{
        res.status(202).json({
            message:'invalid id',
            e
        })
    })

    
}

module.exports = timeLine;