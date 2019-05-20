const User = require('../models/user');
const UserFollowing = require('../models/userFollowings');

const user = (req, res) => {
    let currentUser = req.validUserData;
    let queryName = req.query.s;
    let username = req.query.user
    let query = {};
    if(queryName){
        query = {"$or" : [{ "username" : {$regex : `.*${queryName}.*`} } , { "displayName" : {$regex : `.*${queryName}.*`} }]}
    }
    if(username){
        query = { "username": username }
    }

    if(currentUser){
        User.find(query,{password: 0, __v:0, active: 0, emailVerify:0, dob:0})
            .lean()
            .limit(20)
            .exec((error, u)=>{
                if(error){
                    res.status(200).json({
                        status: 200,
                        message: 'user fetch success',
                        data: []
                    })
                    return
                }
                let users = u
                let usersId = []
                usersId = users.map(({_id}) => _id)

                UserFollowing.find({
                    $and:[
                        { follower: currentUser._id }, 
                        { following : {$in : usersId } }
                    ]
                })
                .lean()
                .exec()
                .then((r)=>{
                    if(r.length == 0){
                        res.status(200).json({
                            status: 200,
                            message: 'user fetch success',
                            data: users
                        })
                    }else{
                        const filterResult = users.map((_user)=>{
                            let user = _user;
                            let filterFollowerUser = r.filter(({ following })=>{
                                if(following == _user._id){
                                    return true
                                }
                            })
                            if(filterFollowerUser.length > 0){
                                user = {
                                    ...user,
                                    following: true,
                                }
                            }
                            return user
                        })
                        if(filterResult){
                            res.status(200).json({
                                status: 200,
                                message: 'user fetch success',
                                data: filterResult
                            })
                        }
                    }
                })
        })
    }else{
        console.log(0)
        User.find({}).limit(20).then((users)=>{
            res.status(200).json({
                status: 200,
                message: 'user fetch success',
                data: users
            })
        })
    }
}

module.exports = user;

// follow following 

// jigar   juned 
// jigar   saurabh 
// jigar   komal

