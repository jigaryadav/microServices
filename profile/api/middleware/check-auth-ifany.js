var Request = require("request");

module.exports = (req, res, next) => {
    Request.get({
        url: 'http://localhost:8080/v1/auth/verify',
        headers: req.headers
      }, (error, response, body) => {
        if (body){
            let userData = JSON.parse(body)
            if(userData.valid){
                req.validUserData = userData.data
                next();
            }else{
                next();
            }
        }else{
            next();
        }
    });
}