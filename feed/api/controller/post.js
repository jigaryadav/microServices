const MyProfileFeed = require('../models/feed');

const post = (req, res)=>{
    let post = new MyProfileFeed({
        ...req.body
    })
    post.save()
    res.status(200).json({
        message:"tweet submited!"
    })
}

module.exports = post;