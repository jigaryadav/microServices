const express = require('express');
const router = express.Router();
const controller = require('../controller');
const checkUser = require('../middleware/check-auth');

// default feed routes
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'auth route is working'
    })
})

router.get('/me', checkUser, controller.myProfileFeed)
router.post('/post', controller.post)
router.post('/like', checkUser, controller.like)
module.exports = router;