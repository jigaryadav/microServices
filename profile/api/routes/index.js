const express = require('express');
const router = express.Router();
const controller = require('../controller');
const checkUser = require('../middleware/check-auth');

// all auth routes
router.get('/me', checkUser, controller.profile);
router.get('/:username/profile_image', controller.profileImage)
router.post('/update', checkUser, controller.update)

router.get('/', (res, req, next)=>{
    req.status(200).json({
        message: 'profile server is up and running!'
    })
})

module.exports = router;