const Feed = require('../models/feed');
var Request = require("request");

const rePost = (req, res) => {
    let currentUser = req.validUserData; 
    let postId = req.body.postId
    if(!postId){
        res.status(202).json({
            status: 202,
            message: 'postId missing'
        })
        return;
    }
    Request.get({
        url: 'http://localhost:8080/v1/feed/post/'+postId,
        headers: req.headers
      }, (error, response, body) => {
          let {status, data} = JSON.parse(body)
          if(status == 200 && data){
              if(data.text || !data.originalTweet){
                findAndUpdate(data, currentUser, postId).then(({error, updatedData, rePostIndex})=>{
                    if(rePostIndex == -1){
                        let feedData = {
                            user: currentUser._id,
                            originalTweet: postId,
                            rePosted: true
                        }
                        let saveTweet = new Feed(feedData)
                        saveTweet.save()
                        res.status(200).json({
                            status: 200,
                            message: 'RT success'
                        })
                    }else{
                        Feed.findOneAndDelete({ $and:[ { user: currentUser._id }, { originalTweet: postId} ] }).exec()
                        res.status(200).json({
                            status: 200,
                            message: 'RT undo'
                        })
                    }
                })
              }else if(!data.text && data.originalTweet){
                findAndUpdate(data.originalTweet, currentUser, data.originalTweet._id).then(({error, updatedData, rePostIndex})=>{
                    if(updatedData){
                        Feed.findByIdAndDelete(postId).exec()
                        res.status(200).json({
                            status: 200,
                            message: 'RT undo'
                        })
                    }else{
                        res.status(202).json({
                            status: 202,
                            message: 'something went wrong'
                        })
                    }
                })
              }
          }else{
            res.status(202).json({
                status: 202,
                message: 'invalid input'
            })
          }
    });
}

const findAndUpdate = (data, currentUser, postId) =>{
    return new Promise((resolve, reject)=>{
        let rePost =  data.rePost;
        let rePostIndex = rePost.indexOf(currentUser._id)
        if(rePostIndex == -1){
            rePost.push(currentUser._id)
        }else{
            rePost.splice(rePostIndex, 1)
        }
        
        Feed.findOneAndUpdate({_id: postId}, { $set :{ rePost }}, {useFindAndModify: false}).exec((err, updatedData)=>{
            resolve({err, updatedData, rePostIndex})
        })
    })
}

module.exports = rePost