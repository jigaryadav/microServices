const User = require('../models/user');

const checkEmail = (str) => {
    var regularExpression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regularExpression.test(str);
}

const checkEmailDuplication = (email) => new Promise((resolve)=>{
    User.findOne({email}).exec().then((res)=>{
        if(res){
            resolve(true)
        }else{
            resolve(false)
        }
    }).catch((err)=>{
        resolve(true)
    })
})

const checkRequsterBody = async ({email, password}) => {
    if(!email){
        return {
            status: false,
            message: 'email id is required'
        }
    }else if(!checkEmail(email)){
        return {
            status: false,
            message: 'invalid email id'
        }
    }else if (!password){
        return {
            status: false,
            message: 'password  is required/invalid'
        }
    }else if(password.length < 6){
        return {
            status: false,
            message: 'password must be grater then 6 character'
        }
    }else if(await checkEmailDuplication(email)){
        return {
            status: false,
            message: 'email id already registered'
        }
    }
    else{
        return {
            status: true
        }
    }
}

const checkUserAccountStatus = (data)=> {
    if(!data){
        return error('user not found', {
            user: false
        })
    }else if(!data.active){
        return error('account deactivated', {
            active: false
        })
    }else if(!data.emailVerify){
        return error('please verify your email', {
            emailVerify: false
        })
    }else if(!data.username){
        return error('please set your username first', {
            username: false
        })
    }else{
        return {
            status: 200
        }
    }
}

const error = (message, data)=>{
    return{
        status: 202,
        message,
        data
    }
}

module.exports = {
    checkRequsterBody,
    checkEmail,
    checkUserAccountStatus
}