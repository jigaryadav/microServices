const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    day: { type: String},
    month: { type: String},
    year: { type: String},
})


const userSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true},
    displayName: {type: Boolean},
    password: {type: String, require: true},
    emailVerify: { type: Boolean, default: false},
    bio: {type: String},
    location: {type: String},
    coordinates: {type: Object},
    active: {type: Boolean, default: true, require: true},
    dob: {type: dateSchema},
    profession: {type: String},
    website: {type: String},
    age: {type: Number}
})

module.exports = mongoose.model('User', userSchema);