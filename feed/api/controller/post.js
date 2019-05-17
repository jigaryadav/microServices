const Feed = require('../models/feed');

const post = (req, res) => {
    let currentUser = req.validUserData;
    let text = req.body.text;
    let originalTweet = req.body.originalTweet;

    if(!text){
        res.status(202).json({
            status: 202,
            message:"text field is missing or empty",
        })
        return;
    }

    let feedData = {
        user: currentUser._id,
        text
    }

    if(originalTweet){
        feedData.originalTweet = originalTweet;
        feedData.rePosted = true
    }
    let post = new Feed(feedData)
    post.save().then((feed)=>{
        res.status(200).json({
            status: 200,
            message:"tweet submited!",
            data:feed
        })
    })
}

module.exports = post;