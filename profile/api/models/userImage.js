const mongoose = require('mongoose');

const userImage = mongoose.Schema({
    profilePic: {type: String},
    headerPic: {type: String},
    userId: {type: String, require: true, unique: true},
})

module.exports = mongoose.model('UserImage', userImage);