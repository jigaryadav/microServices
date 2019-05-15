const Feed = require('../models/feed');

const like = (req, res) => {
    let currentUser = req.validUserData; 
    let postId = req.body.postId
    likeOperation(postId, currentUser, (likeStatus, like)=> {
        if(likeStatus == 202){
            res.status(202).json({
                status: 202,
                message: 'unable to like this post',
            })
        }else if (likeStatus == 404){
            res.status(404).json({
                status: 404,
                message: 'unable to like, no post found',
            })
        }else{
            res.status(200).json({
                status: 202,
                message: "liked successfully!",
                data: {
                    like: like
                }
            })
        }
    })
}

likeOperation = (postId, currentUser, cb) =>{
    Feed.findOne({ _id: postId }).exec().then((feedData)=>{
        if(feedData){
            let like = feedData.like
            let likeIndex = like.indexOf(currentUser._id)
            if(likeIndex == -1){
                like.push(currentUser._id)
            }else{
                like.splice(likeIndex, 1)
            }
            try {
                Feed.updateOne({ _id: postId }, { $set: {like} }).exec()
                if(feedData.rePosted && !feedData.text && !feedData.text.length > 0){ // check user re posted this post and quote it
                    likeOperation(feedData.originalTweet, currentUser, (status, like)=>{
                        cb(status, like)
                    })
                }else{
                    cb(200, like)
                }
            } catch (error) {
                cb(202)  
            }
        }else{
            cb(404)
        }
    }).catch(()=>{
        cb(404)
    })
}

module.exports = like