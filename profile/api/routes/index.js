const express = require('express');
const router = express.Router();
const controller = require('../controller');
const checkUser = require('../middleware/check-auth');

// all auth routes
router.get('/', checkUser, controller.profile);
router.get('/:username/profile_image', controller.profileImage)
router.post('/update', checkUser, controller.update)

module.exports = router;