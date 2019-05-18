const express = require('express');
const router = express.Router();
const controller = require('../controller');
const checkUser = require('../middleware/check-auth');
const checkUserIfAny = require('../middleware/check-auth-ifany');

// all auth routes
router.get('/me', checkUser, controller.profile);
router.get('/:username/profile_image', controller.profileImage)
router.get('/user', checkUserIfAny, controller.user);
router.get('/getFollowDetail',checkUser, controller.getFollowDetail)
router.post('/update', checkUser, controller.update)
router.post('/follow', checkUser, controller.follow) // put validation on following id


router.get('/', (res, req, next)=>{
    req.status(200).json({
        message: 'profile server is up and running!'
    })
})

module.exports = router;