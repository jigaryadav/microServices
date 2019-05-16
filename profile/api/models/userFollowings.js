const mongoose = require('mongoose');

const userFollowings = mongoose.Schema({
    following: {type: String, ref: 'User', require: true},
    follower: {type: String, ref: 'User', require: true},
})

module.exports = mongoose.model('UserFollowing', userFollowings);