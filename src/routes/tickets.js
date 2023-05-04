const express = require('express')
const router = express.Router()
const {addTicket, getTickets, getTicketById} = require('../controller/tickets')

router.post('/', addTicket);
router.get('/', getTickets)
router.get('/:id', getTicketById)

module.exports = router
