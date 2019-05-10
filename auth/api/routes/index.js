const express = require('express');
const router = express.Router();
const { checkRequsterBody } = require('../helper');

// all auth routes
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'handling get auth'
    })
})

router.post('/register', (req, res, next)=>{
    const userCredential = {
        email : req.body.email,
        password: req.body.password
    }
    const { status, message } = checkRequsterBody(userCredential)
    if(status){
        res.status(200).json({
            status: 200,
            message : userCredential
        })
    }else{
        res.status(401).json({
            status: 401,
            message : message
        })
    }
})

module.exports = router;