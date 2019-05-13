const express = require('express');
const router = express.Router();
const controller = require('../controller');

// all auth routes
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'auth route is working'
    })
})

router.post('/checkUsername', controller.verifyMiddleware, controller.checkUsername)
// {
// 	"username": "juned1",
// 	"save": true
// }

router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/', controller.verify)


module.exports = router;