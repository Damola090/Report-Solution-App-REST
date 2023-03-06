const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getMyProfile } = require('../Controller/userController');
const { AuthMiddleware } = require('../Middleware/AuthMiddleware');


router.route('/register-user').post(registerUser)
router.route('/login-user').post(loginUser)
router.route('/user/me').get(AuthMiddleware, getMyProfile)


module.exports = router

