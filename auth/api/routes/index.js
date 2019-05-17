const express = require('express');
const router = express.Router();
const controller = require('../controller');

// all auth routes
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'auth route is working'
    })
})

router.get('/checkStatus', controller.verifyMiddleware, controller.checkStatus)

router.post('/checkUsername', controller.verifyMiddleware, controller.checkUsername)

router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/verify', controller.verify)


module.exports = router;