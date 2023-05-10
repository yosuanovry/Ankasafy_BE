const express = require('express')
const router = express.Router()
const {registerUser,loginUser,otp, otpByEmail} = require('../controller/authorization')
const {role} = require('../middleware/authorization')

router.post('/register/:role',role, registerUser)
router.post('/login',loginUser)
router.get('/verification/:email/:code', otpByEmail)
router.get('/verification/:id/:code',otp)
// router.post('/updatephoto:id')
// router.get('/', getUserData)

module.exports = router
