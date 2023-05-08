const express = require('express')
const router = express.Router()
const {insertBooking, getBookingById, getBookingByUser, putIsPaid} = require('../controller/bookings')
const {protect} = require('../middleware/authorization')

router.post('/', protect, insertBooking)
router.get('/detail/:id', protect, getBookingById)
router.get('/mybookings', protect, getBookingByUser)
router.put('/is_paid/:id', protect, putIsPaid)


module.exports = router
