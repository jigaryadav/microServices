var Request = require("request");

module.exports = (req, res, next) =>{
    Request.post({
        "headers": req.headers,
        "url": "http://localhost:3000/v1/verify",
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
        }
    });
}

const authFail = (res)=>{
    res.status(500).json({
        status: 501,
        message: 'Invalid token, you are not authorize'
    })
}