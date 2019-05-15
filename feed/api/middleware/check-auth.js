var Request = require("request");

module.exports = (req, res, next) =>{
      Request.get({
        url: 'http://localhost:8080/v1/auth/verify',
        headers: req.headers
      }, (error, response, body) => {
        if(error) {
            authFail(res)
        }else if (body){
            let userData = JSON.parse(body)
            if(userData.valid){
                req.validUserData = userData.data
                next();
            }else{
                authFail(res)
            }
        }else{
            authFail(res)
        }
    });
}

const authFail = (res)=>{
    res.status(500).json({
        status: 501,
        message: 'Invalid token, you are not authorize'
    })
}