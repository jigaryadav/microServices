const User = require('../models/user');
const UserImage = require('../models/userImage');

const profileImage = (req, res) =>{
    if(req.params){
        let username = req.params.username;
        User.findOne({username: username}).then((user)=>{
            if(user){
                UserImage.findOne({userId : user._id}).then((userImageData)=>{
                    if(userImageData){
                        if(req.query.header){
                            res.writeHead(301, { 
                                "Location": userImageData.profilePic
                            });
                            res.end();
                        }else{
                            res.writeHead(301, { 
                                "Location": userImageData.headerPic
                            });
                            res.end();
                        }
                    }else{
                        defaultImage(res)
                    }
                })
            }else{
                defaultImage(res)
            }
        })
    }
}

const defaultImage = (res) =>{
    res.writeHead(301, { 
        "Location": "https://source.unsplash.com/random" 
    });
    res.end();
}

module.exports = profileImage;