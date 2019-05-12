const User = require('../models/user');

const update = async (req, res) => {
    let userData  = req.validUserData;
    let requestData = req.body;
    if(userData){
        let updateDataObject = {}
        if(requestData.displayName){
            updateDataObject.displayName = requestData.displayName
        }if(requestData.bio){
            updateDataObject.bio = requestData.bio
        }if(requestData.location){
            updateDataObject.location = requestData.location
        }if(requestData.coordinates){
            updateDataObject.coordinates = requestData.coordinates
        }if(requestData.dob){
            updateDataObject.dob = requestData.dob
        }if(requestData.profession){
            updateDataObject.profession = requestData.profession
        }if(requestData.website){
            updateDataObject.website = requestData.website
        }if(requestData.profilePic){
            updateDataObject.profilePic = requestData.profilePic
        }if(requestData.headerPic){
            updateDataObject.headerPic = requestData.headerPic
        }if(requestData.username){
            updateDataObject.username = requestData.username
        }
        try {
            User.updateOne({_id:userData._id},{$set: updateDataObject}).exec()
            res.status(200).json({
                status: 200,
                message: 'profile updated successfully!',
                data: updateDataObject
            })
        } catch (error) {
            notFound(res)
        }
    }
}

const notFound = (res)=>{
    res.status(202).json({
        status: 202,
        message: 'update fail'
    })
    res.end();
}

module.exports = update;