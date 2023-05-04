const express = require('express')
const router = express.Router()
const Auth =   require('./authorization')
const Users =   require('./users')
const Tickets = require('./tickets')
const Airlines = require('./airlines')
// const Bookings = require('./bookings')

router.use('/auth',Auth)
router.use('/users',Users)
router.use('/tickets',Tickets)
router.use('/airlines',Airlines)
// router.use('/bookings',Bookings)

module.exports = router
