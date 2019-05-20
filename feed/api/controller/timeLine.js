const Feed = require('../models/feed');
const User = require('../models/user');
var Request = require("request");


const timeLine = async (req, res) => {
    let currentUser = req.validUserData;
    let lastPostId = req.query.lastPostId;
    let latestPostId = req.query.latestPostId
    let limit = req.query.limit ? Number(req.query.limit) : 10
    let userIds = [currentUser._id]
    if(isNaN(limit)){
        limit = 20;
    }

    let { error,response, body  } = await fetchFollowingData(req)
    if(body){
        let { status, data } = JSON.parse(body)
        if(status == 200){
            userIds = [...userIds, ...data]
        }else{
            res.status(202).json({
                status: 202,
                message:'invalid id',
            })
            return 
        }
    }

    // query string 
    let query = {'user' : { $in: userIds } } 
    if(lastPostId){
        query = {$and : [{ '_id' : {$lt: lastPostId} }, query ] }
    }
    if(latestPostId){
        query = {$and : [{ '_id' : {$gt: latestPostId} }, query ] }
    }

    let userDetailObject = {'email':0, 'password': 0, 'emailVerify':0, 'active':0, 'dob':0, '__v':0}

    Feed.find(query,{'__v':0})
        .sort([['_id', -1]])
        .limit(latestPostId? 0 : limit)
        .populate({ path: 'user', select: userDetailObject })
        .populate({path: 'like.user', select:{'_id': 1, 'email':1}})
        .populate({path: 'originalTweet'})
        .populate({
            path: 'originalTweet',
            select:{'__v': 0},
            populate: [{
                path: 'user',
                select: userDetailObject
            },
            {
                path: 'originalTweet',
                select:{'__v': 0},
                populate: {
                    path: 'user',
                    select: userDetailObject
                }
            }]
        })
        .exec()
        .then((timelineData)=>{
        res.status(200).json({
            status: 200,
            message:'data fetched succesfully',
            data:timelineData
        })
    }).catch((e)=>{
        res.status(202).json({
            status: 202,
            message:'invalid id',
            e
        })
    })
}

const fetchFollowingData = (req) =>new Promise((resolve, reject)=>{
    Request.get({
        url: 'http://localhost:8080/v1/profile/getFollowDetail?following=true',
        headers: req.headers
      }, (error, response, body)=>{
            resolve({error, response, body});
      })
})

module.exports = timeLine;