const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    user: { type: String, require: true, ref:'User' },
    text: { type: String},
    like: { type:Array, ref: 'User', default: [] },
    rePost: { type:Array, ref: 'User', default: [] },
    originalTweet: { type: String , ref: 'FeedSchema' },
    rePosted: { type: Boolean, default: false },
    edited: {type: Boolean, default: false},
    editedText: { type: String },
    image: { type: [String] },
    createdAt: {type: Number, default: ()=>{
        return new Date().getTime();
    }}
},{
    timestamps: true
})

module.exports = mongoose.model('Feed', feedSchema);

