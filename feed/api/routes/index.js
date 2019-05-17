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
router.post('/post', checkUser, controller.post)
router.get('/post/:postId', controller.singlePost)
router.post('/like', checkUser, controller.like)
router.post('/repost', checkUser, controller.rePost)

module.exports = router;