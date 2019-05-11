const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user: { type:String, require: true, ref: 'User' }
})

const rePostSchema = mongoose.Schema({
    User: { type:String, require: true, ref: 'User' }
})

const feedSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'User' },
    text: { type: String},
    like: { type: [likeSchema], default:[] },
    rePost: { type:[rePostSchema], default:[] },
    originalTweet: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedSchema' },
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

module.exports = mongoose.model('FeedSchema', feedSchema);

