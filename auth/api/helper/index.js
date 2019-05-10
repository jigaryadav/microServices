const checkEmail = (str) => {
    var regularExpression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regularExpression.test(str);
}

const checkEmailDuplication = (email) => new Promise((resolve, reject)=>{
    // setTimeout(()=>{
        resolve(true)
    // },  1000)
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
    }else if (await checkEmailDuplication(email)){
        return {
            status: false,
            message: 'email id already registered'
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
    }
    else{
        return {
            status: true
        }
    }
}

module.exports = {
    checkRequsterBody
}