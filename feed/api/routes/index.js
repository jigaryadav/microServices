const express = require('express');
const router = express.Router();
const controller = require('../controller');

// default feed routes
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'auth route is working'
    })
})

router.get('/me', controller.myProfileFeed)
router.post('/post', controller.post)



module.exports = router;