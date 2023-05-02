const express = require('express')
const router = express.Router()
const {addAirlines} = require('../controller/airlines')
const upload = require("../middleware/photo");
const validatePhoto = require("../middleware/validatePhoto");

router.post('/', upload.single("photo"), validatePhoto, addAirlines);

module.exports = router