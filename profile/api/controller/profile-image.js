const User = require('../models/user');
const UserImage = require('../models/userImage');

const profileImage = (req, res) =>{
    if(req.params){
        let username = req.params.username;
        User.findOne({username: username}).exec().then((user)=>{
            if(user){
                if(req.query.header){
                    res.writeHead(301, { 
                        "Location": user.headerPic
                    });
                    res.end();
                }else{
                    res.writeHead(301, { 
                        "Location": user.profilePic
                    });
                    res.end();
                }
            }else{
                defaultImage(res)
            }
        }).catch((e)=>{
            defaultImage(res)
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