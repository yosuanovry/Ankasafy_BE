const express = require('express')
const router = express.Router()
const {addTicket, getTickets} = require('../controller/tickets')

router.post('/', addTicket);
router.get('/', getTickets)

module.exports = router
