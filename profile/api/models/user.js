const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true},
    displayName: {type: String},
    password: {type: String, require: true},
    emailVerify: { type: Boolean, default: false},
    bio: {type: String},
    location: {type: String},
    coordinates: {type: Object},
    active: {type: Boolean, default: true, require: true},
    dob: {type: Date},
    profession: {type: String},
    website: {type: String}
})

module.exports = mongoose.model('User', userSchema);